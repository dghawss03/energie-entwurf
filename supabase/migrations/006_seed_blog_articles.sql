-- Energie Entwurf: ausschließlich selbst formulierte, fiktive Referenzinhalte.
-- Archivschema, nicht für die lokale Demo ausführen.
INSERT INTO public.blog_articles (slug, title, teaser, image, tag, author, body, read_time_min, is_published, published_at)
SELECT seed.slug, seed.title,
  'Fiktiver Ratgeber zur lokalen Demo. Keine aktuellen Marktangebote oder Beratung.',
  '/social-card.svg', 'Demo', 'Energie Entwurf Redaktion',
  jsonb_build_array(jsonb_build_object(
    'heading', 'So funktioniert dieses Beispiel',
    'paragraphs', jsonb_build_array(
      'Energie Entwurf demonstriert Energievergleiche und digitale Kundenverwaltung mit fiktiven Daten.',
      'Anfragen, Dokumente und Bearbeitungsschritte bleiben lokal im Browser. Es gibt keinen echten Vertragsabschluss.'
    )
  )), 2, true, now()
FROM (VALUES
  ('strompreis-2026', 'Stromtarife im Demovergleich'),
  ('oekostrom-labels', 'Ökostrom als Tarifmerkmal'),
  ('gaspreise-2026', 'Gastarife im Demovergleich'),
  ('solaranlage-kosten-2026', 'Solarplanung im Beispiel'),
  ('bundle-doppelbonus', 'Strom und Gas kombinieren'),
  ('waermestrom-tarif', 'Wärmestrom im Beispiel'),
  ('solaranlage-foerderungen-2026', 'Solarprojekte strukturieren'),
  ('e-auto-laden', 'Elektromobilität im Beispiel'),
  ('solaranlage-installation', 'Solarplanung Schritt für Schritt'),
  ('heizkosten-senken', 'Verbrauchsdaten verstehen'),
  ('ein-vertrag-statt-zwei', 'Tarifvarianten vergleichen'),
  ('anbieterwechsel-schritt-fuer-schritt', 'Ein simulierter Anbieterwechsel'),
  ('unterlagen-beim-wechsel', 'Beispieldokumente verwalten')
) AS seed(slug, title)
ON CONFLICT (slug) DO NOTHING;
