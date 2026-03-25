import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Finanzaufsicht-Schutz | BaFin-Verfahren verstehen und abwehren",
    template: "%s | Finanzaufsicht-Schutz",
  },
  description:
    "Wissen, Schnellcheck und Fallanalyse für Unternehmen die von BaFin, FMA oder FINMA verfolgt werden. Transparenzdatenbank öffentlicher Finanzaufsichtsverfahren.",
  keywords: [
    "BaFin Warnung",
    "BaFin Verfahren",
    "BaFin Untersagung",
    "gegen BaFin wehren",
    "Finanzaufsicht Schutz",
    "FMA Verfahren",
    "FINMA Verfahren",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Finanzaufsicht-Schutz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="de"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-white text-gray-900">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
