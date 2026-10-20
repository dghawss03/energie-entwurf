# Entwurf Energie – lokale Demo

Die Demo verwendet React, TypeScript, TanStack Start/Router und Vite. Für GitHub Pages entsteht ein statischer SPA-Build unter `/energie-entwurf/`. Navigation, Layout und lokale Demofunktionen bleiben erhalten.

## Starten

Node.js 24 und die vorhandene Lockdatei verwenden. Unter Windows gegebenenfalls npm.cmd statt npm aufrufen.

```sh
npm ci
npm run dev
```

Die lokale Entwicklung verwendet ebenfalls `/energie-entwurf/`, beispielsweise `http://localhost:5173/energie-entwurf/` (Port der Terminalausgabe beachten).

Keine .env-Datei, Datenbank, Schlüssel oder externen Backend-Dienste erforderlich. Vorhandene produktive Umgebungsvariablen werden für die Datenzugriffe nicht verwendet.

## Demo-Zugang

Unter `/energie-entwurf/mitarbeiter/login/` anmelden:

| Rolle         | E-Mail               | Demo-Passwort |
| ------------- | -------------------- | ------------- |
| Administrator | admin@example.com    | Demo2026!     |
| Manager       | manager@example.com  | Demo2026!     |
| Mitarbeiter   | employee@example.com | Demo2026!     |

Diese öffentlich bekannten Zugangsdaten dienen nur der lokalen Simulation. Die Rollen bilden die Oberfläche nach und sind keine Sicherheitsgrenze für vertrauliche Daten. Neue Demo-Mitglieder verwenden dasselbe Demo-Passwort; Passwortänderungen und Reset-E-Mails sind deaktiviert.

## Speicherung

- src/lib/demo-store.ts enthält ausschließlich neu erzeugte, fiktive Ausgangsdaten und die zentrale lokale Datenschicht.
- CRM-Änderungen liegen unter energie-entwurf-demo-v1 im localStorage des Browsers.
- Anmeldung liegt unter energie-entwurf-session-v1 im localStorage.
- Hochgeladene Dateien liegen in der lokalen IndexedDB energie-entwurf-documents-v1.
- Die Kundenseite zeigt abgeschlossene Demo-Leads. Es werden keine bisherigen Kundenlisten importiert.
- Demo zurücksetzen auf der Anmeldeseite oder unter Einstellungen löscht die Demo-Daten und Dokumente nach Rückfrage.
- Browser, Ports und Domains haben getrennte Speicher. Es gibt keine Synchronisierung zwischen Geräten oder Mehrbenutzerbetrieb.
- Bei gesperrtem oder vollem Browser-Speicher wird ein Fehler angezeigt. Bei fehlgeschlagenen Dokumenten bleibt die gespeicherte Anfrage erhalten und die Bestätigungsseite weist auf fehlende Dokumente hin.

Bitte ausschließlich erfundene Angaben und Beispieldateien verwenden. Die vorhandene fiktive Beispielrechnung kann im ersten Demo-Lead angesehen werden.

## Deaktivierte Dienste

Supabase-Datenbank, Auth und Storage, OpenAI, Resend, Turnstile und der bisherige Backend-Proxy sind abgeschaltet. GitHub Pages veröffentlicht keine API-Routen und keinen Server. Im optionalen Vercel-Build antworten die stillgelegten HTTP-API-Routen mit 410 DEMO_API_DISABLED und speichern nichts. Auch das bisherige Datenbank-Rebranding-Skript ist stillgelegt.

Die Oberfläche verwendet weiterhin ihre bestehenden API-Funktionen, diese rufen jedoch direkt die lokale Datenschicht auf. Es werden keine HTTP-Schreibanfragen an ein Backend gesendet. Mailereignisse und Prämien sind nur lokale Protokolle beziehungsweise Statusänderungen; keine Nachrichten und keine Zahlungen.

