import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Clock, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Falldetail | Transparenzdatenbank – Finanzaufsicht-Schutz",
};

// Platzhalter-Daten für UI-Shell
const demoFall = {
  aktenzeichen: "BaFin-2024-001",
  behoerde: "BaFin",
  tatbestand: "Erlaubnispflichtiger Eigenhandel",
  ergebnis: "EINGESTELLT",
  dauer: "8 Monate",
  branche: "FinTech",
  land: "Deutschland",
  zeitraum: "2023–2024",
  zusammenfassung:
    "Die BaFin qualifizierte das Geschäftsmodell des Unternehmens als erlaubnispflichtigen Eigenhandel. Das Unternehmen konnte im Verwaltungsverfahren darlegen, dass es sich um ein reines B2B-SaaS-Modell ohne Handelstätigkeit handelt. Das Verfahren wurde nach 8 Monaten eingestellt.",
  verteidigungsansaetze: [
    "Nachweis des fehlenden Eigenhandels durch Vertragsanalyse",
    "Darstellung des B2B-Charakters des Geschäftsmodells",
    "Sachverständigengutachten zur technischen Natur der Software",
  ],
  rechtsgrundlagen: ["§ 32 KWG (Erlaubnispflicht)", "§ 1 Abs. 1a Nr. 4 KWG (Eigenhandel)"],
};

export default async function FalldetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params; // Slug wird in Echtimplementation für DB-Lookup verwendet

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/datenbank"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Zur Datenbank
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{demoFall.behoerde}</Badge>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              demoFall.ergebnis === "EINGESTELLT"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {demoFall.ergebnis}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {demoFall.tatbestand}
        </h1>
        <p className="text-gray-500 font-mono text-sm">{demoFall.aktenzeichen}</p>
      </div>

      {/* Metadaten */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div>
          <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Dauer
          </p>
          <p className="text-sm font-medium text-gray-900">{demoFall.dauer}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Zeitraum
          </p>
          <p className="text-sm font-medium text-gray-900">{demoFall.zeitraum}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            Branche
          </p>
          <p className="text-sm font-medium text-gray-900">{demoFall.branche}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Land</p>
          <p className="text-sm font-medium text-gray-900">{demoFall.land}</p>
        </div>
      </div>

      {/* Zusammenfassung */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Sachverhalt
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {demoFall.zusammenfassung}
        </p>
      </section>

      {/* Verteidigung */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Erfolgreiche Verteidigungsansätze
        </h2>
        <ul className="space-y-2">
          {demoFall.verteidigungsansaetze.map((v) => (
            <li key={v} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
              {v}
            </li>
          ))}
        </ul>
      </section>

      {/* Rechtsgrundlagen */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Relevante Rechtsgrundlagen
        </h2>
        <div className="flex flex-wrap gap-2">
          {demoFall.rechtsgrundlagen.map((r) => (
            <Badge key={r} variant="outline" className="text-xs">
              {r}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-medium text-gray-900 mb-0.5">
            Ähnliche Situation?
          </p>
          <p className="text-sm text-gray-600">
            Lassen Sie Ihren Fall mit dem Schnellcheck einschätzen.
          </p>
        </div>
        <Button
          size="sm"
          className="bg-blue-900 hover:bg-blue-800 shrink-0"
          render={<Link href="/schnellcheck" />}
        >
          Schnellcheck starten
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
