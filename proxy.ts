import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Geschützte Routen — erfordern Authentifizierung
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/checkout(.*)",
]);

// Clerk-Proxy für Authentifizierung — schützt Dashboard und Checkout
export const proxy = clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Alle Routen außer Next.js-Interna und statische Dateien
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
