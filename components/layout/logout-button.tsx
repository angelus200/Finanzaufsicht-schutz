"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-xs text-blue-300 hover:text-white transition-colors"
    >
      <LogOut className="h-3.5 w-3.5" />
      Abmelden
    </button>
  );
}
