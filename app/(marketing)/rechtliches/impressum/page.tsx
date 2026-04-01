import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Finanzaufsicht-Schutz",
  description: "Impressum und Anbieterkennzeichnung von Finanzaufsicht-Schutz.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Angaben gemäß § 5 DDG
          </h2>
          <p className="text-sm leading-relaxed">
            Finanzaufsicht-Schutz UG (haftungsbeschränkt)
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ Ort]
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Vertreten durch
          </h2>
          <p className="text-sm leading-relaxed">
            [Vorname Nachname], Geschäftsführer
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Kontakt</h2>
          <p className="text-sm leading-relaxed">
            E-Mail: info@finanzaufsicht-schutz.de
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Registereintrag
          </h2>
          <p className="text-sm leading-relaxed">
            Eintragung im Handelsregister.
            <br />
            Registergericht: Amtsgericht [Ort]
            <br />
            Registernummer: HRB [Nummer]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Umsatzsteuer-ID
          </h2>
          <p className="text-sm leading-relaxed">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
            <br />
            DE[Nummer]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Hinweis zur Rechtsberatung
          </h2>
          <p className="text-sm leading-relaxed">
            Diese Plattform erbringt keine Rechtsberatung im Sinne des
            Rechtsdienstleistungsgesetzes (RDG). Alle Inhalte dienen
            ausschließlich der allgemeinen Information. Für rechtliche
            Einschätzungen zu Ihrem konkreten Fall konsultieren Sie bitte einen
            zugelassenen Rechtsanwalt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Streitschlichtung
          </h2>
          <p className="text-sm leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden Sie
            oben im Impressum. Wir nehmen nicht an einem
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teil.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Haftung für Inhalte
          </h2>
          <p className="text-sm leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>
      </div>
    </div>
  );
}
