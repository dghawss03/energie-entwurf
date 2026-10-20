import { createFileRoute, Link } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";
import { sitePath } from "@/lib/site-url";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz | Energie Entwurf" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (
    <StaticPage
      title="Datenschutz"
      lead="Prüfentwurf für die öffentliche Demo über GitHub Pages. Die tatsächlichen Verarbeitungen sind beschrieben; markierte Angaben und Rechtsgrundlagen müssen vor Veröffentlichung ergänzt beziehungsweise geprüft werden."
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Diese Seite ist Bestandteil einer Demonstrationswebsite. Die Angaben sind beispielhaft und
        werden bei einer tatsächlichen Umsetzung individuell ergänzt.
      </p>
      <h2>1. Verantwortliche Stelle und fiktive Demo</h2>
      <p>
        Energie Entwurf ist ein fiktives Energieunternehmen innerhalb einer Softwaredemo von dghWeb.
        Es gibt keine echten Energietarife oder Vertragsabschlüsse. Datenschutzrechtlich
        verantwortlich ist der tatsächliche Betreiber des dghWeb-Präsentationsprojekts, nicht das
        fiktive Unternehmen. Die vollständige rechtliche Identität hinter dghWeb ist unten noch
        einzutragen.
      </p>
      <ul>
        <li>
          <strong>Verantwortliche Person / Organisation:</strong> [AUSFÜLLEN: vollständiger Name /
          Firma und gegebenenfalls Vertretung]
        </li>
        <li>
          <strong>Anschrift:</strong> [AUSFÜLLEN: tatsächliche zustellfähige Betreiberanschrift]
        </li>
        <li>
          <strong>Datenschutzkontakt:</strong> [AUSFÜLLEN: tatsächlich erreichbare E-Mail-Adresse;
          kann die Betreiberadresse sein]
        </li>
        <li>
          <strong>Datenschutzbeauftragte Person:</strong> [NUR FALLS BENANNT / ERFORDERLICH:
          Kontaktdaten ergänzen; andernfalls diesen Punkt entfernen]
        </li>
      </ul>
      <p>
        Die Angaben müssen mit dem <Link to="/impressum">Impressum</Link> übereinstimmen.
        Demo-Adressen mit example.com sind keine Kontaktstellen für Datenschutzanliegen. Bitte geben
        Sie in Formulare ausschließlich erfundene Angaben ein und laden Sie nur selbst erstellte
        Beispieldokumente hoch.
      </p>

      <h2>2. Auslieferung über GitHub Pages</h2>
      <p>
        Für die öffentliche Bereitstellung ist GitHub Pages unter
        dghawss03.github.io/energie-entwurf/ vorgesehen. Der Dienst liefert HTML, CSS, JavaScript,
        Bilder und weitere statische Dateien aus. GitHub erhält dabei technische Verbindungsdaten.
        Laut GitHub werden Besucher-IP-Adressen zu Sicherheitszwecken protokolliert und gespeichert,
        auch ohne GitHub-Anmeldung.
      </p>
      <p>
        Quellen:{" "}
        <a
          href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Pages: Datenerhebung
        </a>{" "}
        und{" "}
        <a
          href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub-Datenschutzerklärung
        </a>
        .
      </p>
      <p>
        <strong>Vor Veröffentlichung ergänzen:</strong> [zuständige GitHub-Gesellschaft,
        datenschutzrechtliche Rollen / gegebenenfalls Vereinbarungen, zutreffende Rechtsgrundlage
        und berechtigtes Interesse sowie verfügbare Angaben zur Aufbewahrung der Hosting-Protokolle
        prüfen]. Eine konkrete Löschfrist für diese Protokolle wurde nicht verifiziert; es wird
        keine feste Frist zugesagt.
      </p>

      <h2>3. Lokal bereitgestellte Schriftarten</h2>
      <p>
        Die Schriftarten Sora und Manrope werden als lokale WOFF2-Dateien zusammen mit dieser
        Website ausgeliefert. Der Browser lädt sie vom selben Hosting wie die übrigen
        Projektdateien. Es sind weder externe Google-Stylesheets noch Verbindungsaufbauten zu Google
        für die Schriften eingebunden. Aus der Schrifteinbindung entsteht deshalb keine zusätzliche
        Verbindung des Besuchers zu Google.
      </p>
      <p>
        Die Schriften stehen unter der SIL Open Font License 1.1. Die jeweiligen Lizenztexte sind
        hier verfügbar: <a href={sitePath("/fonts/sora-OFL.txt")}>Sora-Lizenz</a> und{" "}
        <a href={sitePath("/fonts/manrope-OFL.txt")}>Manrope-Lizenz</a>. Herkunftsangaben dienen nur
        der Dokumentation und laden keine externen Ressourcen.
      </p>

      <h2>4. Lokale Demodaten und Speicherdauer</h2>
      <p>
        Formulare, Mitarbeiterbereich und CRM verwenden eine lokale Datenschicht. Demo-Eingaben
        werden von der Anwendung nicht an einen Energieanbieter, eine produktive Datenbank oder
        einen Maildienst übermittelt. Auch die Demo-Anmeldung ist lokal; sie ist kein echtes
        Kundenkonto und schützt keine vertraulichen Informationen.
      </p>
      <ul>
        <li>
          <strong>localStorage:</strong> Beispiel-Leads, eingegebene Kontakt- und Verbrauchsdaten,
          CRM-Status, Notizen, Wiedervorlagen, Profile, Artikel, Tarife und weitere Demoänderungen
          bleiben bis zum Zurücksetzen oder Löschen der Website-Daten gespeichert. Es gibt keine
          eingebaute zeitliche Löschfrist.
        </li>
        <li>
          <strong>Lokale Anmeldung:</strong> Die gewählte Demo-Benutzerkennung liegt ebenfalls im
          localStorage. Abmelden oder Zurücksetzen entfernt diese Kennung; bloßes Schließen des
          Browsers meldet nicht zuverlässig ab.
        </li>
        <li>
          <strong>sessionStorage:</strong> Formularentwurf, aktueller Schritt und Bestätigungsnummer
          gelten für die Tabsitzung. Entwurfsdaten werden nach erfolgreicher Übermittlung entfernt.
          Browser können Sitzungen wiederherstellen; das Schließen eines Tabs ist daher keine
          verlässliche vollständige Löschmethode.
        </li>
        <li>
          <strong>IndexedDB:</strong> Hochgeladene Beispieldokumente werden lokal in der Datenbank
          energie-entwurf-documents-v1 abgelegt. Sie bleiben bis zum Löschen des Dokuments,
          Zurücksetzen der Demo, Löschen der Website-Daten oder einer Bereinigung durch den Browser
          gespeichert.
        </li>
        <li>
          <strong>Arbeitsspeicher:</strong> Noch nicht gespeicherte Dateiauswahlen können
          vorübergehend im laufenden Tab gehalten werden; ein Neuladen beendet diese flüchtige
          Speicherung.
        </li>
      </ul>
      <p>
        Die Speicher dienen der interaktiven Demo, dem Fortsetzen von Eingaben und dem
        Wiederanzeigen lokaler Änderungen. Es gibt keine geräteübergreifende Synchronisierung.
        Andere Personen im selben Browserprofil können auf gespeicherte Daten zugreifen. Der Browser
        trennt Speicher nach Origin, nicht nach Repository-Pfad; andere Projekte unter demselben
        github.io-Host sind keine zusätzliche Sicherheitsgrenze.
      </p>
      <p>
        Einzelne Auswahlwerte wie Postleitzahl, Verbrauch oder ein Empfehlungscode können in der
        Seiten-URL enthalten sein. Bei direktem Aufruf, Neuladen oder Weitergabe solcher URLs können
        diese Werte beim Hosting ankommen und in Browser-Verlauf oder übermittelten Links stehen.
        Bitte auch dort ausschließlich Beispieldaten verwenden.
      </p>

      <h2>5. Cookies und der Einstellungsdialog</h2>
      <p>
        In den aktuell eingebundenen Anwendungskomponenten werden nach Quelltextprüfung keine
        eigenen HTTP-Cookies gesetzt. Der Dialog „Cookies &amp; Datenschutz“ speichert die Auswahl
        mit Zeitstempel im localStorage unter energie-entwurf-cookie-consent-v3, ohne automatische
        Ablaufzeit. Diese Einstellung bleibt beim Zurücksetzen der Demo erhalten und kann separat
        über die Website-Daten des Browsers gelöscht werden.
      </p>
      <p>
        Die Schalter für Statistik, Marketing und KI-Assistent simulieren Einstellungen. Es sind
        keine entsprechenden Dienste angeschlossen; auch „Alle akzeptieren“ aktiviert sie nicht. Der
        Dialog ist derzeit keine technische Einwilligungssteuerung für externe Dienste oder das
        Hosting. Die allgemeinen Cookie-Angaben von GitHub für seine eigenen Plattformseiten belegen
        nicht, welche Cookies eine konkrete Pages-Auslieferung setzt. Etwaige vom Hosting gesetzte
        Cookies sind bei der späteren Live-Abnahme gesondert zu kontrollieren.
      </p>

      <h2>6. Weitere Dienste und Inhalte</h2>
      <p>
        Supabase einschließlich Auth und Storage, OpenAI, Resend, Turnstile und externe Webhooks
        sind deaktiviert. Es gibt keine eingebundenen Analyse- oder Marketingtracker, Karten-,
        Video- oder Social-Media-Widgets im bereitgestellten Ausgangsstand. Die eigenen Logos,
        Illustrationen, Beispielbilder sowie der Lottie-Player einschließlich WASM werden als lokale
        Projektdateien ausgeliefert.
      </p>
      <p>
        Der Redaktionsbereich erlaubt die Eingabe externer HTTPS-Bildadressen. Wenn solche Adressen
        lokal ergänzt und in einer Vorschau oder einem Artikel angezeigt werden, kann der Browser
        den jeweiligen Bildanbieter kontaktieren und technische Verbindungsdaten übermitteln. Die
        mitgelieferten Artikel verwenden lokale Bilder. Externe Textlinks, etwa zu diesen Quellen,
        öffnen das jeweilige Angebot erst beim Anklicken.
      </p>

      <h2>7. Rechtsgrundlagen und mögliche Übermittlungen außerhalb des EWR</h2>
      <p>
        <strong>Noch zu prüfen:</strong> Die tragfähige Rechtsgrundlage ist je Verarbeitung
        festzulegen, einschließlich einer etwaigen Interessenabwägung nach Art. 6 Abs. 1 Buchst. f
        DSGVO oder einer erforderlichen Einwilligung. Für Zugriffe auf den Endgerätespeicher ist
        zusätzlich{" "}
        <a
          href="https://www.gesetze-im-internet.de/ttdsg/__25.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          § 25 TDDDG
        </a>{" "}
        zu prüfen; eine Ausnahme wegen unbedingter Erforderlichkeit wird nicht pauschal für alle
        Demofunktionen behauptet.
      </p>
      <p>
        Beim vorgesehenen Hosting über GitHub kann eine Verarbeitung außerhalb des EWR in Betracht
        kommen. [Empfänger, betroffene Länder und konkret einschlägige Übermittlungsgrundlage vor
        Veröffentlichung prüfen und ergänzen.] Eine Zertifizierung oder andere Garantie wird in
        diesem Entwurf nicht ungeprüft zugesagt. Eine etwaige Einwilligung müsste tatsächlich
        eingeholt und technisch beachtet werden; ein Hinweistext allein genügt dafür nicht.
      </p>

      <h2>8. Löschen und Datenschutzrechte</h2>
      <p>
        Über „Demo zurücksetzen“ auf der Anmeldeseite oder unter Einstellungen können lokale
        Demoänderungen, Dokumente, Formularentwürfe und die lokale Anmeldung entfernt werden. Zum
        vollständigen Entfernen einschließlich der gespeicherten Dialogauswahl löschen Sie die
        Website-Daten in den Browsereinstellungen. Dies löscht keine gegebenenfalls beim Hosting
        oder bei externen Anbietern liegenden Protokolle. Der Betreiber kann Ihren lokalen
        Browserspeicher nicht aus der Ferne zurücksetzen.
      </p>
      <p>
        Soweit personenbezogene Daten verarbeitet werden, bestehen nach Maßgabe der DSGVO Rechte auf
        Auskunft, Berichtigung, Löschung, Einschränkung, gegebenenfalls Datenübertragbarkeit sowie
        Widerspruch. Eine Einwilligung kann mit Wirkung für die Zukunft widerrufen werden. Außerdem
        besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde. Maßgeblich sind
        insbesondere Art. 15–22 und 77 der{" "}
        <a
          href="https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de"
          target="_blank"
          rel="noopener noreferrer"
        >
          DSGVO
        </a>
        .
      </p>
      <p>
        [Erreichbaren Datenschutzkontakt oben einsetzen; für den Betreiber zuständige
        Aufsichtsbehörde mit Kontakt / Website nach Feststellung seines Sitzes ergänzen.] Bitte
        senden Sie Anliegen nicht an die fiktiven Demo-Adressen.
      </p>
      <p className="text-xs text-muted-foreground">
        Prüfentwurf · Stand: 20. Oktober 2026 · Vor Veröffentlichung prüfen und die markierten
        Felder vervollständigen. Eine Live-Prüfung von Cookies und Netzverbindungen steht noch aus.
      </p>
    </StaticPage>
  ),
});
