import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { BRAND_NAME, DEMO_PROJECT_NOTICE, rebrandSavedContent } from "./branding";

const root = fileURLToPath(new URL("../../", import.meta.url));
function files(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)],
  );
}

describe("Entwurf Energie branding", () => {
  it("updates saved presentation content without replacing demo records or user edits", () => {
    const previous = {
      id: "demo-existing-record",
      author: `${BRAND_NAME} Redaktion`,
      email: "demo@example.com",
      image: "/src/assets/page-wissen.jpg",
      notes: ["Meine lokale Bearbeitung"],
    };
    expect(rebrandSavedContent(previous, "/assets/new-illustration.svg")).toEqual({
      ...previous,
      author: `${BRAND_NAME} Redaktion`,
      email: "demo@example.com",
      image: "/assets/new-illustration.svg",
    });
    expect(previous.email).toBe("demo@example.com");
    expect(DEMO_PROJECT_NOTICE).toContain("Diese Website befindet sich derzeit noch im Entwurf.");
  });
  it("uses newly branded vector assets and neutral public contact addresses", () => {
    const publicFiles = [
      ...files(join(root, "src")).filter((path) => path.endsWith(".tsx") || path.endsWith(".svg")),
      ...files(join(root, "public")),
    ];
    for (const path of publicFiles) {
      const text = readFileSync(path, "utf8");
      if (path.endsWith(".svg"))
        expect(text, path).toMatch(/Entwurf Energie|FIKTIVE BEISPIELRECHNUNG/);
      const domains = [...text.matchAll(/[A-Z0-9._%+-]+@((?:[A-Z0-9-]+\.)+[A-Z]{2,})/gi)].map(
        (match) => match[1].toLowerCase(),
      );
      expect(
        domains.every((domain) => domain === "example.com"),
        path,
      ).toBe(true);
    }
    const assets = files(join(root, "src/assets"));
    expect(assets.every((path) => !/\.(?:png|jpe?g)$/.test(path))).toBe(true);
    expect(assets.some((path) => path.endsWith("energie-entwurf-logo-dark.svg"))).toBe(true);
    expect(assets.some((path) => path.endsWith("energie-entwurf-logo-light.svg"))).toBe(true);
  });
  it("keeps operator disclosures separate from the presented company and integrations local-only", () => {
    for (const page of ["impressum", "datenschutz", "agb", "widerruf"]) {
      const text = readFileSync(join(root, `src/routes/${page}.tsx`), "utf8");
      expect(text).toMatch(/\[(?:.+ergänzen|AUSFÜLLEN:)/);
      expect(text).toContain("dghWeb");
      expect(text).toMatch(
        /keine Energielieferverträge|keinem Energieliefer|keine Energie-|nicht an einen Energieanbieter/,
      );
    }
    for (const path of files(join(root, "src/routes/api"))) {
      expect(readFileSync(path, "utf8"), path).toContain("disabledDemoApi");
    }
  });
});
