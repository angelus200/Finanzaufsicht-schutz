import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/db";

// Clerk-Webhooks: User-Sync mit eigener Datenbank
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET nicht konfiguriert" },
      { status: 500 }
    );
  }

  // Svix-Signatur prüfen
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Fehlende Svix-Header" }, { status: 400 });
  }

  const payload = await request.text();
  const wh = new Webhook(webhookSecret);

  let event: { type: string; data: Record<string, unknown> };
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as typeof event;
  } catch {
    return NextResponse.json({ error: "Ungültige Webhook-Signatur" }, { status: 400 });
  }

  const { type, data } = event;

  // User in eigener DB anlegen/aktualisieren
  if (type === "user.created" || type === "user.updated") {
    const emails = data.email_addresses as Array<{ email_address: string; id: string }>;
    const primaryEmail = emails?.find(
      (e) => e.id === data.primary_email_address_id
    );

    if (primaryEmail) {
      await prisma.user.upsert({
        where: { clerkId: data.id as string },
        create: {
          clerkId: data.id as string,
          email: primaryEmail.email_address,
          firstName: (data.first_name as string) ?? undefined,
          lastName: (data.last_name as string) ?? undefined,
        },
        update: {
          email: primaryEmail.email_address,
          firstName: (data.first_name as string) ?? undefined,
          lastName: (data.last_name as string) ?? undefined,
        },
      });
    }
  }

  if (type === "user.deleted") {
    await prisma.user
      .delete({ where: { clerkId: data.id as string } })
      .catch(() => null); // Ignorieren falls User nicht existiert
  }

  return NextResponse.json({ received: true });
}
