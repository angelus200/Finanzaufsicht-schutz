import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  ShoppingBag,
  CheckCircle,
  Database,
  Mail,
  Shield,
  ChevronRight,
} from "lucide-react";
import { getCurrentUser } from "@/lib/session";

const navItems = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard, exact: true },
  { href: "/admin/benutzer", label: "Benutzer", icon: Users },
  { href: "/admin/kontaktanfragen", label: "Kontaktanfragen", icon: MessageSquare },
  { href: "/admin/bestellungen", label: "Bestellungen", icon: ShoppingBag },
  { href: "/admin/schnellchecks", label: "Schnellchecks", icon: CheckCircle },
  { href: "/admin/datenbank", label: "Datenbank", icon: Database },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-950 border-r border-gray-800 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Admin Panel</p>
              <p className="text-[10px] text-gray-500">Finanzaufsicht-Schutz</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors group"
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-800">
          <div className="px-3 py-2">
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            <p className="text-[10px] text-amber-500 font-medium mt-0.5">Administrator</p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 mt-2 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors rounded-md hover:bg-gray-800"
          >
            ← Zurück zum Dashboard
          </Link>
        </div>
      </aside>

      {/* Hauptinhalt */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}
