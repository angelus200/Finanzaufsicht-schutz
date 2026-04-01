import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Target, Eye, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Über uns – Wer wir sind | Finanzaufsicht-Schutz",
  description:
    "Finanzaufsicht-Schutz wurde von einem direkt Betroffenen gegründet. Wir liefern Wissen, Transparenz und Orientierung für Unternehmen in Finanzaufsichtsverfahren.",
};

const werte = [
  {
    icon: Shield,
    title: "Unabhängigkeit",
    text: "Keine Kanzleibindung, keine versteckten Interessenkonflikte. Wir sind ausschließlich den Betroffenen verpflichtet.",
  },
  {
    icon: Eye,
    title: "Transparenz",
    text: "Öffentliche Datenbasis, nachvollziehbare Methodik, klare Preisgestaltung. Keine Überraschungen.",
  },
  {
    icon: Target,
    title: "Sachlichkeit",
    text: "Kein Rechtsrat, aber fundierte Sachinformation auf juristisch geprüfter Basis.",
  },
  {
    icon: Users,
    title: "Gemeinschaft",
    text: "Aufbau einer Plattform für Betroffene, die voneinander lernen und sich gegenseitig stärken.",
  },
];

export default function UeberUnsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-950 text-white py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Shield className="h-12 w-12 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wir waren selbst betroffen.
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Finanzaufsicht-Schutz wurde gegründet, weil wir am eigenen Leib
            erfahren haben, wie Unternehmen durch fehlerhafte
            Behördenqualifikationen in existenzbedrohende Situationen geraten —
            ohne ausreichend Wissen, Orientierung und Gegenmacht.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Unsere Mission
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Die Finanzaufsicht hat weitreichende Befugnisse — und nutzt sie
              manchmal zu weit. Unternehmen erhalten Warnungen, Untersagungen
              und Bußgelder auf Basis von Tatbestandsqualifikationen, die einer
              rechtlichen Prüfung nicht standhalten.
            </p>
            <p>
              Unser Ziel ist es, Betroffenen das Wissen zu geben, das sie
              brauchen, um ihre Situation realistisch einzuschätzen, ihre Rechte
              zu kennen und die richtigen nächsten Schritte zu gehen.
            </p>
            <p>
              Wir ersetzen keinen Rechtsanwalt — aber wir sorgen dafür, dass
              Sie gut vorbereitet in das erste Mandantengespräch gehen.
            </p>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Unsere Werte
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {werte.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="bg-white rounded-xl p-6 border border-gray-200">
                  <Icon className="h-7 w-7 text-blue-700 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{w.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Lernen Sie unsere Arbeit kennen
          </h2>
          <p className="text-gray-500 mb-6">
            Stöbern Sie in der Wissensdatenbank oder starten Sie den Schnellcheck.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-blue-900 hover:bg-blue-800"
              render={<Link href="/wissen" />}
            >
              Wissensdatenbank
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" render={<Link href="/kontakt" />}>
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
