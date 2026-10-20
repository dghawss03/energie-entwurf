# Veröffentlichung von Entwurf Energie

Stand: 20. Oktober 2026

Die lokale Überarbeitung verwendet durchgehend die Marke Entwurf Energie. Unternehmensdarstellung und tatsächlicher Betreiber dghWeb bleiben auf den rechtlichen Seiten getrennt. Es wurden keine Betreiberangaben erfunden und keine Angaben des ursprünglichen Auftraggebers eingesetzt.

Der Projektverantwortliche hat die Erlaubnis zur öffentlichen Weiterverwendung des übernommenen Codes und Designs bestätigt. Identifizierende Angaben des früheren Unternehmens sind davon ausdrücklich ausgenommen. Die ursprüngliche Repositoryhistorie wurde nicht übernommen; der eigene GitHub-Pages-Stand wurde bereits in einer früheren Sitzung veröffentlicht.

## Offene Angaben und Prüfungen

Für das Betreiberimpressum und den Datenschutzkontakt fehlen weiterhin:

- Vollständiger Name der verantwortlichen Person oder vollständige Firma einschließlich Rechtsform.
- Tatsächliche zustellfähige Anschrift.
- Erreichbare E-Mail-Adresse und geeigneter weiterer unmittelbarer Kontaktweg.
- Soweit zutreffend: Vertretungsberechtigte, Register und Registernummer sowie anzugebende Umsatzsteuer- oder Wirtschafts-Identifikationsnummer.
- Soweit erforderlich: besondere berufsrechtliche Angaben, redaktionell verantwortliche Person oder Datenschutzbeauftragte.

Die Datenschutzangaben benötigen außerdem die abschließende Prüfung der Hostinggesellschaft und ihrer Rolle, der Rechtsgrundlagen einschließlich lokaler Speicherung, möglicher Drittlandübermittlungen, der Hostingprotokolle und der zuständigen Aufsichtsbehörde. Die markierten Felder auf den rechtlichen Seiten bleiben sichtbar. Die Unternehmensfelder von Entwurf Energie sind keine Ersatzangaben für dghWeb.

Maßgebliche Quelle für die Betreiberangaben: [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html). Die vorhandene Datenschutzerklärung verweist auf die DSGVO und § 25 TDDDG; sie enthält keine ungeprüfte Zusage abschließend geklärter Rechtsgrundlagen.

## Technische Grenzen

Anfragen und CRM-Änderungen bleiben im Browserprofil. Dokumente liegen in IndexedDB. Es werden keine Nachrichten versendet, Prämien ausgezahlt oder Verträge an Anbieter übertragen. Diese Grenzen stehen unmittelbar am Abschluss des Formulars und an den betreffenden Aktionen. Repositorypfad, Browser-Speicherschlüssel, Datensatz-IDs, Navigation und Schnittstellen bleiben erhalten.

Die Desktop- und Smartphone-Ansicht sowie sämtliche Bedienabläufe können in dieser Sitzung mangels verfügbarer Browserinstanz nicht visuell beziehungsweise interaktiv abgenommen werden. Automatisierte Tests und die statische HTTP-Prüfung ersetzen diese Abnahme nicht. Eine abschließende Kontrolle der Netzverbindungen und Cookies im Browser steht ebenfalls aus.

## Freigabestatus

Die aktuelle Anweisung erlaubt Commit und Push nur ohne offene rechtliche oder sicherheitsrelevante Veröffentlichungsprobleme. Wegen der oben fehlenden Betreiberangaben und offenen Datenschutzprüfung werden die lokalen Änderungen nicht committet oder gepusht. Es werden keine GitHub- oder Hosting-Einstellungen geändert. Die bereits veröffentlichte Version wird durch diese lokale Überarbeitung nicht aktualisiert.

## Automatisierte Prüfungen dieser Überarbeitung

- TypeScript, Lint, alle 49 Tests in zehn Testdateien und der Pages-Build erfolgreich. Lint meldet neun bestehende Fast-Refresh-Warnungen; der Build weist weiterhin auf einen großen JavaScript-Chunk hin.
- 67 feste interne Links anhand der vorhandenen Routendateien geprüft; keine ungültigen Routenziele oder nativen Links außerhalb des Pages-Unterpfads gefunden.
- Quelltextprüfung auf typische Zugangsdatenmuster: 251 Dateien ohne Treffer. Diese Musterprüfung ist keine vollständige Sicherheitsanalyse.
- Veröffentlichungsartefakt: 189 Dateien und 51 HTML-Einstiege geprüft. Keine erkannten produktiven Endpunkte, Zugangsdaten oder Serverartefakte.
- Statische HTTP-Prüfung erfolgreich: ausgelieferte Dateien, Weiterleitungen im Projektpfad, Fallback für dynamische IDs und Ablehnung von API-Schreibzugriffen.
- Die Tests prüfen lokale Lead-Erfassung, Suche, Status, Notizen, Wiedervorlagen, Dokumente, Rollen, Tariferstellung, Statistiken sowie deaktivierte produktive Integrationen. Eine vollständige interaktive Abnahme aller Buttons und Formularschritte bleibt wie oben beschrieben offen.
