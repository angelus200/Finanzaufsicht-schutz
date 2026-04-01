import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Transparenzdatenbank – BaFin-Verfahren | Finanzaufsicht-Schutz",
  description:
    "Öffentliche Datenbank zu BaFin-, FMA- und FINMA-Verfahren. Suchen und filtern nach Tatbestand, Behörde, Ausgang und Verfahrensdauer.",
};

// Platzhalter-Daten für die UI-Shell
const faelle = [
  {
    id: "case-001",
    aktenzeichen: "BaFin-2024-001",
    behoerde: "BaFin",
    tatbestand: "Erlaubnispflichtiger Eigenhandel",
    ergebnis: "EINGESTELLT",
    dauer: "8 Monate",
    branche: "FinTech",
  },
  {
    id: "case-002",
    aktenzeichen: "BaFin-2024-002",
    behoerde: "BaFin",
    tatbestand: "Unerlaubtes Einlagengeschäft",
    ergebnis: "UNTERSAGUNG",
    dauer: "14 Monate",
    branche: "Immobilien",
  },
  {
    id: "case-003",
    aktenzeichen: "FMA-2023-047",
    behoerde: "FMA",
    tatbestand: "Fehlende Prospektpflicht",
    ergebnis: "VERWARNUNG",
    dauer: "6 Monate",
    branche: "Blockchain",
  },
  {
    id: "case-004",
    aktenzeichen: "BaFin-2023-112",
    behoerde: "BaFin",
    tatbestand: "Fehlqualifiziertes B2B-Modell",
    ergebnis: "EINGESTELLT",
    dauer: "11 Monate",
    branche: "SaaS",
  },
  {
    id: "case-005",
    aktenzeichen: "FINMA-2024-008",
    behoerde: "FINMA",
    tatbestand: "Unerlaubte Vermögensverwaltung",
    ergebnis: "BUSSGELD",
    dauer: "18 Monate",
    branche: "Asset Management",
  },
];

const ergebnisVariants: Record<string, string> = {
  EINGESTELLT: "bg-green-100 text-green-800",
  UNTERSAGUNG: "bg-red-100 text-red-800",
  VERWARNUNG: "bg-amber-100 text-amber-800",
  BUSSGELD: "bg-red-100 text-red-800",
};

export default function DatenbankPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Database className="h-6 w-6 text-blue-700" />
          <span className="text-sm font-medium text-blue-700 uppercase tracking-wide">
            Transparenzdatenbank
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Verfahrensdatenbank
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Anonymisierte Verfahrensdaten zu BaFin, FMA und FINMA — für mehr
          Transparenz im Finanzaufsichtssystem.
        </p>
      </div>

      {/* Suche & Filter (UI-Shell) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tatbestand, Aktenzeichen, Branche suchen…"
            className="pl-9"
            disabled
          />
        </div>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-white"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 mb-6">
        Demo-Daten. Suche und Filter werden in Sprint 3 implementiert.
      </p>

      {/* Tabelle */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Aktenzeichen</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Tatbestand</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700 hidden md:table-cell">Branche</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700 hidden sm:table-cell">Dauer</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Ergebnis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {faelle.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link
                    href={`/datenbank/${f.id}`}
                    className="font-medium text-blue-700 hover:text-blue-900"
                  >
                    {f.aktenzeichen}
                  </Link>
                  <p className="text-xs text-gray-400">{f.behoerde}</p>
                </td>
                <td className="px-4 py-3 text-gray-700">{f.tatbestand}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{f.branche}</td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{f.dauer}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${ergebnisVariants[f.ergebnis] ?? "bg-gray-100 text-gray-700"}`}
                  >
                    {f.ergebnis}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        Alle Daten anonymisiert. Kein Rückschluss auf einzelne Unternehmen möglich.
      </p>
    </div>
  );
}
