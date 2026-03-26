import { NextRequest, NextResponse } from "next/server";

// Clerk-Middleware deaktiviert — wird später reaktiviert
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
