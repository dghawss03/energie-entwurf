import { readdir, readFile } from "node:fs/promises";

// Read-only HTTP smoke test. Does not execute client JavaScript or replace visual QA.
const origin = new URL(process.argv[2] ?? "http://127.0.0.1:5173");
if (!["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname)) {
  throw new Error("This audit only permits a local server.");
}
const paths = new Set(["/robots.txt", "/sitemap.xml"]);
const storeSource = await readFile("src/lib/demo-store.ts", "utf8");
const slugs = storeSource.match(/const slugs = \[([\s\S]*?)\];/)?.[1] ?? "";
for (const match of slugs.matchAll(/"([a-z0-9-]+)"/g)) paths.add(`/wissen/${match[1]}`);
paths.add("/mitarbeiter/leads/demo-lead-0");
paths.add("/mitarbeiter/redaktion/demo-article-0");
for (const file of await readdir("src/routes")) {
  if (!file.endsWith(".tsx") || file.startsWith("api")) continue;
  const source = await readFile(`src/routes/${file}`, "utf8");
  const path = source.match(/createFileRoute\("([^"]+)"\)/)?.[1];
  if (path && !path.includes("$")) paths.add(path);
}
const checked = new Map();
const failures = [];
async function check(path) {
  if (checked.has(path)) return;
  checked.set(path, true);
  const url = new URL(path, origin);
  if (url.origin !== origin.origin) throw new Error("External URL rejected");
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    const html = await response.text();
    if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
    if (/text\/html/.test(response.headers.get("content-type") ?? "")) {
      for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
        const target = match[1].replaceAll("&amp;", "&");
        if (
          !target.startsWith("//") &&
          !target.startsWith("/@") &&
          !target.startsWith("/node_modules") &&
          !target.startsWith("/src/") &&
          !target.startsWith("/api/")
        )
          paths.add(target);
      }
    }
  } catch (error) {
    failures.push(`${path}: ${error.message}`);
  }
}
while ([...paths].some((path) => !checked.has(path))) {
  const next = [...paths].filter((path) => !checked.has(path)).slice(0, 4);
  await Promise.all(next.map(check));
}
// Every actual backend route must reject writes; payload contains no customer information.
let disabled = 0;
for (const file of await readdir("src/routes/api")) {
  if (!file.endsWith(".ts")) continue;
  const source = await readFile(`src/routes/api/${file}`, "utf8");
  const path = source.match(/createFileRoute\("([^"]+)"\)/)?.[1];
  if (!path) continue;
  const target = path.replaceAll(/\$[A-Za-z_]+/g, "demo-audit");
  const response = await fetch(new URL(target, origin), {
    method: "POST",
    signal: AbortSignal.timeout(30000),
  });
  if (response.status !== 410)
    failures.push(`${target}: expected disabled API, got ${response.status}`);
  else disabled++;
}
console.log(
  JSON.stringify(
    { checkedPagesAndAssets: checked.size, disabledApiRoutes: disabled, failures },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
