import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | Entwurf Energie" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (
    <StaticPage
      title="Impressum"
      lead="Impressum – Prüfentwurf. Die markierten Angaben sind vor Veröffentlichung zu vervollständigen."
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Rechtstext in Vorbereitung. Markierte Unternehmensangaben werden vor Veröffentlichung
        vervollständigt.
      </p>
      <h2>Unternehmensangaben – Kundenentwurf</h2>
      <p>
        Entwurf Energie ist der Unternehmensname dieses Kundenentwurfs. Die nachfolgenden
        Musterfelder gehören zur Kundenwebsite und benennen nicht den tatsächlichen Betreiber dieser
        Testversion.
      </p>
      <ul>
        <li>Firma: Entwurf Energie</li>
        <li>Anschrift: [Firmenanschrift ergänzen]</li>
        <li>Kontakt: [Kontaktdaten ergänzen]</li>
        <li>Vertretung / Register: [Unternehmensangaben ergänzen]</li>
      </ul>
      <h2>Tatsächlicher Website-Betreiber: dghWeb</h2>
      <p>
        <strong>
          Platzhalter: Hier ausschließlich die echten Angaben des für diese Website verantwortlichen
          Betreibers hinter dghWeb einsetzen. Die Projektbezeichnung allein ist keine vollständige
          rechtliche Identifikation.
        </strong>
      </p>
      <ul>
        <li>
          <strong>Name / Firma:</strong> [AUSFÜLLEN: vollständiger Name der natürlichen Person oder
          vollständige Firma einschließlich Rechtsform]
        </li>
        <li>
          <strong>Vertretung:</strong> [FALLS ZUTREFFEND: vertretungsberechtigte Person(en);
          andernfalls diesen Punkt entfernen]
        </li>
        <li>
          <strong>Anschrift:</strong> [AUSFÜLLEN: zustellfähige Straße und Hausnummer, Postleitzahl,
          Ort, Land]
        </li>
        <li>
          <strong>E-Mail:</strong> [AUSFÜLLEN: tatsächlich erreichbare Betreiber-E-Mail-Adresse;
          keine Demo-Adresse]
        </li>
        <li>
          <strong>Weiterer unmittelbarer Kontaktweg:</strong> [AUSFÜLLEN / PRÜFEN: geeigneter
          Kontaktweg, beispielsweise eine tatsächliche Telefonnummer]
        </li>
        <li>
          <strong>Register:</strong> [FALLS ZUTREFFEND: Registerart, Registergericht und
          Registernummer; andernfalls entfernen]
        </li>
        <li>
          <strong>Umsatzsteuer- / Wirtschafts-Identifikationsnummer:</strong> [FALLS VORHANDEN UND
          ANZUGEBEN: zutreffende Kennung; keine persönliche Steuernummer einsetzen]
        </li>
        <li>
          <strong>Weitere besondere Angaben:</strong> [NUR FALLS ZUTREFFEND: Aufsichtsbehörde,
          berufsrechtliche Angaben oder redaktionell verantwortliche Person; Anwendbarkeit prüfen
          und nicht benötigte Felder entfernen]
        </li>
      </ul>
      <p>
        Die Anwendbarkeit und Vollständigkeit der Angaben sind insbesondere anhand von{" "}
        <a
          href="https://www.gesetze-im-internet.de/ddg/__5.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          § 5 DDG
        </a>{" "}
        sowie gegebenenfalls weiterer einschlägiger Vorschriften zu prüfen. Dies ist noch kein
        ausgefülltes Betreiberimpressum.
      </p>

      <h2>Inhalte und Nutzungszweck</h2>
      <p>
        Die tatsächliche Website dient der Präsentation einer interaktiven Softwaredemo für
        Energievergleiche und digitale Kundenverwaltung. Demo-Anfragen werden lokal im Browser
        gespeichert. Es gibt keine echte Energieberatung, Zahlung oder Nachrichtenzustellung durch
        das fiktive Unternehmen.
      </p>
      <p>
        Logo, Illustrationen und Energiefluss-Animation wurden für Entwurf Energie erstellt.
        Technische Bibliotheken und Schriften behalten ihre jeweiligen Lizenzen.
      </p>
      <p className="text-xs text-muted-foreground">
        Prüfentwurf · Stand: 20. Oktober 2026 · Vor Veröffentlichung prüfen, ausfüllen und nicht
        zutreffende Felder entfernen.
      </p>
    </StaticPage>
  ),
});
