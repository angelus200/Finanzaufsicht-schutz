import type { Metadata } from "next";
import { FaqAccordion } from "@/components/shared/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ – Häufige Fragen zu BaFin-Verfahren | Finanzaufsicht-Schutz",
  description:
    "Antworten auf die häufigsten Fragen zu BaFin-Verfahren, Erlaubnispflicht und der Plattform Finanzaufsicht-Schutz.",
};

const faqItems = [
  {
    question: "Was ist die BaFin und welche Befugnisse hat sie?",
    answer:
      "Die Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin) ist die zentrale Finanzaufsichtsbehörde in Deutschland. Sie überwacht Banken, Versicherungen und Wertpapierdienstleister auf Grundlage von KWG, WpHG, VAG und weiteren Gesetzen. Ihre Befugnisse umfassen Erlaubniserteilung und -entzug, Untersagungsverfügungen, öffentliche Warnungen und Bußgelder.",
  },
  {
    question: "Was bedeutet eine BaFin-Warnung für mein Unternehmen?",
    answer:
      "Eine öffentliche BaFin-Warnung auf der BaFin-Website kann erhebliche Reputationsschäden verursachen. Sie ist ein Verwaltungsakt, gegen den Sie Widerspruch einlegen und ggf. gerichtlichen Schutz beantragen können. Eine Warnung bedeutet nicht automatisch, dass ein Tatbestand vorliegt — die BaFin handelt manchmal auf Basis fehlerhafter Sachverhaltseinschätzungen.",
  },
  {
    question: "Benötige ich für meinen Schnellcheck wirklich EUR 149?",
    answer:
      "Ja. Der Schnellcheck ist eine strukturierte, KI-gestützte Bewertung Ihrer Situation, die auf über 100 Entscheidungsparametern basiert. Das Ergebnis enthält ein Ampel-Urteil, eine Risikobewertung und konkrete Handlungsempfehlungen — kein Rechtsgutachten, aber eine fundierte erste Einschätzung.",
  },
  {
    question: "Ist Finanzaufsicht-Schutz eine Rechtsanwaltskanzlei?",
    answer:
      "Nein. Finanzaufsicht-Schutz ist eine unabhängige Informationsplattform. Wir erbringen keine Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes (RDG). Für rechtliche Einschätzungen empfehlen wir einen spezialisierten Rechtsanwalt für Kapitalmarktrecht. Über unser Kooperationsmodell können wir Ihnen entsprechende Kanzleien vermitteln.",
  },
  {
    question: "Wie lange dauert ein BaFin-Verfahren typischerweise?",
    answer:
      "Abhängig vom Verfahrenstyp: Einfache Anfragen werden in 4–12 Wochen beantwortet. Förmliche Untersagungsverfahren dauern 3–18 Monate. Komplexe Strafverfahren können mehrere Jahre andauern. Unsere Transparenzdatenbank enthält Statistiken zu durchschnittlichen Verfahrensdauern nach Tatbestand.",
  },
  {
    question: "Kann ich einen Fall anonym in die Transparenzdatenbank einreichen?",
    answer:
      "Ja. Alle Falleinreichungen sind vollständig anonym. Wir erfassen keine personenbezogenen Daten, die Rückschlüsse auf das einreichende Unternehmen zulassen. Interne Fall-IDs werden zufällig generiert.",
  },
  {
    question: "Was unterscheidet BaFin, FMA und FINMA?",
    answer:
      "Die BaFin ist die deutsche Aufsichtsbehörde, die FMA die österreichische und die FINMA die schweizerische. Bei grenzüberschreitenden Sachverhalten können mehrere Behörden gleichzeitig tätig werden. Jede Behörde hat ihre eigenen Verfahrensregeln, Tatbestandsmerkmale und Sanktionsinstrumente.",
  },
  {
    question: "Welche rechtlichen Mittel habe ich gegen BaFin-Entscheidungen?",
    answer:
      "Gegen Verwaltungsakte der BaFin können Sie: (1) Widerspruch einlegen (§ 68 VwGO), (2) Anfechtungsklage vor dem VG Frankfurt am Main erheben, (3) einstweiligen Rechtsschutz gem. § 80 Abs. 5 VwGO beantragen. Fristen sind zu beachten — in der Regel 1 Monat für Widerspruch und Klage.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Häufig gestellte Fragen
        </h1>
        <p className="text-gray-500 text-lg">
          Antworten auf die wichtigsten Fragen rund um BaFin-Verfahren und
          unsere Plattform.
        </p>
      </div>

      <FaqAccordion items={faqItems} />

      <p className="mt-12 text-xs text-gray-400 text-center">
        Alle Antworten dienen der allgemeinen Information und stellen keine
        Rechtsberatung dar.
      </p>
    </div>
  );
}
