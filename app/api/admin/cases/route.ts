import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getPrisma } from "@/lib/db";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const prisma = getPrisma();

  const entry = await prisma.caseEntry.create({
    data: {
      slug: body.slug,
      authority: body.authority,
      procedureType: body.procedureType,
      companyName: body.companyName || null,
      companyCountry: body.companyCountry || null,
      allegedOffense: body.allegedOffense,
      isPublic: body.isPublic ?? true,
    },
  });

  return NextResponse.json(entry, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "id erforderlich" }, { status: 400 });
  }

  const prisma = getPrisma();
  const updated = await prisma.caseEntry.update({
    where: { id },
    data: {
      slug: data.slug,
      authority: data.authority,
      procedureType: data.procedureType,
      companyName: data.companyName || null,
      companyCountry: data.companyCountry || null,
      allegedOffense: data.allegedOffense,
      isPublic: data.isPublic,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "id erforderlich" }, { status: 400 });
  }

  const prisma = getPrisma();
  await prisma.caseEntry.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
