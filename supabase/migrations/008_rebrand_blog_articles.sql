-- Energie Entwurf: eigene Demo-Inhalte statt übernommener redaktioneller Texte.
-- Archivschema, nicht für die lokale Demo ausführen.
ALTER TABLE public.blog_articles ALTER COLUMN author SET DEFAULT 'Energie Entwurf Redaktion';
UPDATE public.blog_articles
SET author = 'Energie Entwurf Redaktion',
    teaser = 'Ein fiktiver Ratgeber zur lokalen Demo von Nine.ai.',
    image = '/social-card.svg',
    body = jsonb_build_array(jsonb_build_object(
      'heading', 'Demo statt echter Anfrage',
      'paragraphs', jsonb_build_array(
        'Dieses Beispiel zeigt die digitale Darstellung von Energietarifen und Kundenvorgängen.',
        'Alle Preise und Angaben sind fiktiv. Es wird kein Anbieter kontaktiert und kein Vertrag abgeschlossen.'
      )
    )),
    seo_title = title || ' | Energie Entwurf',
    seo_description = 'Demo-Projekt von Nine.ai – nicht für echte Vertragsanfragen.'
WHERE slug IN ('strompreis-2026', 'oekostrom-labels', 'gaspreise-2026', 'solaranlage-kosten-2026', 'bundle-doppelbonus', 'waermestrom-tarif', 'solaranlage-foerderungen-2026', 'e-auto-laden', 'solaranlage-installation', 'heizkosten-senken', 'ein-vertrag-statt-zwei', 'anbieterwechsel-schritt-fuer-schritt', 'unterlagen-beim-wechsel');
