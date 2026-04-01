import { NextResponse } from "next/server";
import { deleteSession, getSessionToken, SESSION_COOKIE } from "@/lib/session";

export async function POST() {
  const token = await getSessionToken();

  if (token) {
    await deleteSession(token);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
