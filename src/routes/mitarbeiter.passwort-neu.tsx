import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/mitarbeiter/passwort-neu")({
  head: () => ({
    meta: [{ title: "Demo-Zugang ? Mitarbeiter" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold">Lokaler Demo-Zugang</h1>
        <p>
          Passwort-E-Mails und echte Passwortänderungen sind deaktiviert. Verwenden Sie
          admin@example.com, manager@example.com oder employee@example.com mit Demo2026!.
        </p>
        <Button asChild>
          <Link to="/mitarbeiter/login">Zur Anmeldung</Link>
        </Button>
      </div>
    </div>
  ),
});
