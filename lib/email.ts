import { Resend } from "resend";

// Lazy-Initialisierung: kein Import-Crash beim Build wenn Key fehlt
function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY fehlt in den Umgebungsvariablen");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const EMAIL_FROM = process.env.EMAIL_FROM ?? "info@finanzaufsicht-schutz.de";

// Bestellbestätigung versenden
export async function sendeBestellbestaetigung({
  email,
  name,
  produktName,
  betrag,
}: {
  email: string;
  name: string;
  produktName: string;
  betrag: string;
}) {
  return getResend().emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: `Ihre Bestellung: ${produktName}`,
    html: `
      <h2>Vielen Dank für Ihre Bestellung, ${name}!</h2>
      <p>Wir haben Ihre Bestellung für <strong>${produktName}</strong> (${betrag}) erhalten.</p>
      <p>Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden.</p>
      <p>Bei Fragen erreichen Sie uns unter: ${EMAIL_FROM}</p>
    `,
  });
}

// Newsletter-Bestätigung versenden
export async function sendeNewsletterBestaetigung({
  email,
  firstName,
}: {
  email: string;
  firstName?: string;
}) {
  return getResend().emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Newsletter-Anmeldung bestätigen",
    html: `
      <h2>${firstName ? `Hallo ${firstName}!` : "Hallo!"}</h2>
      <p>Bitte bestätigen Sie Ihre Newsletter-Anmeldung für den Finanzaufsicht-Schutz Monitor.</p>
    `,
  });
}
