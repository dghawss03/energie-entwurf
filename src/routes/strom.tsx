import { siteUrl } from "@/lib/site-url";
import { createFileRoute } from "@tanstack/react-router";
import {
  Zap,
  Leaf,
  Car,
  Flame,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TopicHero, FeatureGrid, ImageSplit, FinalCta } from "@/components/site/TopicSections";
import heroImg from "@/assets/page-strom.svg";
import splitImg from "@/assets/solution-autostrom.svg";
import ctaBg from "@/assets/final-cta-bg.svg";

export const Route = createFileRoute("/strom")({
  head: () => ({
    meta: [
      { title: "Stromtarife persönlich prüfen | Energie Entwurf" },
      {
        name: "description",
        content:
          "Energie Entwurf prüft Stromtarife für Haushalt, Ökostrom, E-Auto und Wärmepumpe persönlich und verständlich.",
      },
      { property: "og:title", content: "Strom vergleichen | Energie Entwurf" },
      {
        property: "og:description",
        content: "Stromtarife verständlich prüfen und den Wechsel auf Wunsch begleiten lassen.",
      },
      {
        property: "og:image",
        content: siteUrl("/social-card.svg"),
      },
    ],
  }),
  component: StromPage,
});

const features = [
  {
    icon: TrendingDown,
    title: "Kosten im Blick",
    desc: "Wir betrachten Grundpreis, Arbeitspreis, Laufzeit und mögliche Boni gemeinsam.",
  },
  {
    icon: ShieldCheck,
    title: "Nachvollziehbare Auswahl",
    desc: "Sie erfahren, welche Tarifmerkmale für Ihre Situation besonders wichtig sind.",
  },
  {
    icon: Sparkles,
    title: "Persönliche Beratung",
    desc: "Sie können Rückfragen direkt mit unserem Team besprechen und Konditionen einordnen lassen.",
  },
  {
    icon: BadgeCheck,
    title: "Wechselunterstützung",
    desc: "Wenn Sie sich entscheiden, begleiten wir die vereinbarten Schritte zum neuen Tarif.",
  },
  {
    icon: Leaf,
    title: "Ökostrom-Tarife",
    desc: "Auf Wunsch beziehen wir Ökostromtarife und deren Nachweise in die Prüfung ein.",
  },
  {
    icon: Car,
    title: "Autostrom & Wärmestrom",
    desc: "Wir berücksichtigen Sondertarife für Wallbox, Wärmepumpe oder getrennte Zähler.",
  },
];

function StromPage() {
  return (
    <SiteLayout>
      <TopicHero
        kicker="Strom vergleichen"
        title={<>Strom, der zu Ihrem Leben passt.</>}
        lead="Ob Haushalt, Ökostrom, E-Auto oder Wärmepumpe: Energie Entwurf ordnet passende Tarifoptionen für Ihren Verbrauch verständlich ein."
        image={heroImg}
        imageAlt="Illustration eines Wohnhauses mit Windenergie"
        Icon={Zap}
        secondaryCta={{ to: "/ablauf", label: "So läuft der Wechsel ab" }}
      />

      <FeatureGrid
        title="Warum mit Energie Entwurf wechseln?"
        intro="Sechs Punkte, auf die wir bei Ihrer persönlichen Tarifprüfung achten."
        items={features}
      />

      <ImageSplit
        eyebrow="Tarifarten"
        title="Vier Anwendungen, eine klare Beratung"
        body="Haushalt, E-Auto und Wärmepumpe stellen unterschiedliche Anforderungen an einen Tarif. Wir berücksichtigen Verbrauch, Zählerart und Ihre persönlichen Wünsche."
        image={splitImg}
        imageAlt="Illustration eines Elektroautos an einer Ladestation"
        bullets={[
          "Haushaltsstrom. Stabil, einfach, transparent",
          "Ökostrom mit nachvollziehbaren Herkunfts- oder Gütenachweisen",
          "Autostrom: Sondertarif für Wallbox und E-Auto",
          "Wärmestrom: Für Nachtspeicher- und Wärmepumpenheizungen",
        ]}
      />

      <ImageSplit
        reverse
        eyebrow="So sparen Sie wirklich"
        title="Mehr als nur den ersten Abschlag betrachten"
        body="Ein niedriger Monatsabschlag allein sagt wenig aus. Wir beziehen Laufzeit, Preisgarantie, Kündigungsfrist und mögliche Boni in die Einordnung ein."
        image={ctaBg}
        imageAlt="Illustration eines Hauses mit Solarmodulen"
        bullets={[
          "Gesamtkosten über die betrachtete Vertragsdauer",
          "Preisgarantie und Ausnahmen verständlich erklärt",
          "Vertragslaufzeit und Kündigungsfrist im Blick",
        ]}
      />

      <FinalCta
        title="Passt Ihr aktueller Stromtarif noch?"
        body="Starten Sie die kostenlose Anfrage. Energie Entwurf prüft Ihre Angaben und meldet sich mit einer persönlichen Einschätzung."
        image={ctaBg}
      />
    </SiteLayout>
  );
}
