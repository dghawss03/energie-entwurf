# Lokale Demo-Datenschicht

## Datenfluss

Oberfläche → src/lib/api-client.ts → src/lib/demo-store.ts → localStorage / IndexedDB.

Die bisherigen Funktionssignaturen und Antwortformate sind erhalten. Es gibt keinen entfernten API-Host und keinen Backend-Proxy. Der Mitarbeiterbereich wird im Browser gerendert, damit lokale Anmeldung und Route-Loader denselben Speicher verwenden. SSR erzeugt ausschließlich neue fiktive Ausgangsdaten und hält keinen veränderlichen globalen Demo-Speicher.

## Funktionen

Leads mit Adressen und Energiebedarf, Statushistorie, Zuweisung, Notizen, Wiedervorlagen, Dokumente, Kommunikationsprotokoll, gespeicherte Beispielangebote, Team, Profil und Benachrichtigungspräferenzen, Anbieter, Tarife, Mailvorlagen, Empfehlungen und Artikel werden lokal verwaltet.

Formular- und Katalogeingaben nutzen weiterhin Zod. Mitarbeiter sehen nur zugewiesene Leads; TeamÄnderungen sind Administratoren vorbehalten. Dies simuliert das Rollenmodell und schützt keine geheimen Daten, da die Demo komplett im Browser kontrollierbar ist.

Dokumente werden mit MIME-/Größenprüfung in IndexedDB gespeichert. Scheitert die Metadatenspeicherung, wird der neu angelegte Blob entfernt. Die bisherige Dokumentenoberfläche erhält ausschließlich eine lokale Asset- oder Data-URL. Es gibt keine signierten Supabase-URLs, OCR oder externe Dateispeicherung.

## Abschaltung

Alle Dateien in src/routes/api verwenden ausschließlich disabledDemoApi aus src/lib/demo-api.server.ts. GET, POST, PATCH, PUT und DELETE antworten mit 410 und Cache-Control: no-store. Direkte HTTP-Aufrufe können die Browserdaten weder lesen noch ändern.

createServiceClient wirft immer einen Fehler; sendEmail gibt immer skipped zurück; der KI-Provider wirft immer einen Fehler; das Chat-Widget ist nicht eingebunden und selbst inert. Turnstile hat kein Widget und führt keine Verifikation aus. Das frühere Datenbankskript kann nicht mehr ausgeführt werden.

Die SQL-Migrationen und historische Betriebsdokumentation sind nur Referenzmaterial. Für diese Demo niemals Migrationen anwenden oder produktive Geheimnisse konfigurieren.

## Grenzen

Keine echte Authentifizierung, Nachrichten, Auszahlung, Vertragsvermittlung oder Marktpreissuche. Die bisher fehlende Kundenanlage und Angebotserstellung werden durch diesen technischen Entkopplungsschritt nicht neu entwickelt. Umsatzdaten werden weiterhin nicht erfunden. Bilder und Animationen liegen als eigene Demoassets lokal vor. Die bisherigen Google Fonts werden weiterhin extern geladen. Navigation und Geschäftslogik sind unverändert.
