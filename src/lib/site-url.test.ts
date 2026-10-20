import { describe, expect, it } from "vitest";
import { sitePath, siteAssetPath } from "./site-url";

describe("project subdirectory URLs", () => {
  it("keeps native navigation, assets and query strings within the repository", () => {
    expect(sitePath("/", "/energie-entwurf/")).toBe("/energie-entwurf/");
    expect(sitePath("/social-card.svg", "/energie-entwurf/")).toBe(
      "/energie-entwurf/social-card.svg",
    );
    expect(sitePath("wissen/demo?preview=true", "/energie-entwurf/")).toBe(
      "/energie-entwurf/wissen/demo?preview=true",
    );
    expect(sitePath("/mitarbeiter/login", "/")).toBe("/mitarbeiter/login");
  });
  it("normalizes older local image paths without duplicating the repository prefix", () => {
    expect(siteAssetPath("/social-card.svg", "/energie-entwurf/")).toBe(
      "/energie-entwurf/social-card.svg",
    );
    expect(siteAssetPath("/assets/picture.svg", "/energie-entwurf/")).toBe(
      "/energie-entwurf/assets/picture.svg",
    );
    expect(siteAssetPath("/energie-entwurf/assets/picture.svg", "/energie-entwurf/")).toBe(
      "/energie-entwurf/assets/picture.svg",
    );
    expect(siteAssetPath("https://example.com/picture.svg", "/energie-entwurf/")).toBe(
      "https://example.com/picture.svg",
    );
  });
});
