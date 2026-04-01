"use client";

import { useState } from "react";
import { Download } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  firstName: string | null;
  confirmedAt: Date | null;
  unsubscribedAt: Date | null;
  createdAt: Date;
};

export function NewsletterTable({ subscribers }: { subscribers: Subscriber[] }) {
  const [filter, setFilter] = useState<"all" | "active" | "unsubscribed">("all");

  const filtered = subscribers.filter((s) => {
    if (filter === "active") return !s.unsubscribedAt;
    if (filter === "unsubscribed") return !!s.unsubscribedAt;
    return true;
  });

  function exportCSV() {
    const rows = [
      ["Email", "Vorname", "Bestätigt", "Abgemeldet", "Erstellt"],
      ...filtered.map((s) => [
        s.email,
        s.firstName ?? "",
        s.confirmedAt ? new Date(s.confirmedAt).toLocaleDateString("de-DE") : "",
        s.unsubscribedAt ? new Date(s.unsubscribedAt).toLocaleDateString("de-DE") : "",
        new Date(s.createdAt).toLocaleDateString("de-DE"),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-abonnenten.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <div className="flex gap-1">
          {(["all", "active", "unsubscribed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {f === "all" ? "Alle" : f === "active" ? "Aktiv" : "Abgemeldet"}
            </button>
          ))}
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          CSV Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Vorname</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Bestätigt</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Registriert</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-400">
                  Keine Abonnenten gefunden.
                </td>
              </tr>
            )}
            {filtered.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-5 py-3 font-medium text-gray-900">{s.email}</td>
                <td className="px-4 py-3 text-gray-600">{s.firstName ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    s.unsubscribedAt
                      ? "bg-gray-100 text-gray-500"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {s.unsubscribedAt ? "Abgemeldet" : "Aktiv"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {s.confirmedAt
                    ? new Date(s.confirmedAt).toLocaleDateString("de-DE")
                    : <span className="text-amber-600">Ausstehend</span>}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(s.createdAt).toLocaleDateString("de-DE")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