Logo, Favicon, Illustrationen, Social-Card und Lottie-Animation sind neu erstellte lokale Assets. Sora und Manrope werden als lokale WOFF2-Dateien mitgeliefert; es gibt keine Schriftanfragen an Google. Lizenztexte und Herkunft stehen unter public/fonts. Alle Kontaktangaben sind ausdrücklich fiktiv. Impressum, Datenschutz, AGB und Widerruf sind rechtliche Prüfentwürfe. Vor Veröffentlichung müssen die tatsächlichen Betreiberangaben, das Hosting und die rechtlichen Texte geklärt werden. Sämtliche Demo-Kontaktadressen verwenden example.com und sind keine erreichbaren Kontaktstellen. Sitemap und Social-Card verweisen bereits auf die geplante Pages-Adresse; noindex und Disallow bleiben aktiv.

## Prüfen

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run build` erzeugt `dist/client` für GitHub Pages und prüft anschließend das Veröffentlichungsartefakt. Der Build veröffentlicht nichts. `dist/server` ist nur ein lokales Zwischenprodukt des TanStack-Builds und wird niemals hochgeladen. Der bisherige Vercel-Build ist bei Bedarf unter `npm run build:vercel` verfügbar.

## GitHub Pages vorbereiten und später veröffentlichen

Zielrepository: `dghawss03/energie-entwurf`. Geplante URL: https://dghawss03.github.io/energie-entwurf/

Lokal den tatsächlichen statischen Build ohne Backend prüfen:

```sh
npm run check
npm run preview:pages
```

Danach `http://127.0.0.1:4173/energie-entwurf/` öffnen. In einem zweiten Terminal prüft `node scripts/audit-pages.mjs --http` die erzeugten Dateien, Unterseiten, Weiterleitungen und den 404-Fallback. `npm run preview` startet dieselbe rein statische Vorschau. Nach `build:vercel` für die Pages-Vorschau erneut `npm run build` ausführen.

Der Workflow `.github/workflows/pages.yml` baut und testet auf Node.js 24. Er lädt ausschließlich `dist/client` als Pages-Artefakt hoch und veröffentlicht es über die offiziellen GitHub-Pages-Actions. Spätere Pushes auf `main` oder ein manueller Workflowstart lösen diesen Ablauf aus. Solange die Dateien nur lokal vorliegen, wird nichts ausgeführt.

Nach ausdrücklicher Freigabe sind bei GitHub folgende Einstellungen nötig:

1. Das eigene Repository `dghawss03/energie-entwurf` verwenden; der Workflow erwartet den Branch `main`. Bei einem anderen Standardbranch den Workflow anpassen. Bei GitHub Free muss das Repository für Pages öffentlich sein; private Repositories benötigen einen passenden GitHub-Tarif.
2. Unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** wählen. Kein `gh-pages`-Branch, kein `/docs`-Ordner und keine eigene Domain erforderlich.
3. Unter **Settings → Actions → General** die im Workflow verwendeten offiziellen GitHub-Actions zulassen. Es werden keine eigenen Secrets, API-Schlüssel oder Personal Access Tokens benötigt. Der Deploymentjob verwendet den automatisch bereitgestellten GitHub-Token mit `pages: write` und `id-token: write`.
4. Falls Regeln für das Environment `github-pages` bestehen, Deployments von `main` zulassen. Bei gewünschter manueller Freigabe die verfügbaren Environment-Schutzregeln verwenden.
5. Erst nach Freigabe committen und auf das eigene Repository pushen. Unter **Actions → Build and deploy GitHub Pages** den Lauf verfolgen. Ein Push auf `main` startet bei eingerichtetem Pages-Hosting die Veröffentlichung automatisch. Der Freigabestatus der aktuellen Überarbeitung steht in `docs/VEROEFFENTLICHUNGSPRUEFUNG.md`.

