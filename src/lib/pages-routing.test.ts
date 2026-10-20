import { afterEach, describe, expect, it, vi } from "vitest";
import { createMemoryHistory } from "@tanstack/react-router";
import { getRouter } from "../router";
import { demoSignIn, DEMO_PASSWORD } from "./demo-store";

afterEach(() => vi.unstubAllGlobals());

describe("actual route tree mounted below the Pages project path", () => {
  it.each([
    ["/strom/", "/strom/", "/strom"],
    ["/mitarbeiter/login/", "/mitarbeiter/login/", "/mitarbeiter/login"],
    [
      "/mitarbeiter/leads/demo-lead-0?tab=notes",
      "/mitarbeiter/leads/demo-lead-0",
      "/mitarbeiter/leads/$id",
    ],
    ["/angebot?start=gas&plz=10115", "/angebot", "/angebot"],
  ])("resolves %s without exposing the base to route guards", (url, pathname, routeId) => {
    const router = getRouter();
    router.update({
      context: router.options.context,
      basepath: "/energie-entwurf",
      history: createMemoryHistory({ initialEntries: [`/energie-entwurf${url}`] }),
    });
    expect(router.latestLocation.pathname).toBe(pathname);
    expect(router.buildLocation({ to: "/mitarbeiter/login" }).publicHref).toBe(
      "/energie-entwurf/mitarbeiter/login",
    );
    expect(router.matchRoutes(router.latestLocation).at(-1)?.routeId).toBe(routeId);
  });

  it("loads the protected dashboard and a local lead after demo login under the base", async () => {
    const values = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
        removeItem: (key: string) => values.delete(key),
      },
      dispatchEvent: () => true,
    });
    const network = vi.fn(() => {
      throw new Error("Unexpected backend call");
    });
    vi.stubGlobal("fetch", network);
    demoSignIn("admin@example.com", DEMO_PASSWORD);
    const router = getRouter();
    router.update({
      context: router.options.context,
      isServer: false,
      scrollRestoration: false,
      basepath: "/energie-entwurf",
      history: createMemoryHistory({ initialEntries: ["/energie-entwurf/mitarbeiter/dashboard/"] }),
    });
    await router.load();
    expect(router.state.matches.at(-1)?.status).toBe("success");
    await router.navigate({ to: "/mitarbeiter/leads/$id", params: { id: "demo-lead-0" } });
    expect(router.state.location.publicHref).toBe("/energie-entwurf/mitarbeiter/leads/demo-lead-0");
    expect(router.state.matches.at(-1)?.status).toBe("success");
    expect(network).not.toHaveBeenCalled();
  });
});
