import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | Energie Entwurf" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (
    <StaticPage
      title="Impressum"
      lead="Vorbereiteter Prüfentwurf. Die markierten Betreiberfelder müssen vor Veröffentlichung ausgefüllt und auf ihre Anwendbarkeit geprüft werden."
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Diese Seite ist Bestandteil einer Demonstrationswebsite. Die Angaben sind beispielhaft und
        werden bei einer tatsächlichen Umsetzung individuell ergänzt.
      </p>
      <h2>Fiktive Demo: Energie Entwurf</h2>
      <p>
        Energie Entwurf bezeichnet ausschließlich das fiktive Energieunternehmen innerhalb dieses
        Demo- und Präsentationsprojekts von dghWeb für potenzielle Kunden. Die dargestellten Tarife,
        Anbieter und CRM-Vorgänge sind Beispiele. Es werden keine echten Energielieferverträge,
        Vermittlungen oder Vertragsabschlüsse angeboten.
      </p>
      <h2>Beispiel eines Kundenimpressums – ausschließlich fiktiv</h2>
      <ul>
        <li>Unternehmensname: Energie Entwurf (fiktiv)</li>
        <li>Firmenanschrift: [Firmenanschrift ergänzen – nur Demo-Platzhalter]</li>
        <li>Kontakt: [Kontaktdaten ergänzen – nur Demo-Platzhalter]</li>
        <li>Vertretung / Register: [Angaben bei einer tatsächlichen Kundenumsetzung ergänzen]</li>
      </ul>
      <p>
        Dieser Beispielblock ist kein Betreiberimpressum der tatsächlich veröffentlichten Website.
      </p>
      <p>
        Das fiktive Demo-Unternehmen ist nicht der tatsächliche Website-Betreiber. Demo-Namen,
        Beispielanschriften und Adressen mit example.com innerhalb der Anwendung sind keine
        Betreiberangaben und keine erreichbaren Kontaktstellen. Die Projektbezeichnung dghWeb legt
        allein keine verantwortliche Person oder Gesellschaft fest.
      </p>

      <h2>Tatsächlicher Demo-Betreiber: dghWeb – auszufüllende Angaben</h2>
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
        Logo, Illustrationen und Energiefluss-Animation wurden für Energie Entwurf erstellt.
        Technische Bibliotheken und Schriften behalten ihre jeweiligen Lizenzen.
      </p>
      <p className="text-xs text-muted-foreground">
        Prüfentwurf · Stand: 20. Oktober 2026 · Vor Veröffentlichung prüfen, ausfüllen und nicht
        zutreffende Felder entfernen.
      </p>
    </StaticPage>
  ),
});
