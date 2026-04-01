"use client";

import { useState } from "react";

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
};

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-700",
  ANSWERED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-500",
};

const STATUS_LABELS: Record<string, string> = {
  NEW: "Neu",
  ANSWERED: "Beantwortet",
  CLOSED: "Geschlossen",
};

export function ContactTable({ contacts }: { contacts: Contact[] }) {
  const [list, setList] = useState(contacts);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setLoading(id);
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setList((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    setLoading(null);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Betreff</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Datum</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-400">
                  Keine Kontaktanfragen vorhanden.
                </td>
              </tr>
            )}
            {list.map((c, i) => (
              <>
                <tr
                  key={c.id}
                  className={`cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/30 transition-colors`}
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">{c.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[c.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {STATUS_LABELS[c.status] ?? c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(c.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end">
                      <select
                        value={c.status}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        disabled={loading === c.id}
                        className="text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="NEW">Neu</option>
                        <option value="ANSWERED">Beantwortet</option>
                        <option value="CLOSED">Geschlossen</option>
                      </select>
                    </div>
                  </td>
                </tr>
                {expanded === c.id && (
                  <tr key={`${c.id}-detail`} className="bg-blue-50/20">
                    <td colSpan={6} className="px-5 py-4 border-t border-blue-100">
                      <div className="grid grid-cols-1 gap-2">
                        {c.company && (
                          <p className="text-xs text-gray-500">
                            <span className="font-semibold">Unternehmen:</span> {c.company}
                          </p>
                        )}
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.message}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
