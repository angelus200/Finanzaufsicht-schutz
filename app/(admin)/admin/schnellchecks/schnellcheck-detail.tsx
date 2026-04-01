"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Check = {
  id: string;
  userId: string | null;
  sessionId: string | null;
  answers: unknown;
  result: string;
  score: number;
  summary: string | null;
  recommendations: unknown;
  createdAt: Date;
  user: { email: string; firstName: string | null } | null;
};

type Cfg = { label: string; dot: string; badge: string };

export function SchnellcheckDetail({
  check,
  index,
  cfg,
}: {
  check: Check;
  index: number;
  cfg: Cfg;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
        <td className="px-5 py-3">
          {check.user ? (
            <div>
              <p className="font-medium text-gray-900">
                {check.user.firstName ?? check.user.email}
              </p>
              {check.user.firstName && (
                <p className="text-xs text-gray-400">{check.user.email}</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400 font-mono">
              {check.sessionId ? `Session: ${check.sessionId.slice(0, 8)}…` : "Anonym"}
            </p>
          )}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot} flex-shrink-0`} />
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
              {cfg.label}
            </span>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-20 bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  check.score >= 70 ? "bg-green-500" : check.score >= 40 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${Math.min(check.score, 100)}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700">{check.score}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-gray-500 text-xs">
          {new Date(check.createdAt).toLocaleDateString("de-DE")}
        </td>
        <td className="px-5 py-3 text-right">
          <button
            onClick={() => setOpen(!open)}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto"
          >
            {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {open ? "Schließen" : "Antworten"}
          </button>
        </td>
      </tr>
      {open && (
        <tr key={`${check.id}-detail`} className="bg-blue-50/20">
          <td colSpan={5} className="px-5 py-4 border-t border-blue-100">
            <div className="space-y-3">
              {check.summary && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Zusammenfassung:</span> {check.summary}
                </p>
              )}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Antworten</p>
                <pre className="text-xs bg-gray-900 text-green-300 rounded-lg p-3 overflow-auto max-h-48">
                  {JSON.stringify(check.answers, null, 2)}
                </pre>
              </div>
              {check.recommendations != null && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Empfehlungen</p>
                  <pre className="text-xs bg-gray-900 text-blue-300 rounded-lg p-3 overflow-auto max-h-32">
                    {JSON.stringify(check.recommendations, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
