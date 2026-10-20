import { createFileRoute, Link } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";
export const Route = createFileRoute("/widerruf")({
  head: () => ({
    meta: [
      { title: "Widerruf | Entwurf Energie" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (
    <StaticPage
      title="Widerruf"
      lead="Prüfentwurf – eine erforderliche Widerrufsbelehrung wird anhand des tatsächlichen Vertragsmodells ergänzt."
    >
      <h2>Vorbereitete Unternehmensangaben</h2>
      <ul>
        <li>Unternehmen: Entwurf Energie</li>
        <li>Empfänger und Anschrift: [Firmenanschrift ergänzen]</li>
        <li>Kontakt: [Kontaktdaten ergänzen]</li>
        <li>Fristen und Verfahren: [Nach rechtlicher Prüfung des Vertragsmodells ergänzen]</li>
      </ul>
      <h2>Hinweis zur Testversion</h2>
      <p>
        In dieser Testversion werden keine Energie- oder Vermittlungsverträge geschlossen. Die
        Musterfelder oben sind keine tatsächliche Widerrufsadresse. Den Website-Betreiber dghWeb und
        die noch auszufüllenden Betreiberangaben benennt das <Link to="/impressum">Impressum</Link>.
      </p>
      <h2>Gespeicherte Eingaben entfernen</h2>
      <p>
        Mit „Testumgebung zurücksetzen“ im Mitarbeiterbereich können Sie gespeicherte Vorgänge und
        Dokumente entfernen. Die vollständigen Löschmöglichkeiten erläutert der{" "}
        <Link to="/datenschutz">Datenschutz</Link>. Das Zurücksetzen ist kein Widerruf eines
        Vertrags.
      </p>
      <p className="text-xs text-muted-foreground">
        Platzhalter für die individuelle Belehrung · Vor Veröffentlichung prüfen.
      </p>
    </StaticPage>
  ),
});
