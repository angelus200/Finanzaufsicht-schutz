import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Mein Fall – Persönliche Fallbegleitung | Finanzaufsicht-Schutz",
  description:
    "Lassen Sie Ihren BaFin-Fall individuell bewerten. Vom Schnellcheck zur Vollbegleitung — wählen Sie das passende Paket für Ihre Situation.",
};

const schritte = [
  {
    nr: "01",
    title: "Schnellcheck starten",
    text: "Beantworten Sie 20 strukturierte Fragen zu Ihrem Fall. In ca. 15–20 Minuten erhalten Sie ein Ampel-Ergebnis mit Handlungsempfehlungen.",
    badge: "EUR 149",
    href: "/schnellcheck",
  },
  {
    nr: "02",
    title: "Fallanalyse beauftragen",
    text: "Unsere Experten analysieren Ihren Sachverhalt detailliert und liefern eine schriftliche Einschätzung mit Verteidigungsansätzen.",
    badge: "EUR 990",
    href: "/fallanalyse",
  },
  {
    nr: "03",
    title: "Vollpaket aktivieren",
    text: "Umfassende Dokumentation, Mustervorlagen, Behördenkommunikation und Anwaltsvermittlung aus einer Hand.",
    badge: "EUR 4.900",
    href: "/vollpaket",
  },
];

export default function MeinFallPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-blue-50 border-b border-gray-200 py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            BaFin-Warnung oder Verfahren?
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ihr persönlicher Weg durch das Verfahren
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wir begleiten Sie von der ersten Einschätzung bis zur vollständigen
            Verteidigungsstrategie — Schritt für Schritt, transparent und ohne
            versteckte Kosten.
          </p>
        </div>
      </section>

      {/* Drei Schritte */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Wählen Sie den richtigen Einstieg
          </h2>
          <div className="space-y-6">
            {schritte.map((s) => (
              <Card key={s.nr} className="border-gray-200">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-gray-200">
                        {s.nr}
                      </span>
                      <div>
                        <CardTitle className="text-lg">{s.title}</CardTitle>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {s.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4 ml-12">{s.text}</p>
                  <div className="ml-12">
                    <Button
                      size="sm"
                      className="bg-blue-900 hover:bg-blue-800"
                      render={<Link href={s.href} />}
                    >
                      Jetzt starten
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Was Sie von uns bekommen
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Klares Ampel-Ergebnis Ihrer Situation",
              "Strukturierte Handlungsempfehlungen",
              "Relevante Rechtsgrundlagen erklärt",
              "Mustervorlagen für Behördenschreiben",
              "Anwaltsvermittlung bei Bedarf",
              "Kein Rechtsrat — reine Sachinformation",
            ].map((punkt) => (
              <div key={punkt} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{punkt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4">
        <p className="text-xs text-gray-400 text-center max-w-3xl mx-auto">
          <strong>Wichtiger Hinweis:</strong> Alle Leistungen von
          Finanzaufsicht-Schutz sind informatorischer Natur und stellen keine
          Rechtsberatung dar. Für rechtliche Einschätzungen konsultieren Sie
          einen spezialisierten Rechtsanwalt.
        </p>
      </section>
    </div>
  );
}
