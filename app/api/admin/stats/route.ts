import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getPrisma } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const prisma = getPrisma();
  const [userCount, openContacts, orderCount, subscriberCount] = await Promise.all([
    prisma.user.count(),
    prisma.contactRequest.count({ where: { status: "NEW" } }),
    prisma.order.count(),
    prisma.newsletterSubscriber.count({ where: { unsubscribedAt: null } }),
  ]);

  return NextResponse.json({ userCount, openContacts, orderCount, subscriberCount });
}
