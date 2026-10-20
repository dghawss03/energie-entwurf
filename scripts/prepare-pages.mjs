import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";

const output = "dist/client";
const shell = `${output}/index.html`;
await readFile(shell); // Fail rather than publish an incomplete SPA build.
const routes = new Set();
for (const file of await readdir("src/routes")) {
  if (!file.endsWith(".tsx")) continue;
  const source = await readFile(`src/routes/${file}`, "utf8");
  const route = source.match(/createFileRoute\("([^"]+)"\)/)?.[1];
  if (route && route !== "/" && !route.includes("$")) routes.add(route);
}
const store = await readFile("src/lib/demo-store.ts", "utf8");
const slugs = store.match(/const slugs = \[([\s\S]*?)\];/)?.[1] ?? "";
for (const match of slugs.matchAll(/"([a-z0-9-]+)"/g)) routes.add(`/wissen/${match[1]}`);
for (const route of routes) {
  const directory = `${output}/${route.replace(/^\/|\/$/g, "")}`;
  await mkdir(directory, { recursive: true });
  await copyFile(shell, `${directory}/index.html`);
}
// Pages serves this same SPA shell for arbitrary local record IDs. The original
// pathname/query stays intact; TanStack resolves it after JavaScript starts.
await copyFile(shell, `${output}/404.html`);
await writeFile(`${output}/.nojekyll`, "");
console.log(`GitHub Pages: index, 404 fallback and ${routes.size} route entries prepared.`);
