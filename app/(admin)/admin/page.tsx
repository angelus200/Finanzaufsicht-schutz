import { getPrisma } from "@/lib/db";
import { Users, MessageSquare, ShoppingBag, Mail, TrendingUp, Clock } from "lucide-react";

async function getStats() {
  const prisma = getPrisma();
  const [userCount, openContacts, orderCount, subscriberCount, recentContacts, recentUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.contactRequest.count({ where: { status: "NEW" } }),
      prisma.order.count(),
      prisma.newsletterSubscriber.count({ where: { unsubscribedAt: null } }),
      prisma.contactRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, email: true, firstName: true, lastName: true, createdAt: true, role: true },
      }),
    ]);
  return { userCount, openContacts, orderCount, subscriberCount, recentContacts, recentUsers };
}

export default async function AdminPage() {
  const stats = await getStats();

  const cards = [
    { label: "Benutzer gesamt", value: stats.userCount, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Offene Anfragen", value: stats.openContacts, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Bestellungen", value: stats.orderCount, icon: ShoppingBag, color: "text-green-600", bg: "bg-green-50" },
    { label: "Newsletter-Abos", value: stats.subscriberCount, icon: Mail, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard-Übersicht</h1>
        <p className="text-sm text-gray-500 mt-1">Alle wichtigen Kennzahlen auf einen Blick</p>
      </div>

      {/* Statistik-Karten */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500">{card.label}</p>
                <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon className={`h-4.5 w-4.5 ${card.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Letzte Aktivitäten */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Letzte Kontaktanfragen */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <h2 className="font-semibold text-sm text-gray-900">Letzte Kontaktanfragen</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentContacts.length === 0 && (
              <p className="px-5 py-4 text-sm text-gray-400">Keine Anfragen vorhanden.</p>
            )}
            {stats.recentContacts.map((c) => (
              <div key={c.id} className="px-5 py-3 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{c.subject}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    c.status === "NEW" ? "bg-amber-100 text-amber-700" :
                    c.status === "ANSWERED" ? "bg-green-100 text-green-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {c.status === "NEW" ? "NEU" : c.status === "ANSWERED" ? "BEANTWORTET" : "GESCHLOSSEN"}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(c.createdAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Letzte Registrierungen */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <h2 className="font-semibold text-sm text-gray-900">Neue Benutzer</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentUsers.length === 0 && (
              <p className="px-5 py-4 text-sm text-gray-400">Keine Benutzer vorhanden.</p>
            )}
            {stats.recentUsers.map((u) => (
              <div key={u.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                    {(u.firstName?.[0] ?? u.email[0]).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : u.email}
                    </p>
                    {u.firstName && (
                      <p className="text-xs text-gray-400">{u.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    u.role === "ADMIN" ? "bg-red-100 text-red-700" :
                    u.role === "EDITOR" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {u.role}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
