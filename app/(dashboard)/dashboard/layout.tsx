import Link from "next/link";
import { redirect } from "next/navigation";
import { Shield, LayoutDashboard, ShoppingBag, FileText, User } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { LogoutButton } from "@/components/layout/logout-button";

const navItems = [
  { href: "/dashboard", label: "Übersicht", icon: LayoutDashboard },
  { href: "/dashboard/bestellungen", label: "Bestellungen", icon: ShoppingBag },
  { href: "/dashboard/dokumente", label: "Dokumente", icon: FileText },
  { href: "/dashboard/profil", label: "Profil", icon: User },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Shield className="h-5 w-5 text-amber-400" />
            <span className="text-sm">Finanzaufsicht-Schutz</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-blue-200 hover:bg-blue-800 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
          <p className="text-xs text-blue-400 truncate">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>

      {/* Hauptinhalt */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
