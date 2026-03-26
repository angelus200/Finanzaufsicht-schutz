"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/wissen", label: "Wissen" },
  { href: "/datenbank", label: "Transparenzdatenbank" },
  { href: "/bafin-monitor", label: "BaFin-Monitor" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
];

// Clerk-Auth-Komponenten deaktiviert — werden später reaktiviert
export function Navbar() {
  const pathname = usePathname();
  const [menuOffen, setMenuOffen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-blue-900">
            <Shield className="h-6 w-6 text-amber-600" />
            <span className="text-lg">Finanzaufsicht-Schutz</span>
          </Link>

          {/* Desktop-Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-900",
                  pathname.startsWith(link.href) ? "text-blue-900" : "text-gray-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth-Bereich */}
          <div className="hidden md:flex items-center gap-3">
            <Button size="sm" className="bg-blue-900 hover:bg-blue-800" render={<Link href="/schnellcheck" />}>
              Schnellcheck starten
            </Button>
          </div>

          {/* Mobile-Menü-Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOffen(!menuOffen)}
            aria-label="Menü öffnen"
          >
            {menuOffen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile-Navigation */}
      {menuOffen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-900 py-1"
                onClick={() => setMenuOffen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href="/schnellcheck"
              className="text-sm font-semibold text-blue-900"
              onClick={() => setMenuOffen(false)}
            >
              → Schnellcheck starten
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
