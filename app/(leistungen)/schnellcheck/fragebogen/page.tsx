"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { SchnellcheckInput } from "@/lib/schnellcheck-logic";

// ─── Schrittdefinitionen ────────────────────────────────────────────────────

type Step = {
  id: number;
  title: string;
  fragen: Frage[];
};

type Frage = {
  key: keyof SchnellcheckInput;
  label: string;
  type: "select" | "boolean" | "multiselect" | "text";
  optionen?: { value: string; label: string }[];
};

const schritte: Step[] = [
  {
    id: 1,
    title: "Ihr Unternehmen",
    fragen: [
      {
        key: "country",
        label: "In welchem Land ist Ihr Unternehmen ansässig?",
        type: "select",
        optionen: [
          { value: "DE", label: "Deutschland" },
          { value: "AT", label: "Österreich" },
          { value: "CH", label: "Schweiz" },
          { value: "OTHER", label: "Anderes Land" },
        ],
      },
      {
        key: "businessModel",
        label: "Wie beschreibt sich Ihr Geschäftsmodell?",
        type: "select",
        optionen: [
          { value: "B2B", label: "Ausschließlich B2B (Geschäftskunden)" },
          { value: "B2C", label: "Ausschließlich B2C (Privatkunden)" },
          { value: "BOTH", label: "Beides" },
        ],
      },
      {
        key: "hasLicense",
        label: "Verfügt Ihr Unternehmen über eine Finanzdienstleistungserlaubnis?",
        type: "boolean",
      },
    ],
  },
  {
    id: 2,
    title: "Der Vorfall",
    fragen: [
      {
        key: "authorityInvolved",
        label: "Welche Behörde ist involviert?",
        type: "select",
        optionen: [
          { value: "BAFIN", label: "BaFin (Deutschland)" },
          { value: "FMA", label: "FMA (Österreich)" },
          { value: "FINMA", label: "FINMA (Schweiz)" },
          { value: "OTHER", label: "Andere Behörde" },
          { value: "NONE", label: "Noch keine Behörde involviert" },
        ],
      },
      {
        key: "incidentType",
        label: "Was ist die Art des Vorfalls?",
        type: "select",
        optionen: [
          { value: "WARNING", label: "Öffentliche Warnung" },
          { value: "LETTER", label: "Behördenschreiben / Anfrage" },
          { value: "HEARING", label: "Anhörung" },
          { value: "INJUNCTION", label: "Untersagungsverfügung" },
          { value: "SEARCH", label: "Durchsuchung" },
          { value: "OTHER", label: "Anderes" },
          { value: "NONE", label: "Noch kein Vorfall — Prävention" },
        ],
      },
      {
        key: "hasResponded",
        label: "Haben Sie bereits auf die Behörde reagiert?",
        type: "boolean",
      },
    ],
  },
  {
    id: 3,
    title: "Tatsachengrundlage",
    fragen: [
      {
        key: "hasInvestors",
        label: "Hat Ihr Unternehmen Anleger / Investoren akquiriert?",
        type: "boolean",
      },
      {
        key: "hasContracts",
        label: "Liegen schriftliche Verträge vor, auf die sich die Behörde stützt?",
        type: "boolean",
      },
      {
        key: "hasMoneyFlow",
        label: "Ist in Ihrem Geschäftsmodell ein Geldfluss von Dritten involviert?",
        type: "boolean",
      },
    ],
  },
  {
    id: 4,
    title: "Aktuelle Situation",
    fragen: [
      {
        key: "hasLawyer",
        label: "Haben Sie bereits einen Rechtsanwalt eingeschaltet?",
        type: "boolean",
      },
      {
        key: "hasPublicWarning",
        label: "Gibt es eine öffentliche Warnung der Behörde auf ihrer Website?",
        type: "boolean",
      },
      {
        key: "hasPendingProceeding",
        label: "Läuft aktuell ein förmliches Verwaltungsverfahren?",
        type: "boolean",
      },
      {
        key: "hasFineOrPenalty",
        label: "Droht oder wurde ein Zwangsgeld / Bußgeld festgesetzt?",
        type: "boolean",
      },
      {
        key: "mainGoal",
        label: "Was ist Ihr primäres Ziel?",
        type: "select",
        optionen: [
          { value: "REMOVE_WARNING", label: "Öffentliche Warnung entfernen lassen" },
          { value: "END_PROCEEDING", label: "Verfahren beenden" },
          { value: "DEFENSE", label: "Mich gegen Bußgeld / Sanktion verteidigen" },
          { value: "PREVENTION", label: "Präventiv prüfen lassen" },
        ],
      },
    ],
  },
];

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

