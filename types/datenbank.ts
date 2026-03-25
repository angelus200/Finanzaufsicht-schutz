export type Authority = "BAFIN" | "FMA" | "FINMA" | "ESMA";

export type ProcedureType =
  | "PUBLIC_WARNING"
  | "CEASE_AND_DESIST"
  | "FINE"
  | "CRIMINAL_REFERRAL"
  | "PROSPECTUS_REQUIREMENT"
  | "OTHER";

export type CaseOutcome =
  | "PENDING"
  | "DISMISSED"
  | "WARNING_REMOVED"
  | "INJUNCTION_UPHELD"
  | "COURT_WIN_COMPANY"
  | "COURT_WIN_AUTHORITY"
  | "SETTLED"
  | "OTHER";

export interface CaseFilter {
  authority?: Authority;
  procedureType?: ProcedureType;
  outcome?: CaseOutcome;
  country?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

// Lesbare Bezeichnungen für UI-Anzeige
export const AUTHORITY_LABEL: Record<Authority, string> = {
  BAFIN: "BaFin",
  FMA: "FMA (Österreich)",
  FINMA: "FINMA (Schweiz)",
  ESMA: "ESMA (EU)",
};

export const PROCEDURE_LABEL: Record<ProcedureType, string> = {
  PUBLIC_WARNING: "Öffentliche Warnung",
  CEASE_AND_DESIST: "Untersagungsverfügung",
  FINE: "Bußgeld",
  CRIMINAL_REFERRAL: "Strafanzeige",
  PROSPECTUS_REQUIREMENT: "Prospektpflicht",
  OTHER: "Sonstiges",
};

export const OUTCOME_LABEL: Record<CaseOutcome, string> = {
  PENDING: "Laufend",
  DISMISSED: "Eingestellt",
  WARNING_REMOVED: "Warnung entfernt",
  INJUNCTION_UPHELD: "Untersagung bestätigt",
  COURT_WIN_COMPANY: "Unternehmen gewonnen",
  COURT_WIN_AUTHORITY: "Behörde gewonnen",
  SETTLED: "Vergleich",
  OTHER: "Sonstiges",
};
