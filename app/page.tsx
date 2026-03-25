import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Shield,
  AlertTriangle,
  BookOpen,
  Database,
  Megaphone,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

const saeulen = [
  {
    icon: BookOpen,
    title: "Wissensdatenbank",
    beschreibung:
      "Kostenlose Artikel zu BaFin-Verfahren, Rechtsgrundlagen, Tatbeständen und Verteidigungsstrategien.",
    href: "/wissen",
    farbe: "text-blue-600",
  },
  {
    icon: Shield,
    title: "Schnellcheck & Analyse",
    beschreibung:
      "KI-gestützter Fragebogen bewertet Ihre Situation in 15 Minuten mit Ampel-Ergebnis und Empfehlungen.",
    href: "/schnellcheck",
    farbe: "text-amber-600",
  },
  {
    icon: Database,
    title: "Transparenzdatenbank",
    beschreibung:
      "Öffentliche Verfahrensdaten: BaFin-Warnungen, Ergebnisse, Dauer und Verteidigungsstrategien.",
    href: "/datenbank",
    farbe: "text-green-600",
  },
  {
    icon: Megaphone,
    title: "Öffentliche Offensive",
    beschreibung:
      "BaFin-Monitor, Quartalsberichte und Pressemitteilungen für mehr Transparenz im Aufsichtssystem.",
    href: "/bafin-monitor",
    farbe: "text-red-600",
  },
];

const vertrauensPunkte = [
  "Gegründet von einem direkt Betroffenen",
  "Transparente Datenbasis aus öffentlichen Quellen",
  "Kooperation mit spezialisierten Rechtsanwälten",
  "Kein Rechtsrat — reine Sachinformation",
];

export default function Startseite() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="outline"
              className="border-amber-400 text-amber-300 mb-6 text-xs"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              BaFin-Warnung erhalten? Jetzt informieren.
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Wenn die Finanzaufsicht
              <br />
              <span className="text-amber-400">zu Unrecht</span> zugreift
            </h1>

            <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Unternehmen werden von BaFin, FMA und FINMA mit fehlerhaften
              Tatbestandsqualifikationen konfrontiert. Wir liefern das Wissen
              um sich zu verteidigen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-semibold"
                render={<Link href="/schnellcheck" />}
              >
                <Clock className="h-4 w-4 mr-2" />
                Schnellcheck starten — EUR 149
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-white hover:bg-blue-800"
                render={<Link href="/wissen" />}
              >
                Kostenlos informieren
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {vertrauensPunkte.map((punkt) => (
                <span
                  key={punkt}
                  className="flex items-center gap-1.5 text-sm text-blue-300"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                  {punkt}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Die vier Säulen */}
        <section className="py-20 px-4 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Vier Säulen. Ein Ziel.
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Von kostenlosem Wissen bis zur persönlichen Strategiebegleitung —
                je nach Dringlichkeit Ihrer Situation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {saeulen.map((saeule) => {
                const Icon = saeule.icon;
                return (
                  <Card
                    key={saeule.title}
                    className="group hover:shadow-md transition-shadow border-gray-200"
                  >
                    <CardHeader className="pb-3">
                      <Icon className={`h-8 w-8 mb-2 ${saeule.farbe}`} />
                      <CardTitle className="text-base">{saeule.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {saeule.beschreibung}
                      </p>
                      <Link
                        href={saeule.href}
                        className="text-sm font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1"
                      >
                        Mehr erfahren
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Schnellcheck-CTA */}
        <section className="py-16 px-4 bg-gray-50 border-y border-gray-200">
          <div className="mx-auto max-w-3xl text-center">
            <TrendingUp className="h-10 w-10 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Wie kritisch ist Ihre Situation?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Unser Schnellcheck bewertet in 20 Fragen ob ein echter Tatbestand
              vorliegt — oder ob die Behörde Ihr Geschäftsmodell falsch
              qualifiziert hat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-blue-900 hover:bg-blue-800"
                render={<Link href="/schnellcheck" />}
              >
                Schnellcheck für EUR 149 starten
              </Button>
              <Button size="lg" variant="ghost" render={<Link href="/wissen" />}>
                Zuerst informieren
              </Button>
            </div>
          </div>
        </section>

        {/* Rechtlicher Disclaimer */}
        <section className="py-6 px-4">
          <p className="text-xs text-gray-400 text-center max-w-4xl mx-auto">
            <strong>Hinweis:</strong> Diese Plattform bietet keine Rechtsberatung.
            Alle Inhalte dienen ausschließlich der allgemeinen Information. Für
            rechtliche Einschätzungen konsultieren Sie einen spezialisierten
            Rechtsanwalt.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
