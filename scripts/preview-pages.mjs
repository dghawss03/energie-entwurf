import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

// Deliberately static: no TanStack/Nitro server and no SPA rewrite to HTTP 200.
// Mirrors Pages directory redirects and its custom 404 document.
const root = resolve("dist/client");
const base = "/energie-entwurf/";
const port = Number(process.env.PORT ?? 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".wasm": "application/wasm",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405).end();
    return;
  }
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname === base.slice(0, -1)) {
      res.writeHead(301, { location: base + url.search }).end();
      return;
    }
    if (!url.pathname.startsWith(base)) {
      res.writeHead(404).end("Outside project base");
      return;
    }
    let path = resolve(root, decodeURIComponent(url.pathname.slice(base.length)));
    if (path !== root && !path.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    let status = 200;
    try {
      const info = await stat(path);
      if (info.isDirectory()) {
        if (!url.pathname.endsWith("/")) {
          res.writeHead(301, { location: url.pathname + "/" + url.search }).end();
          return;
        }
        path = resolve(path, "index.html");
      }
      await stat(path);
    } catch {
      status = 404;
      path = resolve(root, "404.html");
    }
    const content = await readFile(path);
    res.writeHead(status, {
      "content-type": mime[extname(path)] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(500).end("Static preview error");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Static Pages preview: http://127.0.0.1:${port}${base}`),
);
