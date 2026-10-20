import { createFileRoute, Link } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";
export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [{ title: "AGB | Entwurf Energie" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => (
    <StaticPage
      title="Allgemeine Geschäftsbedingungen"
      lead="Prüfentwurf – die Bedingungen werden für die jeweilige Unternehmens- und Vertragsgestaltung individuell ergänzt."
    >
      <h2>Geltungsbereich</h2>
      <p>
        Diese Seite bereitet die Geschäftsbedingungen der Kundenwebsite Entwurf Energie vor. Sie
        enthält noch keine finalen Vertragsklauseln.
      </p>
      <h2>Unternehmens- und Leistungsangaben</h2>
      <ul>
        <li>Vertragspartner: [Vollständige Firma und Rechtsform ergänzen]</li>
        <li>Anschrift und Kontakt: [Firmenanschrift und Kontaktdaten ergänzen]</li>
        <li>Leistungsumfang und Vertragsschluss: [Individuelle Regelungen ergänzen]</li>
        <li>Preise, Laufzeit und Beendigung: [Zum Vertragsmodell passende Bedingungen ergänzen]</li>
      </ul>
      <h2>Nutzung dieser Testversion</h2>
      <p>
        Anfragen und Bearbeitungsstände werden ausschließlich in dieser Testumgebung im Browser
        gespeichert. Es werden keine Energieliefer- oder Vermittlungsverträge geschlossen, keine
        Zahlungen ausgelöst und keine Anfragen extern bearbeitet. Bitte verwenden Sie hier nur
        erfundene Angaben und geeignete Testdokumente.
      </p>
      <p>
        Der tatsächliche Betreiber dieser Website ist dghWeb. Die noch zu vervollständigenden
        Betreiberangaben stehen im <Link to="/impressum">Impressum</Link>; Informationen zu
        Speicherung und Löschung finden Sie unter <Link to="/datenschutz">Datenschutz</Link>. Die
        Unternehmensplatzhalter oben ersetzen diese Angaben nicht.
      </p>
      <p className="text-xs text-muted-foreground">
        Platzhalter für individuelle Bedingungen · Vor Veröffentlichung prüfen.
      </p>
    </StaticPage>
  ),
});
