import { createFileRoute, Link } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "AGB und Demo-Nutzung | Energie Entwurf" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (
    <StaticPage
      title="AGB und Demo-Nutzung"
      lead="Platzhalter für die rechtliche Prüfung. Diese Seite enthält Demo-Nutzungshinweise und keine fertiggestellten Vermittlungsbedingungen."
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Diese Seite ist Bestandteil einer Demonstrationswebsite. Die Angaben sind beispielhaft und
        werden bei einer tatsächlichen Umsetzung individuell ergänzt.
      </p>
      <h2>1. Zweck des Projekts</h2>
      <p>
        Energie Entwurf zeigt beispielhaft eine Angebotsstrecke und digitale Kundenverwaltung. Das
        Demo-Projekt von dghWeb ist nicht für echte Vertragsanfragen vorgesehen.
      </p>
      <p>
        Energie Entwurf ist ausschließlich der Name des fiktiven Demo-Unternehmens. Der tatsächliche
        Website-Betreiber und seine erreichbaren Kontaktdaten sind im{" "}
        <Link to="/impressum">Impressum</Link>
        einzutragen. Diese Demo-Nutzungshinweise machen das fiktive Unternehmen nicht zum Anbieter
        einer echten Energie- oder Vermittlungsleistung.
      </p>
      <h2>2. Ausschließlich Simulation</h2>
      <p>
        Alle angezeigten Anbieter, Angebote, Preise, Bewertungen, Einsparungen, Prämien und
        CRM-Vorgänge sind fiktive Beispiele. Sie stellen keine aktuellen Marktangebote dar.
        Formulare führen ausschließlich zu lokal gespeicherten Demovorgängen. Es gibt keine echte
        Energievermittlung, Zahlung oder Nachrichtenzustellung.
      </p>
      <h2>3. Geeignete Testdaten</h2>
      <p>
        Bitte verwenden Sie erfundene Namen und Kontaktdaten sowie selbst erstellte
        Beispieldokumente. Lokale Änderungen können bis zum Zurücksetzen oder Löschen der
        Website-Daten im Browser erhalten bleiben. Es gibt keine geräteübergreifende
        Synchronisierung und keine Zusage einer dauerhaften Datensicherung. Einzelheiten enthält der
        Datenschutzentwurf.
      </p>
      <h2>4. Beispiel für eine spätere Kundenumsetzung</h2>
      <p>
        [Individuelle Nutzungsbedingungen und Kontaktdaten ergänzen.] Dieser Platzhalter gehört zur
        fiktiven Kundenpräsentation. Er begründet keine Energievermittlung und ersetzt weder die
        Betreiberangaben von dghWeb noch tatsächlich erforderliche Nutzungsbedingungen.
      </p>
      <h2>Vor Veröffentlichung zu prüfen</h2>
      <p>
        Die tatsächliche Projektverantwortung und gegebenenfalls erforderliche Nutzungsbedingungen
        müssen vor einer Veröffentlichung bestimmt werden. Regelungen zu Nutzungsrechten,
        Verfügbarkeit, Haftung, Datenschutz und einer etwaigen späteren echten Dienstleistung sind
        rechtlich zu prüfen. Die Demo enthält dazu keine abschließenden Vertragsklauseln.
      </p>
      <h2>5. Weitere Hinweise</h2>
      <p>
        Die Seiten <Link to="/impressum">Impressum</Link>,{" "}
        <Link to="/datenschutz">Datenschutz</Link> und <Link to="/widerruf">Widerruf</Link> sind
        ebenfalls als Prüfentwürfe gekennzeichnet.
      </p>
      <p className="text-xs text-muted-foreground">
        Demo-Prüfentwurf · Stand: 20. Oktober 2026 · Vor Veröffentlichung prüfen.
      </p>
    </StaticPage>
  ),
});
