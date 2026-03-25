@AGENTS.md

# Projekt: Finanzaufsicht-Schutz Portal

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui v2
- Clerk v7 Auth, Prisma 7, PostgreSQL (Railway)
- Stripe oder Mollie Payment (noch offen)

## Geschäftsmodell
4 Produkte: Schnellcheck (EUR 149), Fallanalyse (EUR 990), Vollpaket (EUR 4.900), Strategiebegleitung (EUR 14.900)

## Seitenstruktur (Route Groups)
- (marketing)/ — Über uns, Mein Fall, Kooperation, Kontakt, Presse, Rechtliches
- (wissen)/ — Kostenlose Wissensartikel (MDX), FAQ, Glossar
- (leistungen)/ — Produkte, Schnellcheck-Fragebogen, Checkout
- (datenbank)/ — Transparenzdatenbank, Statistik, Fall einreichen
- (oeffentlichkeit)/ — BaFin-Monitor, Berichte, Pressemitteilungen, Podcast
- (blog)/ — SEO-Artikel
- (dashboard)/ — Geschützter Kundenbereich (Clerk Auth)

## Regeln
- UI-Texte Deutsch, Code/Variablen Englisch
- Preise in Cents (14900 = EUR 149.00)
- Kein Rechtsberatungs-Disclaimer vergessen
- Mobile-first, Lighthouse > 90
- Node >= 22.12.0 (Prisma 7 Requirement)

## Aktueller Stand
- Sprint 1 abgeschlossen (42 Dateien, Fundament)
- Railway PostgreSQL verbunden
- Nächster Schritt: Sprint 2 (Wissensdatenbank + MDX)
