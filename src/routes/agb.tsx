import { createFileRoute, Link } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";
export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [{ title: "AGB | Entwurf Energie" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => (
    <StaticPage
      title="Allgemeine Geschäftsbedingungen"
      lead="Informationen zu Leistungen, Anfragen und Vertragsbedingungen."
    >
      <h2>Geltungsbereich</h2>
      <p>
        Diese Seite beschreibt den Rahmen für die Unternehmensdarstellung Entwurf Energie.
        Verbindliche Vertragsbedingungen sind nicht hinterlegt.
      </p>
      <h2>Unternehmens- und Leistungsangaben</h2>
      <ul>
        <li>Vertragspartner: [Vollständige Firma und Rechtsform ergänzen]</li>
        <li>Anschrift und Kontakt: [Firmenanschrift und Kontaktdaten ergänzen]</li>
        <li>Leistungsumfang und Vertragsschluss: [Individuelle Regelungen ergänzen]</li>
        <li>Preise, Laufzeit und Beendigung: [Zum Vertragsmodell passende Bedingungen ergänzen]</li>
      </ul>
      <h2>Anfragen und Vertragsschluss</h2>
      <p>
        Das Ausfüllen und Speichern einer Anfrage führt zu keinem Energieliefer- oder
        Vermittlungsvertrag. Eingaben bleiben im Browser. Es erfolgen weder eine externe
        Bearbeitung noch Zahlungen oder eine Übermittlung an Energieanbieter.
      </p>
      <p>
        Betreiber dieser Website ist dghWeb. Die Betreiberangaben stehen im{" "}
        <Link to="/impressum">Impressum</Link>; Informationen zu
        Speicherung und Löschung finden Sie unter <Link to="/datenschutz">Datenschutz</Link>. Die
        Unternehmensangaben oben ersetzen diese Betreiberangaben nicht.
      </p>
    </StaticPage>
  ),
});
