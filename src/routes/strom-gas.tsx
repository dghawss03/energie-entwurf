import { siteUrl } from "@/lib/site-url";
import { createFileRoute } from "@tanstack/react-router";
import {
  Layers,
  Gift,
  TrendingDown,
  ShieldCheck,
  Clock,
  FileSignature,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TopicHero, FeatureGrid, ImageSplit, FinalCta } from "@/components/site/TopicSections";
import heroImg from "@/assets/page-strom-gas.svg";
import splitImg from "@/assets/comparison-hero.svg";
import ctaBg from "@/assets/final-cta-bg.svg";

export const Route = createFileRoute("/strom-gas")({
  head: () => ({
    meta: [
      { title: "Strom & Gas gemeinsam prüfen | Energie Entwurf" },
      {
        name: "description",
        content:
          "Energie Entwurf prüft Strom und Gas gemeinsam und stellt kombinierte Angebote den passenden Einzeltarifen gegenüber.",
      },
      { property: "og:title", content: "Strom & Gas gemeinsam prüfen | Energie Entwurf" },
      {
        property: "og:description",
        content: "Gemeinsam oder getrennt: Wir ordnen beide Möglichkeiten verständlich ein.",
      },
      {
        property: "og:image",
        content: siteUrl("/social-card.svg"),
      },
    ],
  }),
  component: StromGasPage,
});

const features = [
  {
    icon: Gift,
    title: "Gemeinsam betrachten",
    desc: "Wir erfassen beide Verbrauchswerte und prüfen, welche Kombination verfügbar ist.",
  },
  {
    icon: FileSignature,
    title: "Weniger Abstimmungsaufwand",
    desc: "Ein gemeinsamer Anbieter kann Verwaltung vereinfachen, ist aber nicht immer günstiger.",
  },
  {
    icon: Clock,
    title: "Termine im Blick",
    desc: "Die bestehenden Laufzeiten für Strom und Gas werden getrennt berücksichtigt.",
  },
  {
    icon: TrendingDown,
    title: "Varianten vergleichen",
    desc: "Kombinierte Angebote werden passenden Einzeltarifen gegenübergestellt.",
  },
  {
    icon: ShieldCheck,
    title: "Konditionen verstehen",
    desc: "Preise, Laufzeiten, Garantien und Boni werden für beide Energiearten eingeordnet.",
  },
  {
    icon: Users,
    title: "Persönliche Beratung",
    desc: "Energie Entwurf bespricht mit Ihnen, welche Variante besser zu Ihrem Haushalt passt.",
  },
];

function StromGasPage() {
  return (
    <SiteLayout>
      <TopicHero
        kicker="Gemeinsam oder getrennt"
        title={<>Strom & Gas passend zusammenstellen.</>}
        lead="Ein gemeinsamer Tarif kann praktisch sein. Zwei Einzeltarife können wirtschaftlicher sein. Energie Entwurf prüft beide Wege."
        image={heroImg}
        imageAlt="Illustration von Gebäuden und Energieinfrastruktur"
        Icon={Layers}
        secondaryCta={{ to: "/ablauf", label: "So läuft der Wechsel ab" }}
      />

      <FeatureGrid
        title="Was bei Strom & Gas gemeinsam zählt"
        intro="Sechs Punkte, die wir bei einer kombinierten Anfrage berücksichtigen."
        items={features}
      />

      <ImageSplit
        eyebrow="Bundle vs. Einzeltarife"
        title="Kombination und Einzeltarife gegenüberstellen"
        body="Wir betrachten verfügbare Kombinationen sowie passende Einzeltarife. Sie erhalten eine verständliche Einordnung und entscheiden selbst, welche Lösung zu Ihnen passt."
        image={splitImg}
        imageAlt="Illustration eines Dokuments mit Verbrauchsdiagramm"
        bullets={[
          "Gesamtkosten für beide Energiearten betrachten",
          "Unterschiedliche Vertragslaufzeiten berücksichtigen",
          "Komfort und Wirtschaftlichkeit gemeinsam abwägen",
        ]}
      />

      <FinalCta
        title="Lohnt sich ein Bundle für Sie?"
        body="Senden Sie Ihre Eckdaten. Energie Entwurf prüft, welche gemeinsame oder getrennte Lösung verfügbar und nachvollziehbar ist."
        image={ctaBg}
      />
    </SiteLayout>
  );
}
