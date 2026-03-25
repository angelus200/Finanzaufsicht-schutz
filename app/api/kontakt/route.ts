import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen" },
        { status: 400 }
      );
    }

    await prisma.contactRequest.create({
      data: { name, email, company, subject, message },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[kontakt/route] Fehler:", error);
    return NextResponse.json(
      { error: "Anfrage konnte nicht gespeichert werden" },
      { status: 500 }
    );
  }
}
