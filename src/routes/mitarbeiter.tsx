import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getDemoProfile } from "@/lib/demo-store";

export const Route = createFileRoute("/mitarbeiter")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const publicAuthPaths = new Set([
      "/mitarbeiter/login",
      "/mitarbeiter/passwort-vergessen",
      "/mitarbeiter/passwort-neu",
    ]);
    if (publicAuthPaths.has(location.pathname.replace(/\/+$/, ""))) return;
    const session = getDemoProfile();
    if (!session) {
      throw redirect({ to: "/mitarbeiter/login" });
    }
  },
  head: () => ({
    meta: [
      { title: "Mitarbeiterbereich – Energie Entwurf" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => <Outlet />,
});
