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
      lead="Informationen zum Vertragsschluss und zu gespeicherten Anfragen."
    >
      <h2>Unternehmensangaben</h2>
      <ul>
        <li>Unternehmen: Entwurf Energie</li>
        <li>Empfänger und Anschrift: [Firmenanschrift ergänzen]</li>
        <li>Kontakt: [Kontaktdaten ergänzen]</li>
        <li>Fristen und Verfahren: [Nach rechtlicher Prüfung des Vertragsmodells ergänzen]</li>
      </ul>
      <h2>Vertragsschluss und Widerruf</h2>
      <p>
        Über diese Website werden keine Energie- oder Vermittlungsverträge geschlossen. Daher
        wird hier auch kein vertragliches Widerrufsverfahren angeboten. Die Unternehmensangaben
        oben benennen keine erreichbare Widerrufsadresse. Angaben zum Betreiber dghWeb finden Sie
        im <Link to="/impressum">Impressum</Link>.
      </p>
      <h2>Gespeicherte Eingaben entfernen</h2>
      <p>
        Mit „Lokale Daten zurücksetzen“ im Mitarbeiterbereich können Sie gespeicherte Vorgänge und
        Dokumente entfernen. Die vollständigen Löschmöglichkeiten erläutert der{" "}
        <Link to="/datenschutz">Datenschutz</Link>. Das Zurücksetzen ist kein Widerruf eines
        Vertrags.
      </p>
    </StaticPage>
  ),
});
