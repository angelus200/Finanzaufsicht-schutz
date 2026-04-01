import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB – Allgemeine Geschäftsbedingungen | Finanzaufsicht-Schutz",
  description:
    "Allgemeine Geschäftsbedingungen von Finanzaufsicht-Schutz für die Nutzung der Plattform und den Erwerb von Leistungen.",
};

export default function AgbPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Allgemeine Geschäftsbedingungen
      </h1>

      <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 1 Geltungsbereich
          </h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
            Verträge zwischen der Finanzaufsicht-Schutz UG (haftungsbeschränkt)
            ("Anbieter") und Nutzern ("Kunde") über die Nutzung der Plattform
            und den Erwerb von Leistungen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 2 Kein Rechtsrat
          </h2>
          <p>
            Alle Leistungen des Anbieters sind informatorischer Natur und
            stellen keine Rechtsberatung im Sinne des
            Rechtsdienstleistungsgesetzes (RDG) dar. Der Anbieter erbringt
            Informations- und Dokumentationsleistungen. Für rechtliche
            Einschätzungen zu einem konkreten Fall ist stets ein zugelassener
            Rechtsanwalt hinzuzuziehen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 3 Vertragsschluss
          </h2>
          <p>
            Durch den Erwerb einer Leistung über die Plattform kommt ein Vertrag
            zwischen dem Kunden und dem Anbieter zustande. Der Anbieter bestätigt
            den Vertragsschluss per E-Mail. Alle Preise verstehen sich
            zzgl. der gesetzlichen Mehrwertsteuer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 4 Leistungen und Preise
          </h2>
          <p>
            Die aktuell angebotenen Leistungen und Preise sind auf der
            Leistungsseite einsehbar. Der Anbieter behält sich vor, Preise und
            Leistungsumfang zu ändern. Für bereits gebuchte Leistungen gilt der
            Preis zum Zeitpunkt der Buchung.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 5 Widerrufsrecht
          </h2>
          <p>
            Verbrauchern steht ein Widerrufsrecht von 14 Tagen zu, sofern nicht
            mit der Leistungserbringung begonnen wurde. Bei digitalen Inhalten
            (insbesondere dem Schnellcheck), die nach Zahlung sofort
            bereitgestellt werden, erlischt das Widerrufsrecht mit
            Leistungsbeginn, sofern der Kunde ausdrücklich zugestimmt hat.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 6 Haftungsbeschränkung
          </h2>
          <p>
            Der Anbieter haftet nur für Schäden, die auf grober Fahrlässigkeit
            oder Vorsatz beruhen. Eine Haftung für die Richtigkeit oder
            Vollständigkeit von Informationen, die auf Basis öffentlicher Quellen
            erstellt wurden, ist ausgeschlossen. Der Anbieter haftet nicht für
            wirtschaftliche Entscheidungen, die auf Basis von
            Plattforminhalten getroffen wurden.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 7 Datenschutz
          </h2>
          <p>
            Die Erhebung, Verarbeitung und Nutzung personenbezogener Daten
            richtet sich nach der Datenschutzerklärung des Anbieters, die
            Bestandteil dieser AGB ist.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            § 8 Anwendbares Recht und Gerichtsstand
          </h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für
            alle Streitigkeiten ist, soweit gesetzlich zulässig, der
            Geschäftssitz des Anbieters.
          </p>
        </section>

        <p className="text-xs text-gray-400 mt-8">Stand: Januar 2025</p>
      </div>
    </div>
  );
}
