import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Shield, Zap, Star, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen & Preise | Finanzaufsicht-Schutz",
  description:
    "Schnellcheck (EUR 149), Fallanalyse (EUR 990), Vollpaket (EUR 4.900), Strategiebegleitung (EUR 14.900). Transparente Preise, klare Leistungen.",
};

const pakete = [
  {
    name: "Schnellcheck",
    preis: "EUR 149",
    icon: Zap,
    farbe: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: null,
    beschreibung: "Erste strukturierte Einschätzung Ihrer Situation in 15–20 Minuten.",
    leistungen: [
      "20 strukturierte Fragen zu Ihrem Fall",
      "Ampel-Ergebnis (Grün / Gelb / Rot)",
      "Risikobewertung mit Score",
      "5–10 konkrete Handlungsempfehlungen",
      "Relevante Rechtsgrundlagen",
      "Sofortzugang nach Zahlung",
    ],
    href: "/schnellcheck",
    cta: "Schnellcheck starten",
  },
  {
    name: "Fallanalyse",
    preis: "EUR 990",
    icon: Shield,
    farbe: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-300",
    badge: "Beliebt",
    beschreibung: "Detaillierte schriftliche Analyse Ihres Sachverhalts mit Verteidigungsansätzen.",
    leistungen: [
      "Alles aus dem Schnellcheck",
      "Schriftliche Fallanalyse (10–15 Seiten)",
      "Bewertung der Behördenqualifikation",
      "Verteidigungsstrategien",
      "Mustervorlagen für erste Behördenschreiben",
      "Empfehlung: welcher Anwalt-Typ passt",
    ],
    href: "/fallanalyse",
    cta: "Fallanalyse beauftragen",
  },
  {
    name: "Vollpaket",
    preis: "EUR 4.900",
    icon: Star,
    farbe: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: null,
    beschreibung: "Komplette Dokumentationsunterstützung und Anwaltsvermittlung aus einer Hand.",
    leistungen: [
      "Alles aus der Fallanalyse",
      "Vollständiges Aktendossier erstellen",
      "Behördenkommunikation vorbereiten",
      "Spezialisierte Anwaltsvermittlung",
      "Begleitung über 6 Monate",
      "3× persönliche Strategiegespräche",
    ],
    href: "/vollpaket",
    cta: "Vollpaket anfragen",
  },
  {
    name: "Strategiebegleitung",
    preis: "EUR 14.900",
    icon: Crown,
    farbe: "text-gray-700",
    bg: "bg-gray-50",
    border: "border-gray-300",
    badge: "Premium",
    beschreibung: "Individuelle Langzeitbegleitung für komplexe Verfahren mit hohem Streitwert.",
    leistungen: [
      "Alles aus dem Vollpaket",
      "Unbegrenzte Strategiegespräche (12 Monate)",
      "Koordination mit mehreren Kanzleien",
      "Öffentlichkeitsstrategie auf Wunsch",
      "Krisenmanagement bei Mediendruck",
      "Direktzugang zum Gründer",
    ],
    href: "/strategiebegleitung",
    cta: "Persönlich anfragen",
  },
];

export default function LeistungenPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-950 text-white py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unsere Leistungen
          </h1>
          <p className="text-xl text-blue-200">
            Transparente Preise. Klare Leistungen. Kein Rechtsrat.
          </p>
        </div>
      </section>

      {/* Preistabelle */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pakete.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className={`rounded-xl border-2 ${p.border} p-6 flex flex-col`}
                >
                  <div className={`${p.bg} rounded-lg p-3 w-fit mb-4`}>
                    <Icon className={`h-6 w-6 ${p.farbe}`} />
                  </div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{p.name}</h3>
                    {p.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {p.badge}
                      </Badge>
                    )}
                  </div>
                  <p className={`text-2xl font-bold ${p.farbe} mb-3`}>
                    {p.preis}
                  </p>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    {p.beschreibung}
                  </p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {p.leistungen.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{l}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-blue-900 hover:bg-blue-800"
                    render={<Link href={p.href} />}
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center max-w-4xl mx-auto">
          <strong>Hinweis:</strong> Alle Leistungen sind informatorischer Natur
          und stellen keine Rechtsberatung im Sinne des RDG dar. Preise
          verstehen sich zzgl. gesetzlicher Mehrwertsteuer. Für rechtliche
          Einschätzungen konsultieren Sie einen spezialisierten Rechtsanwalt.
        </p>
      </section>
    </div>
  );
}
