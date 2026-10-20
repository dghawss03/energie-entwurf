import { siteUrl } from "@/lib/site-url";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  TrendingDown,
  ShieldCheck,
  FileText,
  Flame,
  Users,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TopicHero, FeatureGrid, ImageSplit, FinalCta } from "@/components/site/TopicSections";
import heroImg from "@/assets/page-gas.svg";
import splitImg from "@/assets/solution-waermestrom.svg";
import ctaBg from "@/assets/final-cta-bg.svg";

export const Route = createFileRoute("/gewerbegas")({
  head: () => ({
    meta: [
      { title: "Gewerbegas persönlich prüfen | Entwurf Energie" },
      {
        name: "description",
        content:
          "Entwurf Energie prüft Gewerbegastarife für Gastronomie, Handwerk, Produktion und mehrere Standorte persönlich.",
      },
      { property: "og:title", content: "Gewerbegas vergleichen | Entwurf Energie" },
      {
        property: "og:description",
        content:
          "Gewerbegas mit verständlicher Einordnung von Preis, Laufzeit und Verbrauchsprofil.",
      },
      {
        property: "og:image",
        content: siteUrl("/social-card.svg"),
      },
    ],
  }),
  component: GewerbegasPage,
});

const features = [
  {
    icon: TrendingDown,
    title: "Kostenstruktur prüfen",
    desc: "Wir betrachten Arbeitspreis, Grundpreis und Laufzeit passend zum Verbrauch Ihres Betriebs.",
  },
  {
    icon: ShieldCheck,
    title: "Festpreisgarantie",
    desc: "Wir stellen verfügbare Festpreisoptionen und deren Bedingungen verständlich dar.",
  },
  {
    icon: Flame,
    title: "Auch Bio-Erdgas",
    desc: "Auf Wunsch berücksichtigen wir Biogasoptionen und die im Angebot genannten Nachweise.",
  },
  {
    icon: FileText,
    title: "Mehrere Standorte",
    desc: "Mehrere Standorte oder Zähler können gemeinsam erfasst und strukturiert betrachtet werden.",
  },
  {
    icon: Users,
    title: "Persönliche Beratung",
    desc: "Fragen zu Verbrauch, Laufzeit und Angeboten besprechen Sie direkt mit unserem Team.",
  },
  {
    icon: BadgeCheck,
    title: "Wechselunterstützung",
    desc: "Nach Ihrer Entscheidung begleiten wir die vereinbarten Schritte zum neuen Vertrag.",
  },
];

function GewerbegasPage() {
  return (
    <SiteLayout>
      <TopicHero
        kicker="Gewerbegas"
        title={
          <>
            Gas für Ihr Unternehmen. <span className="text-success">Planbar und verständlich.</span>
          </>
        }
        lead="Vom Restaurant bis zur Produktion: Entwurf Energie erfasst Ihren Bedarf und ordnet verfügbare Gewerbegastarife verständlich ein."
        image={heroImg}
        imageAlt="Illustration eines Wohnhauses mit Energiespeicher"
        Icon={Building2}
        primaryCta={{
          to: "/angebot?start=gas&kunde=gewerbe",
          label: "Gewerbegas prüfen",
        }}
        secondaryCta={{ to: "/kontakt", label: "Persönliches Angebot anfordern" }}
      />

      <FeatureGrid
        title="Warum Gewerbegas über Entwurf Energie?"
        intro="Sechs Gründe, warum Sie Ihren Gastarif mit uns prüfen sollten."
        items={features}
      />

      <ImageSplit
        eyebrow="Für wen das passt"
        title="Vom Gastronom bis zur Bäckerei"
        body="Gastronomie, Immobilien und Produktion nutzen Gas auf unterschiedliche Weise. Wir berücksichtigen Jahresverbrauch, Standorte und den Zweck des Gasbezugs."
        image={splitImg}
        imageAlt="Illustration eines Hauses mit Energiespeicher"
        bullets={[
          "Bäckereien, Gastronomie, Hotels, Wäschereien",
          "Hausverwaltungen mit zentraler Heizung",
          "Produzierendes Gewerbe mit Prozesswärme",
          "Vorhandene Lastgangdaten bei größeren Verbräuchen",
        ]}
      />

      <ImageSplit
        reverse
        eyebrow="Sicherheit zuerst"
        title="Vertragsdetails sorgfältig betrachten"
        body="Preisgleitklauseln, Laufzeit, Kündigungsfrist und Übergabetermin können für Gewerbekunden besonders wichtig sein. Wir machen diese Punkte sichtbar."
        image={ctaBg}
        imageAlt="Illustration eines Hauses mit Solarmodulen"
        bullets={[
          "Bestehende Vertragslaufzeit berücksichtigen",
          "Preisgarantie und Ausnahmen einordnen",
          "Verfügbare Beschaffungsmodelle verständlich darstellen",
          "Nächste Schritte gemeinsam abstimmen",
        ]}
      />

      <FinalCta
        title="Gewerbegas passend zum Betrieb prüfen"
        body="Senden Sie uns Ihre letzte Jahresrechnung. Die erste Einordnung ist kostenlos und unverbindlich."
        image={ctaBg}
        primaryCta="/angebot?start=gas&kunde=gewerbe"
      />
    </SiteLayout>
  );
}
