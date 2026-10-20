# Veröffentlichungsprüfung – Energie Entwurf

Stand: 20. Oktober 2026. Veröffentlichung gestoppt; kein Commit, Push oder Deployment.

Die Erlaubnis zur öffentlichen Weiterverwendung des übernommenen Codes und Designs wurde vom Projektverantwortlichen bestätigt. Unternehmensangaben des früheren Rechteinhabers gehören ausdrücklich nicht zur Veröffentlichung.

## Bereinigung

- Frühere Unternehmensbezeichnungen und Identitätsdaten wurden auch aus Migrationsmustern und Testdateien entfernt. Solche Testmuster wären bei einem öffentlichen Repository ebenfalls lesbar gewesen.
- Sichtbare Demo-Kontaktadressen und Formularbeispiele verwenden `example.com`. Diese Adressen sind keine erreichbare Kontaktstelle.
- Ein hervorgehobener Hinweis steht vor dem Seiteninhalt, auch im Mitarbeiterbereich: fiktive Demo, kein echter Energieanbieter, keine echten Vertragsanfragen, nur erfundene Angaben verwenden.
- Der FAQ-Hinweis zur Datenlöschung erklärt das lokale Zurücksetzen, statt eine Bearbeitung von E-Mails zu versprechen.
- Quelltext, SVG-/JSON-Assets, Metadaten, rechtliche Entwürfe, Footer und CRM-Datenschicht wurden geprüft. Der Veröffentlichungsbuild wird erneut erzeugt und separat kontrolliert. Alte lokale Build-Verzeichnisse sind keine Veröffentlichungsquelle; GitHub Pages erhält ausschließlich den neu erzeugten Ordner `dist/client`.
- Das lokale Repository enthält bisher keine Commits. Die rein lesende Abfrage von `origin` hat ebenfalls keine veröffentlichten Referenzen geliefert. Es wird keine Historie aus dem ursprünglichen Kundenrepository übernommen.

## Offene Punkte vor der Veröffentlichung

1. **Tatsächlicher Demo-Betreiber dghWeb:** Das fiktive Kundenimpressum für Energie Entwurf verwendet ausdrücklich markierte Musterfelder. Davon getrennt sind die tatsächlichen Betreiberangaben hinter dghWeb auszufüllen: vollständiger Name / Firma und Rechtsform, gegebenenfalls Vertretung, zustellfähige Anschrift mit Land sowie erreichbare E-Mail und weiterer Kontaktweg. Register- und Umsatzsteuer-/Wirtschafts-ID-Angaben sind soweit vorhanden und einschlägig zu ergänzen. Diese Angaben werden nicht erfunden.
2. **Datenschutzerklärung:** Die tatsächliche verantwortliche Stelle und Datenschutzkontakt fehlen. Die Beschreibung muss für den geplanten Betrieb über GitHub Pages geprüft werden. Google Fonts wurde durch lokale WOFF2-Dateien ersetzt; diese zusätzliche externe Verbindung entfällt. Die vorhandenen Abschnitte zu Empfängern, Rechtsgrundlagen, Speicherdauern und Rechten sind ausdrücklich nicht abschließend geklärt.
3. **Rechtstexte und Democharakter:** Impressum, Datenschutz, AGB und Widerruf sind weiterhin Prüfentwürfe. Für den tatsächlichen Demo-Betrieb ist noch zu klären, welche Texte erforderlich beziehungsweise passend sind und wie Demonstrationsinhalte von tatsächlichen Betreiberinformationen getrennt werden sollen.

Die Anweisung des Projektverantwortlichen lautet, bei ungeklärten rechtlichen Pflichtangaben vor der Veröffentlichung zu stoppen. Deshalb werden keine GitHub-Änderungen und kein Deployment ausgeführt. Diese technische Prüfung ist keine rechtliche Freigabe.

## Aktueller Stand der rechtlichen Entwürfe

Alle vier rechtlichen Seiten enthalten den gewünschten Demonstrationshinweis. Energie Entwurf bleibt das fiktive Kundenunternehmen; dghWeb ist die benannte Projekt-/Betreiberzuordnung und ersetzt nicht die noch fehlende vollständige rechtliche Identität. Layout, Animationen und Demofunktionen bleiben erhalten. Sora und Manrope werden lokal mit ihren OFL-Lizenzen bereitgestellt; die Schriftquelle wird nur dokumentiert, nicht vom Besucherbrowser aufgerufen. Der Einstellungsdialog bleibt eine Demo ohne angeschlossene Trackingdienste. Eine endgültige rechtliche Freigabe sowie die tatsächliche Live-Abnahme sind weiterhin offen.
