import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Ihr Schnellcheck-Ergebnis | Finanzaufsicht-Schutz",
  description: "Ihr persönliches Ampel-Ergebnis zum BaFin-Schnellcheck.",
};

// Ergebnis aus URL-Parametern lesen (Server Component mit searchParams)
export default async function ErgebnisPage({
  searchParams,
}: {
  searchParams: Promise<{ result?: string; score?: string; urgency?: string; reasons?: string; nextSteps?: string }>;
}) {
  const params = await searchParams;
  const result = params.result ?? "YELLOW";
  const score = parseInt(params.score ?? "50", 10);
  const urgency = params.urgency ?? "MEDIUM";
  const reasons: string[] = JSON.parse(params.reasons ?? "[]");
  const nextSteps: string[] = JSON.parse(params.nextSteps ?? "[]");

  const ampel = {
    GREEN: {
      farbe: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
      badgeBg: "bg-green-100 text-green-800",
      icon: CheckCircle,
      label: "Grün — Geringes Risiko",
      text: "Die vorliegenden Informationen deuten auf eine schwache Tatsachengrundlage der Behörde hin. Das Risiko einer berechtigten Qualifikation erscheint gering.",
    },
    YELLOW: {
      farbe: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      badgeBg: "bg-amber-100 text-amber-800",
      icon: AlertTriangle,
      label: "Gelb — Mittleres Risiko",
      text: "Es bestehen sowohl belastende als auch entlastende Faktoren. Eine detaillierte Analyse ist empfehlenswert, um die Situation korrekt einzuordnen.",
    },
    RED: {
      farbe: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      badgeBg: "bg-red-100 text-red-800",
      icon: XCircle,
      label: "Rot — Hohes Risiko",
      text: "Die Faktenlage deutet auf erheblichen Handlungsbedarf hin. Zeitnahe Maßnahmen und rechtlicher Beistand werden dringend empfohlen.",
    },
  }[result as "GREEN" | "YELLOW" | "RED"] ?? {
    farbe: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badgeBg: "bg-amber-100 text-amber-800",
    icon: AlertTriangle,
    label: "Mittleres Risiko",
    text: "",
  };

  const Icon = ampel.icon;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Ampel */}
      <div className={`${ampel.bg} ${ampel.border} border-2 rounded-2xl p-8 mb-8 text-center`}>
        <Icon className={`h-16 w-16 ${ampel.farbe} mx-auto mb-4`} />
        <h1 className={`text-3xl font-bold ${ampel.farbe} mb-2`}>{ampel.label}</h1>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-sm text-gray-600">Score:</span>
          <span className={`text-2xl font-bold ${ampel.farbe}`}>{score}/100</span>
          <Badge className={ampel.badgeBg + " border-0"}>{urgency}</Badge>
        </div>
        <p className="text-sm text-gray-600 max-w-lg mx-auto">{ampel.text}</p>
      </div>

      {/* Faktoren */}
      {reasons.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bewertungsgrundlage
          </h2>
          <ul className="space-y-2">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Nächste Schritte */}
      {nextSteps.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Empfohlene nächste Schritte
          </h2>
          <ul className="space-y-2">
            {nextSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upgrade-CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <Shield className="h-7 w-7 text-blue-700 mb-3" />
        <h3 className="font-semibold text-gray-900 mb-2">
          Nächste Stufe: Detaillierte Fallanalyse
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Eine vollständige schriftliche Fallanalyse (10–15 Seiten) mit
          Verteidigungsstrategien und Anwaltsvermittlung für EUR 990.
        </p>
        <Button
          className="bg-blue-900 hover:bg-blue-800"
          render={<Link href="/fallanalyse" />}
        >
          Fallanalyse beauftragen
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <p className="mt-8 text-xs text-gray-400 text-center">
        Dieses Ergebnis ist informatorisch und stellt keine Rechtsberatung dar.
      </p>
    </div>
  );
}
