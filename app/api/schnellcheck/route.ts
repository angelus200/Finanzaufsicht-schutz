import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { evaluiereSchnellcheck, type SchnellcheckInput } from "@/lib/schnellcheck-logic";

export async function POST(request: NextRequest) {
  try {
    const userId: string | null = null; // Clerk deaktiviert — später reaktivieren
    const body = await request.json();
    const input: SchnellcheckInput = body.answers;

    // Bewertung durchführen
    const bewertung = evaluiereSchnellcheck(input);

    // In Datenbank speichern
    const schnellcheck = await getPrisma().schnellcheck.create({
      data: {
        userId: userId ?? undefined,
        sessionId: body.sessionId ?? undefined,
        answers: input as object,
        result: bewertung.result,
        score: bewertung.score,
        summary: bewertung.reasons.join(" "),
        recommendations: bewertung.nextSteps as unknown as object,
      },
    });

    return NextResponse.json({
      id: schnellcheck.id,
      result: bewertung.result,
      score: bewertung.score,
      reasons: bewertung.reasons,
      nextSteps: bewertung.nextSteps,
      urgency: bewertung.urgency,
    });
  } catch (error) {
    console.error("[schnellcheck/route] Fehler:", error);
    return NextResponse.json(
      { error: "Schnellcheck konnte nicht verarbeitet werden" },
      { status: 500 }
    );
  }
}