function BooleanFrage({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-900 mb-3">{label}</p>
      <div className="flex gap-3">
        {[
          { v: true, label: "Ja" },
          { v: false, label: "Nein" },
        ].map((opt) => (
          <button
            key={String(opt.v)}
            type="button"
            onClick={() => onChange(opt.v)}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              value === opt.v
                ? "border-blue-700 bg-blue-50 text-blue-900"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectFrage({
  label,
  value,
  optionen,
  onChange,
}: {
  label: string;
  value: string;
  optionen: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-900 mb-3">{label}</p>
      <div className="space-y-2">
        {optionen.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
              value === opt.value
                ? "border-blue-700 bg-blue-50 text-blue-900 font-medium"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Haupt-Komponente ───────────────────────────────────────────────────────

const defaultAnswers: SchnellcheckInput = {
  country: "DE",
  legalForm: "GmbH",
  mainActivity: "",
  hasLicense: null,
  operatingCountries: ["DE"],
  authorityInvolved: "BAFIN",
  incidentType: "NONE",
  incidentDate: undefined,
  allegedOffense: [],
  hasResponded: null,
  hasInvestors: null,
  hasContracts: null,
  hasMoneyFlow: null,
  publishedMaterials: [],
  businessModel: "B2B",
  hasLawyer: null,
  hasPublicWarning: null,
  hasPendingProceeding: null,
  hasFineOrPenalty: null,
  mainGoal: "DEFENSE",
};

export default function FragebogenPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<SchnellcheckInput>(defaultAnswers);
  const [loading, setLoading] = useState(false);

  const schritt = schritte[currentStep];
  const isLast = currentStep === schritte.length - 1;

  function updateAnswer(key: keyof SchnellcheckInput, value: unknown) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  async function handleWeiter() {
    if (!isLast) {
      setCurrentStep((s) => s + 1);
      return;
    }

    setLoading(true);
    try {
      const sessionId = Math.random().toString(36).slice(2);
      const res = await fetch("/api/schnellcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, sessionId }),
      });

      if (!res.ok) throw new Error("Fehler");

      const data = await res.json();
      const params = new URLSearchParams({
        result: data.result,
        score: String(data.score),
        urgency: data.urgency,
        reasons: JSON.stringify(data.reasons),
        nextSteps: JSON.stringify(data.nextSteps),
      });

      router.push(`/schnellcheck/ergebnis?${params.toString()}`);
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Fortschritt */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            Schritt {currentStep + 1} von {schritte.length}
          </span>
          <Badge variant="secondary">{schritt.title}</Badge>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700 rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / schritte.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Fragen */}
      <div className="space-y-6">
        {schritt.fragen.map((frage) => {
          if (frage.type === "boolean") {
            return (
              <BooleanFrage
                key={frage.key}
                label={frage.label}
                value={answers[frage.key] as boolean | null}
                onChange={(v) => updateAnswer(frage.key, v)}
              />
            );
          }
          if (frage.type === "select") {
            return (
              <SelectFrage
                key={frage.key}
                label={frage.label}
                value={String(answers[frage.key] ?? "")}
                optionen={frage.optionen ?? []}
                onChange={(v) => updateAnswer(frage.key, v)}
              />
            );
          }
          return null;
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        {currentStep > 0 ? (
          <Button
            variant="ghost"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={loading}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
        ) : (
          <div />
        )}
        <Button
          className="bg-blue-900 hover:bg-blue-800"
          onClick={handleWeiter}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Wird ausgewertet…
            </>
          ) : isLast ? (
            "Auswerten"
          ) : (
            <>
              Weiter
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        Ihre Antworten werden ausschließlich zur Berechnung des Ergebnisses
        verwendet und nicht an Dritte weitergegeben.
      </p>
    </div>
  );
}
