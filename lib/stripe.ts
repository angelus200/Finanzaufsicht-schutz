import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY fehlt in den Umgebungsvariablen");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
});

// Produktpreise in Cents
export const PRODUKT_PREISE = {
  SCHNELLCHECK: 14900,       // EUR 149,00
  FALLANALYSE: 99000,        // EUR 990,00
  VOLLPAKET: 490000,         // EUR 4.900,00
  STRATEGIEBEGLEITUNG: 1490000, // EUR 14.900,00
} as const;

// Hilfsfunktion: Cents in EUR-String formatieren
export function formatPreis(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
