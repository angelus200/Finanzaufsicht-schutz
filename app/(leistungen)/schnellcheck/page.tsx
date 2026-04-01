import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Zap, ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Schnellcheck – Ihre Situation in 15 Minuten einschätzen | Finanzaufsicht-Schutz",
  description:
    "KI-gestützter Fragebogen bewertet Ihre BaFin-Situation in 20 Fragen mit Ampel-Ergebnis (Grün/Gelb/Rot) und konkreten Handlungsempfehlungen. EUR 149.",
};

const inhalten = [
  "20 strukturierte Fragen zu Ihrem Fall",
  "Ampel-Ergebnis: Grün, Gelb oder Rot",
  "Risikobewertung mit numerischem Score",
  "5–10 priorisierte Handlungsempfehlungen",
  "Relevante Rechtsgrundlagen erklärt",
  "Sofortzugang zum Ergebnis nach Zahlung",
];

const ablauf = [
  { nr: "1", title: "Fragebogen starten", text: "20 Fragen zu Unternehmen, Vorfall und aktueller Situation." },
  { nr: "2", title: "Ergebnis erhalten", text: "Ampel-Bewertung mit Score und Handlungsempfehlungen." },
  { nr: "3", title: "Nächste Schritte gehen", text: "Direkt umsetzbare Empfehlungen oder Upgrade auf Fallanalyse." },
];

export default function SchnellcheckLandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-amber-500 text-blue-950 border-0 mb-6 font-semibold">
            EUR 149 — Sofortzugang
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wie kritisch ist
            <br />
            Ihre Situation?
          </h1>
          <p className="text-lg text-blue-200 mb-8 max-w-xl mx-auto">
            Unser Schnellcheck bewertet in 20 Fragen, ob die Behörde Ihren
            Tatbestand korrekt qualifiziert hat — mit klarem Ampel-Ergebnis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-semibold"
              render={<Link href="/schnellcheck/fragebogen" />}
            >
              <Zap className="h-4 w-4 mr-2" />
              Jetzt starten — EUR 149
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-400 text-white hover:bg-blue-800"
              render={<Link href="/wissen" />}
            >
              Erst informieren
            </Button>
          </div>
        </div>
      </section>

      {/* Was ist enthalten */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Was Sie für EUR 149 bekommen
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {inhalten.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            So funktioniert der Schnellcheck
          </h2>
          <div className="space-y-4">
            {ablauf.map((s) => (
              <div key={s.nr} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-900">
                  {s.nr}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{s.title}</p>
                  <p className="text-sm text-gray-500">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zeitangabe + CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Dauer ca. 15–20 Minuten</span>
          </div>
          <Button
            size="lg"
            className="bg-blue-900 hover:bg-blue-800"
            render={<Link href="/schnellcheck/fragebogen" />}
          >
            Schnellcheck starten
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <p className="mt-4 text-xs text-gray-400">
            Kein Abo. Einmalige Zahlung. Sofortiger Zugang zum Ergebnis.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-4 bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
            <Shield className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">
              Der Schnellcheck liefert informatorische Einschätzungen, keine
              Rechtsberatung. Für rechtliche Entscheidungen konsultieren Sie
              einen spezialisierten Rechtsanwalt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
