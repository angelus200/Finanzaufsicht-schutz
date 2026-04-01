import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, TrendingDown, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Statistiken – BaFin-Verfahren im Überblick | Finanzaufsicht-Schutz",
  description:
    "Aggregierte Statistiken zu BaFin-, FMA- und FINMA-Verfahren: Einstellungsquoten, Verfahrensdauern, häufigste Tatbestände.",
};

const kennzahlen = [
  {
    label: "Verfahren in der Datenbank",
    wert: "142",
    veraenderung: "+23 dieses Quartal",
    icon: BarChart2,
    farbe: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    label: "Einstellungsquote",
    wert: "47%",
    veraenderung: "Bei anwaltlicher Vertretung",
    icon: TrendingDown,
    farbe: "text-green-700",
    bg: "bg-green-50",
  },
  {
    label: "Ø Verfahrensdauer",
    wert: "11,3 Mo.",
    veraenderung: "Median: 9 Monate",
    icon: CheckCircle,
    farbe: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    label: "Häufigste Fehlqualifikation",
    wert: "B2B → KWG",
    veraenderung: "38% aller Fälle",
    icon: AlertTriangle,
    farbe: "text-red-700",
    bg: "bg-red-50",
  },
];

const tatbestaende = [
  { name: "Erlaubnispflichtiger Eigenhandel", anzahl: 38, anteil: 27 },
  { name: "Unerlaubtes Einlagengeschäft", anzahl: 31, anteil: 22 },
  { name: "Fehlende Prospektpflicht", anzahl: 24, anteil: 17 },
  { name: "Unerlaubte Vermögensverwaltung", anzahl: 19, anteil: 13 },
  { name: "Sonstige", anzahl: 30, anteil: 21 },
];

const behoerden = [
  { name: "BaFin", anteil: 68, farbe: "bg-blue-600" },
  { name: "FMA", anteil: 18, farbe: "bg-amber-500" },
  { name: "FINMA", anteil: 14, farbe: "bg-green-500" },
];

export default function StatistikPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">Statistiken</Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Verfahren im Überblick
        </h1>
        <p className="text-lg text-gray-500">
          Aggregierte Daten aus der Transparenzdatenbank. Stand: Q1 2025.
          Demo-Daten.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {kennzahlen.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="border-gray-200">
              <CardContent className="pt-5">
                <div className={`${k.bg} rounded-lg p-2.5 w-fit mb-3`}>
                  <Icon className={`h-5 w-5 ${k.farbe}`} />
                </div>
                <p className={`text-2xl font-bold ${k.farbe} mb-0.5`}>{k.wert}</p>
                <p className="text-xs font-medium text-gray-700">{k.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{k.veraenderung}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tatbestände */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Häufigste Tatbestände</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tatbestaende.map((t) => (
                <div key={t.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{t.name}</span>
                    <span className="text-gray-500 shrink-0 ml-2">{t.anteil}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${t.anteil}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Behörden */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Verfahren nach Behörde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {behoerden.map((b) => (
                <div key={b.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{b.name}</span>
                    <span className="text-gray-500">{b.anteil}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${b.farbe} rounded-full`}
                      style={{ width: `${b.anteil}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Basis: 142 anonymisierte Fälle. Demo-Daten für Illustrationszwecke.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
