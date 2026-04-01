import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Mail, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Presse & Medienkit | Finanzaufsicht-Schutz",
  description:
    "Pressematerialien, Faktenblätter und Medienkontakt für Journalisten und Redaktionen.",
};

const materialien = [
  {
    title: "Unternehmens-Factsheet",
    beschreibung: "Kurzprofil, Zahlen, Mission und Geschäftsmodell auf einer Seite.",
    format: "PDF",
    groesse: "340 KB",
  },
  {
    title: "Logo-Paket",
    beschreibung: "Logo in SVG, PNG (transparent & weiß) für Print und Digital.",
    format: "ZIP",
    groesse: "1,2 MB",
  },
  {
    title: "Gründer-Statement",
    beschreibung: "Zitierbare Aussagen zur Plattform, zur Mission und zur BaFin-Praxis.",
    format: "DOCX",
    groesse: "28 KB",
  },
];

const themen = [
  "BaFin-Verfahren gegen FinTech-Unternehmen",
  "Fehlqualifikationen durch Finanzaufsichtsbehörden",
  "Transparenz in der Finanzaufsicht",
  "Rechte von Unternehmen in Verwaltungsverfahren",
  "Digitale Finanzdienstleistungen und Regulierung",
];

export default function PressePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200 py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <Badge variant="secondary" className="mb-4">Presse</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Presse & Medienkit
          </h1>
          <p className="text-lg text-gray-500">
            Materialien für Journalisten, Redaktionen und Blogger. Bei Fragen
            oder Interviewwünschen wenden Sie sich direkt an unseren
            Pressekontakt.
          </p>
        </div>
      </section>

      {/* Materialien */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Pressmaterialien
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {materialien.map((m) => (
              <Card key={m.title} className="border-gray-200">
                <CardHeader className="pb-2">
                  <FileText className="h-6 w-6 text-blue-700 mb-2" />
                  <CardTitle className="text-base">{m.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">{m.beschreibung}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {m.format} · {m.groesse}
                    </span>
                    <button
                      className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-medium"
                      disabled
                      title="Demnächst verfügbar"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Downloads werden in Kürze verfügbar sein.
          </p>
        </div>
      </section>

      {/* Themen */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Themen, zu denen wir sprechen
          </h2>
          <ul className="space-y-2">
            {themen.map((t) => (
              <li key={t} className="flex items-center gap-2 text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-700 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kontakt */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pressekontakt
          </h2>
          <p className="text-gray-500 mb-6">
            Für Interviewanfragen, Stellungnahmen und weitere Materialien.
          </p>
          <Button
            className="bg-blue-900 hover:bg-blue-800"
            render={<Link href="/kontakt" />}
          >
            <Mail className="h-4 w-4 mr-2" />
            Presseanfrage senden
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  );
}
