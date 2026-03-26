import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    if (!email) {
      return NextResponse.json({ error: "E-Mail fehlt" }, { status: 400 });
    }

    // Upsert: bereits vorhandene Adressen nicht duplizieren
    await getPrisma().newsletterSubscriber.upsert({
      where: { email },
      create: { email, firstName },
      update: { firstName },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter/route] Fehler:", error);
    return NextResponse.json(
      { error: "Anmeldung fehlgeschlagen" },
      { status: 500 }
    );
  }
}
