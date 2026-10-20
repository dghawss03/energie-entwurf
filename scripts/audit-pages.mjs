import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const root = resolve("dist/client");
const base = "/energie-entwurf/";
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    assert(!entry.isSymbolicLink(), "No symlinks in Pages artifact");
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk(root);
let htmlCount = 0;
const secret =
  /(?:-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bsk-proj-[A-Za-z0-9_-]{20,}|\b(?:ghp|github_pat)_[A-Za-z0-9_]{25,}|\b(?:sb_secret_|re_)[A-Za-z0-9]{25,}|eyJhbGciOiJIUzI1Ni[A-Za-z0-9_.-]{80,})/;
let sourceCount = 0;
const ignored = new Set([
  "node_modules",
  ".git",
  "dist",
  ".vercel",
  ".output",
  ".tanstack",
  ".nitro",
  ".npm-cache",
  ".agents",
  ".codex",
  ".aws",
]);
async function scanSource(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.isSymbolicLink()) continue;
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await scanSource(file);
    else if (
      /\.(?:ts|tsx|js|mjs|json|md|sql|toml|yml|yaml|svg|xml|html|txt)$/.test(file) ||
      entry.name.startsWith(".env")
    ) {
      assert(!secret.test(await readFile(file, "utf8")), `Potential source credential: ${file}`);
      assert(
        !entry.name.startsWith(".env") || entry.name === ".env.example",
        `Environment file requires review before publishing: ${file}`,
      );
      sourceCount++;
    }
  }
}
await scanSource(".");
console.log(
  `Source credential-pattern scan passed: ${sourceCount} files (no credential values printed).`,
);
for (const file of files) {
  assert(
    !/\.(?:map|sql|pem|key)$|[\\/]\.env|[\\/](?:server|functions|supabase|\.git)[\\/]/i.test(file),
    `Private/build-only file: ${file}`,
  );
  if (!/\.(?:html|js|css|json|svg|xml|txt)$/.test(file)) continue;
  const text = await readFile(file, "utf8");
  assert(!secret.test(text), `Potential credential in ${file}`);
  if (file.endsWith(".html")) {
    assert(
      !/<link[^>]+(?:fonts\.googleapis\.com|fonts\.gstatic\.com)/i.test(text),
      `External font request: ${file}`,
    );
  }
  if (file.endsWith(".css")) {
    assert(
      !/(?:url\(\s*["']?https?:|@import\s+["']https?:)/i.test(text),
      `External CSS resource: ${file}`,
    );
    for (const match of text.matchAll(/url\(["']?(\/energie-entwurf\/[^)'"\s]+\.woff2)["']?\)/g)) {
      const font = await readFile(resolve(root, match[1].slice(base.length)));
      assert.equal(font.subarray(0, 4).toString(), "wOF2", `Invalid local font: ${match[1]}`);
    }
  }
  assert(
    !/(?:https?:\/\/[^\s"'<>]*\.supabase\.co|https?:\/\/api\.(?:openai\.com|resend\.com)|https?:\/\/challenges\.cloudflare\.com)/i.test(
      text,
    ),
    `Productive endpoint in ${file}`,
  );
  if (file.endsWith(".js")) {
    for (const match of text.matchAll(/["'](\.\/[^"']+\.(?:js|css))["']/g)) {
      assert((await stat(resolve(dirname(file), match[1]))).isFile(), `Missing chunk ${match[1]}`);
    }
  }
  if (!file.endsWith(".html")) continue;
  htmlCount++;
  assert(/<html[^>]*lang="de"/.test(text), `Missing shell: ${file}`);
  assert(text.includes('content="noindex,nofollow"'), `Indexing must remain disabled: ${file}`);
  for (const match of text.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    assert(match[1].startsWith(base), `Root asset/link outside Pages base: ${match[1]}`);
    const local = resolve(root, decodeURIComponent(match[1].slice(base.length)));
    assert((await stat(local)).isFile(), `Missing shell asset: ${match[1]}`);
  }
}
assert(htmlCount > 30, "Missing static route entries");
assert(files.filter((file) => file.endsWith(".woff2")).length >= 4, "Missing locally hosted fonts");
assert.equal(
  await readFile(`${root}/404.html`, "utf8"),
  await readFile(`${root}/index.html`, "utf8"),
);
await stat(`${root}/.nojekyll`);
console.log(
  `Pages artifact audit passed: ${files.length} files, ${htmlCount} HTML entries, base ${base}; no server artifact or detected credentials/endpoints.`,
);

if (process.argv.includes("--http")) {
  const origin = "http://127.0.0.1:4173";
  const queue = [...files];
  let checked = 0;
  async function worker() {
    while (queue.length) {
      const file = queue.pop();
      const path = base + file.slice(root.length + 1).replaceAll("\\", "/");
      const response = await fetch(origin + path, { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200, path);
      assert.equal((await response.arrayBuffer()).byteLength, (await stat(file)).size, path);
      checked++;
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  for (const route of [
    "strom",
    "angebot?start=gas",
    "mitarbeiter/login",
    "mitarbeiter/dashboard",
    "mitarbeiter/leads",
    "mitarbeiter/redaktion",
  ]) {
    const response = await fetch(origin + base + route);
    assert.equal(response.status, 200, route);
    assert(response.url.includes(base), `Redirect escaped the project base: ${route}`);
  }
  const fallback = await fetch(origin + base + "mitarbeiter/leads/new-local-id?tab=notes");
  assert.equal(fallback.status, 404);
  assert.equal(await fallback.text(), await readFile(`${root}/index.html`, "utf8"));
  const api = await fetch(origin + base + "api/public/leads", { method: "POST" });
  assert.equal(api.status, 405, "Static host must not accept API writes");
  console.log(
    `Static HTTP audit passed: ${checked} files, project redirects, dynamic-ID fallback and rejected API write.`,
  );
}
