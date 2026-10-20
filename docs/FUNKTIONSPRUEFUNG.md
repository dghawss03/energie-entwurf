# Funktionsprüfung – Entwurf Energie

Stand: 20. Oktober 2026. Ausschließlich lokale Demo, keine Veröffentlichung.

## Änderungen

- Mobile CRM-Navigation mit den vorhandenen Sheet-Komponenten; dieselben rollenabhängigen Menüpunkte wie auf dem Desktop. Schmale Inhaltsbereiche und Statistikbeschriftungen sind angepasst.
- Statusfilter greifen vor der Seiteneinteilung. Suchergebnisse außerhalb der ersten Seite gehen dadurch nicht verloren.
- Formularübermittlung akzeptiert ein nicht angegebenes Vertragsenddatum. Mehrfachklicks während der Übermittlung sind gesperrt. Ein Fehler beim Löschen des Formularentwurfs erzeugt nach erfolgreicher Speicherung keinen irreführenden Übermittlungsfehler.
- Angebotsaktionen erstellen lokale, versionierte Beispieltarifangebote aus dem aktiven Demo-Katalog. Versand und E-Mail-Aktion erzeugen nur Kommunikationsvermerke. Ablehnen aktualisiert Status und Historie. Notizmarkierungen bleiben gespeichert.
- Abgeschlossene Leads erscheinen in der Kundenansicht und sind von dort erreichbar. Angebotszahlen und mögliche Ersparnisse stammen aus gespeicherten Angeboten, statt aus festen Beispielwerten. Neue Kundenanfragen verwenden die bestehende Angebotsstrecke.
- 18 ausdrücklich fiktive Ausgangsvorgänge über mehrere Monate, drei Anbieter, sechs Tarife sowie Notizen und Kommunikationsvermerke. Bestehende lokale Bearbeitungen bleiben beim Ergänzen zusätzlicher Beispieldatensätze erhalten.
- Monatsbalken haben eine tatsächliche Höhe; Funnel zählt spätere Bearbeitungsstände mit. Quellen werden aus den aktuellen Vorgängen aggregiert.
- Der Animationsplayer wird in einem separaten JavaScript-Modul erst bei Bedarf geladen. Sein WASM bleibt ein lokales Build-Asset. Bestehendes Layout, Branding und Animation bleiben erhalten.

## Automatisierte Prüfungen

`npm.cmd run check` umfasst TypeScript, ESLint, Vitest und Produktionsbuild. Die Workflowtests verwenden einen Browser-Speicherersatz und einen gesperrten `fetch`-Mock. Sie ersetzen keinen Klicktest im Browser.

Ergebnisse: TypeScript ohne Fehler; ESLint ohne Fehler mit neun bestehenden Fast-Refresh-Warnungen; 42 Tests in acht Dateien bestanden. Der lokale HTTP-Audit erreicht 55 Seiten und statische Ziele ohne Fehler und bestätigt 35 deaktivierte Backend-Routen. Der Produktionsbuild erzeugt weiterhin Vercel-Artefakte ausschließlich lokal.

Der große gemeinsame JavaScript-Block sinkt durch das Auslagern des Animationsplayers von zuvor ungefähr 984 auf 657 kB; das separate Player-Modul umfasst rund 331 kB. Die bestehende Chunkgrößenwarnung bleibt damit bestehen. Das ist eine Buildgrößenmessung, keine gemessene Verbesserung der Ladezeit auf einem Endgerät.

Geprüfte Abläufe: Strom, Gas, kombinierte Anfragen und gewerbliche Kundentypen; Übertragung des Formularmodells in den lokalen Speicher; Suche, Zuweisung, Mitarbeiterzugriff, Notiz und wichtige Markierung, Wiedervorlage, Angebotserstellung, simulierter Versand, Abschluss und Kennzahlen. Zusätzlich bestehen Prüfungen für Pagination, Seed-Ergänzung, fehlenden Tarifkatalog, Rollenrechte, lokale Dokumente und deaktivierte Integrationen.

`node scripts/audit-local-demo.mjs` prüft ausschließlich localhost: öffentliche und Mitarbeiter-Routen, alle initialen Wissensartikel sowie erreichbare statische Ziele. Alle 35 vorhandenen Backend-Routen müssen POST mit HTTP 410 zurückweisen. Es werden keine Kundendaten gesendet. Ein HTTP-200 der Mitarbeiterhülle belegt keinen gerenderten CRM-Bildschirm: Anmeldung und Daten existieren nur im Browser.

## Funktionsumfang und Simulation

Lokal nutzbar sind Anfrageerfassung, Demo-Anmeldung, CRM-Bearbeitung, Zuweisungen, Notizen, Statushistorie, Wiedervorlagen, Dokumentenspeicherung, Angebotsdaten und daraus abgeleitete Statistiken. Änderungen gelten nur für das jeweilige Browserprofil; es gibt keine gemeinsame Datenbank oder Synchronisierung zwischen Geräten.

Tarife und Preise sind fiktiv. Ein kombiniertes Strom-/Gas-Beispielangebot berücksichtigt derzeit den ersten Energieträger; der Angebotstext weist darauf hin. Es gibt keine Live-Marktabfrage, echten Vertrag, tatsächlichen Anruf, Mailversand, Auszahlung oder KI-Auswertung. Vertragsstatus sind lokale Bearbeitungsstände. Umsatz bleibt ohne erfundene Buchungen unberechnet.

Produktive Supabase-, OpenAI-, Resend-, Turnstile- und Webhook-Anbindungen bleiben deaktiviert. Sora und Manrope werden inzwischen lokal ausgeliefert; die vorhandenen CSS-Ersatzschriften bleiben erhalten. Vollständiger Offline-Betrieb nach einem Browserneustart ist ohne laufenden lokalen Server nicht vorgesehen.

## Offene visuelle Abnahme

Der verfügbare Browserdienst meldet keine Browserinstanz. Deshalb wurden keine echten Desktop-, Tablet- oder Smartphone-Klicktests durchgeführt und keine gemessenen Ladezeiten beziehungsweise Core Web Vitals ermittelt. Die responsive Prüfung des Quellcodes und HTTP-Checks ersetzen diese Abnahme nicht.

Noch manuell prüfen:

1. Ansichten bei etwa 1440, 768 und 390 Pixel Breite: öffentliche Menüs, mobiles CRM-Menü, Tabellen, Statistiken und Dialoge; keine überlagernden Bedienelemente.
2. Über den Startseitenrechner eine fiktive Anfrage absenden, Bestätigung ansehen und anschließend mit `admin@example.com` / `Demo2026!` im CRM suchen.
3. Lead zuweisen, als zuständiger Mitarbeiter anmelden, Notiz markieren, Wiedervorlage setzen, Beispielangebot erstellen und Versand simulieren. Nach einem Neuladen alle Änderungen überprüfen.
4. Auf abgeschlossen setzen und Kundenansicht sowie Dashboard kontrollieren. Dokumentvorschau, Download und Tastaturbedienung auf den tatsächlichen Zielgeräten prüfen.
5. Animation und Schriftfallback bei langsamer beziehungsweise gesperrter externer Verbindung prüfen.

Die in REBRANDING.md dokumentierte Prüfung der Betreiber-/Rechtsplatzhalter bleibt vor einer späteren Veröffentlichung erforderlich. Es wurden keine Bibliotheken installiert, Commits, Pushes oder Deployments ausgeführt.
