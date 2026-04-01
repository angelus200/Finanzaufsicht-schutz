import { getPrisma } from "@/lib/db";
import { SchnellcheckDetail } from "./schnellcheck-detail";

const RESULT_CONFIG = {
  GREEN: { label: "Kein Tatbestand", dot: "bg-green-500", badge: "bg-green-100 text-green-700" },
  YELLOW: { label: "Prüfenswert", dot: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-700" },
  RED: { label: "Akut handeln", dot: "bg-red-500", badge: "bg-red-100 text-red-700" },
};

async function getSchnellchecks() {
  const prisma = getPrisma();
  return prisma.schnellcheck.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, firstName: true } },
    },
  });
}

export default async function SchnellchecksPage() {
  const checks = await getSchnellchecks();

  const counts = { GREEN: 0, YELLOW: 0, RED: 0 };
  checks.forEach((c) => { counts[c.result]++; });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schnellchecks</h1>
        <p className="text-sm text-gray-500 mt-1">{checks.length} gesamt</p>
      </div>

      {/* Ampel-Übersicht */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(["GREEN", "YELLOW", "RED"] as const).map((key) => {
          const cfg = RESULT_CONFIG[key];
          return (
            <div key={key} className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${cfg.dot} flex-shrink-0`} />
              <div>
                <p className="text-xs text-gray-500">{cfg.label}</p>
                <p className="text-2xl font-bold text-gray-900">{counts[key]}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Benutzer / Session</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ergebnis</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Datum</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Details</th>
            </tr>
          </thead>
          <tbody>
            {checks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-400">
                  Keine Schnellchecks vorhanden.
                </td>
              </tr>
            )}
            {checks.map((check, i) => {
              const cfg = RESULT_CONFIG[check.result];
              return (
                <SchnellcheckDetail key={check.id} check={check} index={i} cfg={cfg} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
