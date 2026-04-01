import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Finanzaufsicht-Schutz",
  description: "Datenschutzerklärung von Finanzaufsicht-Schutz gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Datenschutzerklärung
      </h1>

      <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            1. Datenschutz auf einen Blick
          </h2>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            2. Verantwortlicher
          </h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            Finanzaufsicht-Schutz UG (haftungsbeschränkt)
            <br />
            E-Mail: info@finanzaufsicht-schutz.de
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            3. Datenerfassung auf dieser Website
          </h2>
          <h3 className="font-medium text-gray-800 mt-4 mb-2">Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch
            Informationen in so genannten Server-Log-Dateien, die Ihr Browser
            automatisch übermittelt. Dies sind: Browsertyp und Browserversion,
            verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden
            Rechners, Uhrzeit der Serveranfrage, IP-Adresse. Diese Daten werden
            nicht mit anderen Datenquellen zusammengeführt.
          </p>
          <h3 className="font-medium text-gray-800 mt-4 mb-2">Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
            Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
            nicht ohne Ihre Einwilligung weiter.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            4. Schnellcheck-Daten
          </h2>
          <p>
            Wenn Sie den Schnellcheck nutzen, werden Ihre Antworten zur
            Berechnung des Ergebnisses und zur Speicherung in unserer Datenbank
            verwendet. Sie können den Schnellcheck optional mit einem
            Benutzerkonto verknüpfen. Nicht angemeldete Nutzungen werden einer
            anonymen Session zugeordnet.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            5. Ihre Rechte
          </h2>
          <p>
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
            gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
            und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
            Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen
            zum Thema personenbezogene Daten können Sie sich jederzeit unter der
            im Impressum angegebenen Adresse an uns wenden.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            6. Cookies
          </h2>
          <p>
            Unsere Website verwendet funktionale Cookies zur Sitzungsverwaltung.
            Tracking-Cookies oder Cookies zu Werbezwecken werden nicht
            eingesetzt.
          </p>
        </section>

        <p className="text-xs text-gray-400 mt-8">
          Stand: Januar 2025
        </p>
      </div>
    </div>
  );
}
