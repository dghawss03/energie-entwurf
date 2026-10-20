# Entwurf Energie – Rebranding

Stand: 20. Oktober 2026. Demo-Projekt von dghWeb – nicht für echte Vertragsanfragen.

## Gestaltung und Herkunft

- Die neuen SVG-Wortmarken für helle und dunkle Hintergründe verwenden Dunkelblau `#0a1f44` und Grün `#88cc27`. Das Signet verbindet ein E mit einem Energieimpuls.
- Favicon und Social-Card verwenden dasselbe neue Signet.
- Sämtliche übernommenen Fotos und Logos wurden aus dem Projekt entfernt. An ihre Stelle treten eigene, im Quellcode erzeugte SVG-Szenen für Wohnen, Gewerbe, Dokumente, Solar, Mobilität und Energie.
- Die Animation verwendet eine eigene lokale Lottie-JSON-Datei und den bereits vorhandenen Player. Bewegungen und Seitenaufbau bleiben erhalten.
- Reproduzierbare Quellen: `scripts/generate-brand-assets.mjs`. Keine Bilddownloads, Stockfotos oder externen Logo-Dateien erforderlich.
- Sora und Manrope werden lokal als WOFF2 bereitgestellt. Die OFL-Lizenzen und Herkunftsangaben liegen unter public/fonts; es werden keine Google-Fonts-Stylesheets oder Preconnects geladen.

## Inhalte und Daten

Öffentliche Seiten, Mitarbeiteroberfläche, Formulartexte, Mailvorschauen, Metadaten, SQL-Referenzinhalte und Dokumentation sind umbenannt. Die zentrale Datenschicht bleibt lokal; produktive Integrationen bleiben deaktiviert. Die öffentliche Quellfassung enthält keine Suchlisten mit Identitätsdaten des früheren Unternehmens. Eine lokale Normalisierung aktualisiert Bildpfade und ersetzt nicht fiktive E-Mail-Domains, ohne CRM-Datensätze zu ersetzen.

Kontaktdaten und Organisationsangaben sind ausdrücklich fiktiv. Es gibt keine echte Telefonnummer, Register- oder Steuerkennung. Demo-Gutscheine und Kundenstimmen sind keine tatsächlichen Referenzen oder Prämien.

## Vor Veröffentlichung offen

1. Tatsächliche Projektverantwortung und erreichbare Betreiber-/Datenschutzkontakte festlegen. Die Projektzuordnung dghWeb allein ersetzt diese Angaben nicht.
2. Impressum, Datenschutz, AGB und Widerruf prüfen und die gekennzeichneten Platzhalter ersetzen. Es liegt keine rechtliche Freigabe vor.
3. Die geplante Hosting-Adresse ist `https://dghawss03.github.io/energie-entwurf/`; Sitemap und Social-Metadaten sind darauf vorbereitet. Robots und globale Metadaten stehen bis zur Prüfung auf keine Indexierung.
4. Hosting-Protokollierung vor Veröffentlichung prüfen. Die Schriften werden inzwischen lokal ausgeliefert.
5. Logo, Illustrationen, responsive Ansichten und lokale Animation im Browser visuell abnehmen. Die Social-Card liegt als SVG vor; Unterstützung durch das spätere Vorschauportal prüfen und gegebenenfalls als PNG exportieren.

Keine Veröffentlichung, Commits oder Pushes gehören zu diesem Rebranding-Schritt.
