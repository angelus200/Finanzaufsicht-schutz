import type { Metadata } from "next";
import { KontaktFormular } from "@/components/marketing/kontakt-formular";
import { Mail, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt | Finanzaufsicht-Schutz",
  description:
    "Nehmen Sie Kontakt mit Finanzaufsicht-Schutz auf. Wir antworten werktags innerhalb von 24 Stunden.",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Linke Spalte */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontakt</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Haben Sie Fragen zur Plattform, zu unseren Leistungen oder möchten
            Sie eine Kooperation anfragen? Schreiben Sie uns — wir melden uns
            werktags innerhalb von 24 Stunden.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">E-Mail</p>
                <p className="text-sm text-gray-500">info@finanzaufsicht-schutz.de</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Reaktionszeit</p>
                <p className="text-sm text-gray-500">Werktags innerhalb von 24 Stunden</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Vertraulich</p>
                <p className="text-sm text-gray-500">
                  Alle Anfragen werden vertraulich behandelt.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800">
              <strong>Hinweis:</strong> Wir erbringen keine Rechtsberatung. Für
              rechtliche Einschätzungen wenden Sie sich bitte an einen
              spezialisierten Rechtsanwalt.
            </p>
          </div>
        </div>

        {/* Formular */}
        <div>
          <KontaktFormular />
        </div>
      </div>
    </div>
  );
}
