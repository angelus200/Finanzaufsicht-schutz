import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, CheckCircle, ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Kooperation – Anwälte & Partner | Finanzaufsicht-Schutz",
  description:
    "Kooperation mit Rechtsanwalt Pasquay und weiteren spezialisierten Kanzleien für Kapitalmarktrecht und Finanzaufsichtsverfahren.",
};

const vorteile = [
  "Vorqualifizierte Mandanten durch unseren Schnellcheck",
  "Vollständige Sachverhaltsdarstellung vor dem ersten Gespräch",
  "Gemeinsame Öffentlichkeitsarbeit und Sichtbarkeit",
  "Transparente Vermittlungsprovision ohne Überraschungen",
  "Zugang zur Transparenzdatenbank für Verfahrensresearch",
];

export default function KooperationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-950 text-white py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Handshake className="h-12 w-12 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">
            Kooperation RA Pasquay
          </h1>
          <p className="text-lg text-blue-200">
            Wir vermitteln vorqualifizierte Mandanten an spezialisierte Kanzleien
            für Kapitalmarktrecht und Finanzaufsichtsverfahren.
          </p>
        </div>
      </section>

      {/* Modell */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <Badge className="mb-4">Kooperationsmodell</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Wie die Zusammenarbeit funktioniert
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Betroffene Unternehmen kommen über unsere Plattform, absolvieren
              den Schnellcheck und erhalten eine erste strukturierte Einschätzung
              ihrer Situation. Wenn rechtlicher Beistand sinnvoll ist, vermitteln
              wir sie an unsere Kooperationspartner.
            </p>
            <p>
              Die Mandanten kommen mit vollständiger Sachverhaltsdarstellung,
              Ampel-Ergebnis und konkreten Fragen. Das spart Ihnen Zeit und
              ermöglicht ein effizientes Erstgespräch.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {vorteile.map((v) => (
              <li key={v} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kontakt */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Kooperation anfragen
          </h2>
          <p className="text-gray-500 mb-6">
            Sind Sie spezialisierter Rechtsanwalt und möchten Kooperationspartner
            werden? Schreiben Sie uns.
          </p>
          <Button
            className="bg-blue-900 hover:bg-blue-800"
            render={<Link href="/kontakt" />}
          >
            <Mail className="h-4 w-4 mr-2" />
            Kontakt aufnehmen
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  );
}
