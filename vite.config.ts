// Shared build configuration includes React, TanStack Start, Tailwind and Nitro.
// Do not register these plugins twice.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { ConfigEnv } from "vite";

export default (env: ConfigEnv) => {
  const pages = env.mode !== "vercel";
  return defineConfig({
    envDefine: false,
    vite: { base: pages ? "/energie-entwurf/" : "/", build: { sourcemap: false } },
    tanstackStart: {
      server: { entry: "server" },
      router: { basepath: pages ? "/energie-entwurf" : "/" },
      ...(pages ? { spa: { enabled: true, prerender: { outputPath: "/index" } } } : {}),
    },
    // Pages receives dist/client only; the optional Vercel build stays available.
    nitro: pages ? false : { preset: "vercel" },
  })(env);
};
