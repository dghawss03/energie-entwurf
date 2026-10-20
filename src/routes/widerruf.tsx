import { createFileRoute, Link } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/widerruf")({
  head: () => ({
    meta: [
      { title: "Widerruf – Demo-Hinweis | Energie Entwurf" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (
    <StaticPage
      title="Widerruf – Demo-Hinweis"
      lead="Rechtlicher Platzhalter. Keine unverändert übernommene Belehrung eines tatsächlichen Anbieters."
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Diese Seite ist Bestandteil einer Demonstrationswebsite. Die Angaben sind beispielhaft und
        werden bei einer tatsächlichen Umsetzung individuell ergänzt.
      </p>
      <h2>Keine echte Vertragsabwicklung</h2>
      <p>
        In Energie Entwurf werden weder Energielieferverträge abgeschlossen noch echte
        Vermittlungsaufträge erteilt. Das Absenden des Demoformulars erzeugt lediglich einen lokalen
        Beispieldatensatz.
      </p>
      <p>
        Das fiktive Unternehmen Energie Entwurf ist keine tatsächliche Vertragspartnerin. Den realen
        Website-Betreiber und seine Kontaktmöglichkeiten benennt das noch zu vervollständigende{" "}
        <Link to="/impressum">Impressum</Link>. Diese Seite enthält keine Widerrufsbelehrung für
        einen Energieliefervertrag.
      </p>
      <h2>Lokale Eingaben entfernen</h2>
      <p>
        Die Funktion „Demo zurücksetzen“ auf der Anmeldeseite und unter Einstellungen entfernt die
        lokalen Demodaten und Dokumente. Diese technische Funktion ist kein Widerrufsverfahren für
        einen echten Vertrag.
      </p>
      <h2>Platzhalter der fiktiven Kundenumsetzung</h2>
      <p>
        [Angaben zum konkreten Vertragsmodell und gegebenenfalls Kontaktdaten ergänzen.] Dies ist
        ausschließlich ein Beispiel für eine individuell umzusetzende Kundenwebsite. Für diese Demo
        wird kein tatsächlicher Widerrufsempfänger des fiktiven Unternehmens angegeben.
      </p>
      <h2>Vor Veröffentlichung zu prüfen</h2>
      <p>
        Falls später tatsächliche Leistungen oder Verträge angeboten werden, müssen die dafür
        erforderlichen Informationen und Verfahren gesondert rechtlich geprüft werden. Dieser
        Platzhalter ist keine abschließend geprüfte Widerrufsbelehrung und enthält keine echte
        Empfängeradresse.
      </p>
      <p>Demo-Projekt von dghWeb – nicht für echte Vertragsanfragen.</p>
      <p className="text-xs text-muted-foreground">
        Demo-Prüfentwurf · Stand: 20. Oktober 2026 · Vor Veröffentlichung prüfen.
      </p>
    </StaticPage>
  ),
});
