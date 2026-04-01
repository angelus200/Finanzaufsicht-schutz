"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

type CaseTag = { id: string; tag: string; caseEntryId: string };
type CaseEntry = {
  id: string;
  slug: string;
  authority: string;
  procedureType: string;
  companyName: string | null;
  companyCountry: string | null;
  allegedOffense: string;
  outcome: string | null;
  warningDate: Date | null;
  isPublic: boolean;
  createdAt: Date;
  tags: CaseTag[];
};

const AUTHORITY_LABELS: Record<string, string> = {
  BAFIN: "BaFin",
  FMA: "FMA",
  FINMA: "FINMA",
  ESMA: "ESMA",
};

const PROCEDURE_LABELS: Record<string, string> = {
  PUBLIC_WARNING: "Öff. Warnung",
  CEASE_AND_DESIST: "Unterlassung",
  FINE: "Bußgeld",
  CRIMINAL_REFERRAL: "Strafanzeige",
  PROSPECTUS_REQUIREMENT: "Prospektpflicht",
  OTHER: "Sonstiges",
};

const OUTCOME_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  DISMISSED: "bg-green-100 text-green-700",
  WARNING_REMOVED: "bg-green-100 text-green-700",
  INJUNCTION_UPHELD: "bg-red-100 text-red-700",
  COURT_WIN_COMPANY: "bg-blue-100 text-blue-700",
  COURT_WIN_AUTHORITY: "bg-purple-100 text-purple-700",
  SETTLED: "bg-gray-100 text-gray-600",
  OTHER: "bg-gray-100 text-gray-600",
};

export function CaseTable({ cases: initialCases }: { cases: CaseEntry[] }) {
  const [cases, setCases] = useState(initialCases);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    authority: "BAFIN",
    procedureType: "PUBLIC_WARNING",
    companyName: "",
    companyCountry: "",
    allegedOffense: "",
    isPublic: true,
  });

  function openCreate() {
    setForm({ slug: "", authority: "BAFIN", procedureType: "PUBLIC_WARNING", companyName: "", companyCountry: "", allegedOffense: "", isPublic: true });
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(c: CaseEntry) {
    setForm({
      slug: c.slug,
      authority: c.authority,
      procedureType: c.procedureType,
      companyName: c.companyName ?? "",
      companyCountry: c.companyCountry ?? "",
      allegedOffense: c.allegedOffense,
      isPublic: c.isPublic,
    });
    setEditId(c.id);
    setShowForm(true);
  }

  async function handleSave() {
    setLoading("save");
    const method = editId ? "PATCH" : "POST";
    const body = editId ? { ...form, id: editId } : form;
    const res = await fetch("/api/admin/cases", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const updated = await res.json();
      if (editId) {
        setCases((prev) => prev.map((c) => (c.id === editId ? { ...c, ...updated } : c)));
      } else {
        setCases((prev) => [{ ...updated, tags: [] }, ...prev]);
      }
    }
    setShowForm(false);
    setLoading(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Eintrag wirklich löschen?")) return;
    setLoading(id);
    await fetch("/api/admin/cases", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCases((prev) => prev.filter((c) => c.id !== id));
    setLoading(null);
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Neuer Eintrag
        </button>
      </div>

      {/* Formular */}
      {showForm && (
        <div className="bg-white rounded-xl border border-blue-200 p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            {editId ? "Eintrag bearbeiten" : "Neuer Eintrag"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="firmaname-bafin-2025"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Behörde</label>
              <select
                value={form.authority}
                onChange={(e) => setForm((f) => ({ ...f, authority: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(AUTHORITY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Verfahrensart</label>
              <select
                value={form.procedureType}
                onChange={(e) => setForm((f) => ({ ...f, procedureType: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(PROCEDURE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Unternehmensname</label>
              <input
                value={form.companyName}
                onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Land</label>
              <input
                value={form.companyCountry}
                onChange={(e) => setForm((f) => ({ ...f, companyCountry: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="DE"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Vorgeworfener Tatbestand</label>
              <textarea
                value={form.allegedOffense}
                onChange={(e) => setForm((f) => ({ ...f, allegedOffense: e.target.value }))}
                rows={3}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={form.isPublic}
                onChange={(e) => setForm((f) => ({ ...f, isPublic: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700">Öffentlich sichtbar</label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={loading === "save"}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              Speichern
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Unternehmen</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Behörde</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Verfahren</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ausgang</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sichtbar</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-400">
                  Keine Einträge vorhanden.
                </td>
              </tr>
            )}
            {cases.map((c, i) => (
              <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-5 py-3">
                  <p className="font-medium text-gray-900">{c.companyName ?? "—"}</p>
                  {c.companyCountry && (
                    <p className="text-xs text-gray-400">{c.companyCountry}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold text-gray-700">
                    {AUTHORITY_LABELS[c.authority] ?? c.authority}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">
                  {PROCEDURE_LABELS[c.procedureType] ?? c.procedureType}
                </td>
                <td className="px-4 py-3">
                  {c.outcome ? (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${OUTCOME_STYLES[c.outcome] ?? "bg-gray-100 text-gray-600"}`}>
                      {c.outcome.replace(/_/g, " ")}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Offen</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.isPublic ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {c.isPublic ? "Ja" : "Nein"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(c)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Bearbeiten"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={loading === c.id}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                      title="Löschen"
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