Das entspricht dem [offiziellen GitHub-Pages-Workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Der [TanStack-SPA-Modus](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode) behält den vorhandenen Stack bei.

## Routing und Mitarbeiterbereich auf Pages

Vite-Base und Router-Basepath verwenden denselben Projektpfad. Importierte Bilder, CSS, JavaScript, das lokale WASM des Animationsplayers und native Vorschauverlinkungen berücksichtigen diesen Pfad. Die vorhandenen React-Links funktionieren weiterhin ohne Hash-Routing.

Für bestehende öffentliche Seiten, Mitarbeiterseiten und initiale Wissensartikel werden statische `index.html`-Einstiege erzeugt. GitHub Pages ergänzt bei direkten Verzeichnisaufrufen einen Slash; die Übersichten und Login-Prüfungen berücksichtigen ihn. Bei nachträglich erzeugten Lead-/Artikel-IDs liefert `404.html` dieselbe SPA-Einstiegsdatei. Die vollständige URL einschließlich Suchparametern bleibt erhalten, und der Router löst den lokalen Datensatz im Browser auf. Der erste HTTP-Status solcher dynamischen Direktaufrufe bleibt 404; interne Navigation benötigt diesen Fallback nicht. Unbekannte Datensätze zeigen weiterhin die Fehleransicht. JavaScript ist erforderlich.

CRM, Dashboard und Formulare lesen und schreiben ausschließlich Browserdaten. Eine Anfrage erscheint deshalb nur im selben Browserprofil im CRM. Daten vom lokalen Entwicklungsserver werden nicht nach github.io übertragen. Die veröffentlichten Demo-Zugänge sind keine echten Konten und schützen keine vertraulichen Informationen. Browser-Speicher ist an den Origin gebunden, nicht an den Repository-Pfad; andere Projekte unter demselben github.io-Host sind keine getrennte Sicherheitsgrenze.

## Prüfstand der Pages-Vorbereitung

Die Artefaktprüfung kontrolliert Shell- und Chunkverweise, den Projektpfad, fehlende Assets, versehentlich enthaltene Serverdateien und typische Schlüssel-/Tokenformate in Quelltext und Ausgabe. Sie gibt keine gefundenen Schlüsselwerte aus. Im Veröffentlichungsartefakt liegen ausschließlich statische Dateien und fiktive Ausgangsdaten. Keine `.env`, SQL-Dateien, Quellkarten, Supabase-Zugangsdaten oder Serverfunktionen werden veröffentlicht.

Automatisierte Routingtests verwenden den tatsächlichen Routenbaum mit dem Pages-Basepath und lokalem Speicher; sie ersetzen keine Browserprüfung. Desktop- und Mobilansicht konnten mangels verfügbarer Browserinstanz nicht visuell abgenommen werden. Vor der Freigabe sind insbesondere direkte Aufrufe/Neuladen von Login, Leadübersicht, einem gespeicherten Lead und Wissensseiten sowie die vollständige Angebotsstrecke auf Desktop und Smartphone noch im Browser zu prüfen. Die rechtlichen Platzhalter bleiben ebenfalls offen. Historische Dokumente in `docs` sind keine Anleitung, produktive Dienste wieder anzuschließen.

## Marke und Assets

Demo-Projekt von dghWeb – nicht für echte Vertragsanfragen. Neue Assets lassen sich mit `node scripts/generate-brand-assets.mjs` reproduzieren. Details zur Herkunft und Prüfung stehen in docs/REBRANDING.md. Keine Fotos, Logos oder Animationen des früheren Betreibers werden weiterverwendet.

## Kundenentwurf

Die sichtbare Marke lautet Entwurf Energie; Repository- und Hostingpfad `/energie-entwurf/` sowie vorhandene Speicherschlüssel bleiben für bestehende Links und Vorgänge erhalten. Der obere Hinweis kennzeichnet die Website als Entwurf und erklärt die ersetzten Unternehmens- und Kundendaten. Formularbestätigung und simulierte Versand-/Prämienaktionen benennen weiterhin, dass keine externe Übertragung, Bearbeitung oder Auszahlung stattfindet. Die rechtlichen Seiten trennen Unternehmensdarstellung und tatsächlichen Betreiber. Fehlende Betreiberangaben sind ausdrücklich benannt. Offene Punkte für die weitere Veröffentlichung stehen in [docs/VEROEFFENTLICHUNGSPRUEFUNG.md](docs/VEROEFFENTLICHUNGSPRUEFUNG.md).
