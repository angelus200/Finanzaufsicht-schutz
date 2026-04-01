"use client";

import { useState } from "react";
import { Search, Trash2, Shield } from "lucide-react";

type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  role: string;
  emailVerified: boolean;
  createdAt: Date;
  sessions: { createdAt: Date }[];
};

const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700",
  EDITOR: "bg-blue-100 text-blue-700",
  CUSTOMER: "bg-gray-100 text-gray-600",
};

export function UserTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [list, setList] = useState(users);
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = list.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      (u.company ?? "").toLowerCase().includes(search.toLowerCase())
  );

  async function changeRole(userId: string, role: string) {
    setLoading(userId);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    setList((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    setLoading(null);
  }

  async function deleteUser(userId: string) {
    if (!confirm("Benutzer wirklich löschen?")) return;
    setLoading(userId);
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    setList((prev) => prev.filter((u) => u.id !== userId));
    setLoading(null);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Suchen…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name / Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Unternehmen</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rolle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Letzter Login</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Erstellt</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-400">
                  Keine Benutzer gefunden.
                </td>
              </tr>
            )}
            {filtered.map((user, i) => (
              <tr key={user.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0">
                      {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
                    </div>
                    <div>
                      {user.firstName && (
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                      )}
                      <p className={user.firstName ? "text-xs text-gray-400" : "font-medium text-gray-900"}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.company ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${ROLE_STYLES[user.role] ?? "bg-gray-100 text-gray-600"}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {user.sessions[0]
                    ? new Date(user.sessions[0].createdAt).toLocaleDateString("de-DE")
                    : "Nie"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(user.createdAt).toLocaleDateString("de-DE")}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <select
                      value={user.role}
                      onChange={(e) => changeRole(user.id, e.target.value)}
                      disabled={loading === user.id}
                      className="text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <option value="CUSTOMER">CUSTOMER</option>
                      <option value="EDITOR">EDITOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <button
                      onClick={() => deleteUser(user.id)}
                      disabled={loading === user.id}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                      title="Benutzer löschen"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
