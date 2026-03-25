import Link from "next/link";
import { Shield } from "lucide-react";

const footerLinks = {
  Leistungen: [
    { href: "/schnellcheck", label: "Schnellcheck (EUR 149)" },
    { href: "/fallanalyse", label: "Fallanalyse (EUR 990)" },
    { href: "/vollpaket", label: "Vollpaket (EUR 4.900)" },
    { href: "/strategiebegleitung", label: "Strategiebegleitung" },
  ],
  Wissen: [
    { href: "/wissen", label: "Wissensdatenbank" },
    { href: "/faq", label: "FAQ" },
    { href: "/glossar", label: "Glossar" },
    { href: "/blog", label: "Blog" },
  ],
  Transparenz: [
    { href: "/datenbank", label: "Verfahrensdatenbank" },
    { href: "/statistik", label: "Statistiken" },
    { href: "/bafin-monitor", label: "BaFin-Monitor" },
    { href: "/fall-einreichen", label: "Fall einreichen" },
  ],
  Unternehmen: [
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/mein-fall", label: "Mein Fall" },
    { href: "/kooperation", label: "Kooperation RA Pasquay" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/presse", label: "Presse & Medienkit" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Marke */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-blue-900 mb-3">
              <Shield className="h-5 w-5 text-amber-600" />
              <span>Finanzaufsicht-Schutz</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Unabhängige Informationsplattform für Unternehmen in Finanzaufsichtsverfahren.
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Kein Rechtsrat. Alle Inhalte dienen der Information.
            </p>
          </div>

          {/* Link-Spalten */}
          {Object.entries(footerLinks).map(([kategorie, links]) => (
            <div key={kategorie}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3">
                {kategorie}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Unterer Bereich */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Finanzaufsicht-Schutz. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4">
            <Link href="/rechtliches/impressum" className="text-xs text-gray-400 hover:text-gray-600">
              Impressum
            </Link>
            <Link href="/rechtliches/datenschutz" className="text-xs text-gray-400 hover:text-gray-600">
              Datenschutz
            </Link>
            <Link href="/rechtliches/agb" className="text-xs text-gray-400 hover:text-gray-600">
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
