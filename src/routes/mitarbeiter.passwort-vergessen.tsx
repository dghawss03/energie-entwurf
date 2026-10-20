import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/mitarbeiter/passwort-vergessen")({
  head: () => ({
    meta: [{ title: "Mitarbeiterzugang" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold">Mitarbeiterzugang</h1>
        <p>
          Passwortänderungen und der Versand von Rücksetzlinks sind nicht eingerichtet. Verwenden Sie
          admin@example.com, manager@example.com oder employee@example.com mit Demo2026!.
        </p>
        <Button asChild>
          <Link to="/mitarbeiter/login">Zur Anmeldung</Link>
        </Button>
      </div>
    </div>
  ),
});
