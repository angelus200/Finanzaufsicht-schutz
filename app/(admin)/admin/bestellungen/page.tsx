import { getPrisma } from "@/lib/db";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-indigo-100 text-indigo-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-500",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Ausstehend",
  PAID: "Bezahlt",
  IN_PROGRESS: "In Bearbeitung",
  COMPLETED: "Abgeschlossen",
  CANCELLED: "Storniert",
  REFUNDED: "Erstattet",
};

async function getOrders() {
  const prisma = getPrisma();
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, firstName: true, lastName: true } },
      product: { select: { name: true } },
    },
  });
}

export default async function BestellungenPage() {
  const orders = await getOrders();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bestellungen</h1>
        <p className="text-sm text-gray-500 mt-1">{orders.length} Bestellungen gesamt</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Kunde</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Produkt</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Betrag</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Zahlungsanbieter</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Datum</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-400">
                  Keine Bestellungen vorhanden.
                </td>
              </tr>
            )}
            {orders.map((order, i) => (
              <tr key={order.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-5 py-3">
                  <p className="font-medium text-gray-900">
                    {order.user.firstName
                      ? `${order.user.firstName} ${order.user.lastName ?? ""}`
                      : order.user.email}
                  </p>
                  {order.user.firstName && (
                    <p className="text-xs text-gray-400">{order.user.email}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{order.product.name}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  EUR {(order.amount / 100).toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{order.paymentProvider ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString("de-DE")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
