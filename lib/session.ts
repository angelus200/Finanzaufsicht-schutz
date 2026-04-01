import { cookies } from "next/headers";
import crypto from "crypto";
import { getPrisma } from "./db";

export const SESSION_COOKIE = "fs_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 Tage

export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const prisma = getPrisma();
  await prisma.session.create({
    data: { userId, token, expiresAt },
  });

  return token;
}

export async function getSessionUser(token: string) {
  if (!token) return null;

  const prisma = getPrisma();
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

export async function deleteSession(token: string): Promise<void> {
  const prisma = getPrisma();
  await prisma.session.deleteMany({ where: { token } });
}

/** Liest den Session-Token aus dem Cookie (Server Component / Route Handler). */
export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

/** Gibt den eingeloggten User zurück oder null. */
export async function getCurrentUser() {
  const token = await getSessionToken();
  if (!token) return null;
  return getSessionUser(token);
}
