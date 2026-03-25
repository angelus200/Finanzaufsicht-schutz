// Bewertungsalgorithmus für den Finanzaufsicht-Schnellcheck

export interface SchnellcheckInput {
  // Block 1: Unternehmen
  country: "DE" | "AT" | "CH" | "OTHER";
  legalForm: string;
  mainActivity: string;
  hasLicense: boolean | null;
  operatingCountries: string[];

  // Block 2: Der Vorfall
  authorityInvolved: "BAFIN" | "FMA" | "FINMA" | "OTHER" | "NONE";
  incidentType: "WARNING" | "LETTER" | "HEARING" | "INJUNCTION" | "SEARCH" | "OTHER" | "NONE";
  incidentDate?: string;
  allegedOffense: string[];
  hasResponded: boolean | null;

  // Block 3: Tatsachengrundlage
  hasInvestors: boolean | null;
  hasContracts: boolean | null;
  hasMoneyFlow: boolean | null;
  publishedMaterials: string[];
  businessModel: "B2B" | "B2C" | "BOTH";

  // Block 4: Aktuelle Situation
  hasLawyer: boolean | null;
  hasPublicWarning: boolean | null;
  hasPendingProceeding: boolean | null;
  hasFineOrPenalty: boolean | null;
  mainGoal: "REMOVE_WARNING" | "END_PROCEEDING" | "DEFENSE" | "PREVENTION";
}

export type SchnellcheckResultat = "GREEN" | "YELLOW" | "RED";

export interface SchnellcheckBewertung {
  result: SchnellcheckResultat;
  score: number;
  reasons: string[];
  nextSteps: string[];
  urgency: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export function evaluiereSchnellcheck(input: SchnellcheckInput): SchnellcheckBewertung {
  let score = 50; // Neutraler Ausgangspunkt
  const reasons: string[] = [];
  const nextSteps: string[] = [];

  // ── Entlastende Faktoren (Score senken) ──────────────────────────────

  // Keine Anleger, keine Verträge, kein Geldfluss = schwache Tatsachengrundlage
  if (input.hasInvestors === false && input.hasContracts === false && input.hasMoneyFlow === false) {
    score -= 30;
    reasons.push("Keine Anleger, keine Verträge, kein Geldfluss – schwache Tatsachengrundlage der Behörde");
    nextSteps.push("Detaillierte Sachverhaltsdarstellung erstellen");
  } else if (input.hasInvestors === false || input.hasContracts === false) {
    score -= 15;
    reasons.push("Teilweise fehlende Tatsachengrundlage der Behörde");
  }

  // Reines B2B-Modell – häufig fehlqualifiziert als Kapitalanlage
  if (input.businessModel === "B2B") {
    score -= 15;
    reasons.push("Reines B2B-Geschäftsmodell – häufig fehlerhafte Qualifikation als Kapitalanlage");
    nextSteps.push("B2B-Charakter des Geschäftsmodells dokumentieren und belegen");
  }

  // Ausländisches Unternehmen + BaFin = Zuständigkeitsfrage
  if (input.country !== "DE" && input.authorityInvolved === "BAFIN") {
    score -= 10;
    reasons.push("Ausländisches Unternehmen unter BaFin-Zugriff – Zuständigkeit prüfenswert");
    nextSteps.push("Heimatbehörde (FMA/FINMA) über BaFin-Verfahren informieren");
    nextSteps.push("Territorialitätsprinzip prüfen");
  }

  // Kein Vorfall / keine Behörde involviert
  if (input.authorityInvolved === "NONE") {
    score -= 20;
    reasons.push("Kein aktives Behördenverfahren – präventive Prüfung");
    nextSteps.push("Präventive Compliance-Prüfung des Geschäftsmodells durchführen");
  }

  // ── Belastende Faktoren (Score erhöhen) ──────────────────────────────

  // Öffentliche Warnung – Reputationsschaden aktiv
  if (input.hasPublicWarning === true) {
    score += 25;
    reasons.push("Öffentliche Warnung veröffentlicht – aktiver Reputationsschaden");
    nextSteps.push("Antrag auf Entfernung der Bekanntmachung gem. § 40 Abs. 4 WpHG prüfen");
    nextSteps.push("Gegendarstellung vorbereiten");
  }

  // Laufendes Verwaltungsverfahren
  if (input.hasPendingProceeding === true) {
    score += 15;
    reasons.push("Laufendes Verwaltungsverfahren – Fristen beachten");
    nextSteps.push("Stellungnahme gem. § 28 VwVfG vorbereiten");
    nextSteps.push("Akteneinsicht beantragen");
  }

  // Zwangsgeld oder Bußgeld droht
  if (input.hasFineOrPenalty === true) {
    score += 15;
    reasons.push("Zwangsgeld oder Bußgeld droht – sofortige Handlung erforderlich");
    nextSteps.push("Rechtsbehelfsfristen prüfen (Widerspruch/Klage)");
    nextSteps.push("Zahlungsaufschub beantragen falls Zahlungsziel eng");
  }

  // Durchsuchung = schwerwiegend
  if (input.incidentType === "SEARCH") {
    score += 20;
    reasons.push("Durchsuchung erfolgt – strafrechtliche Relevanz möglich");
    nextSteps.push("Strafrechtlichen Beistand hinzuziehen");
  }

  // Kein Anwalt = Risiko
  if (input.hasLawyer === false && score > 40) {
    score += 5;
    reasons.push("Noch kein Rechtsanwalt – professionelle Vertretung empfohlen");
    nextSteps.push("Spezialisierten Rechtsanwalt für Kapitalmarktrecht beauftragen");
  }

  // Score begrenzen und Ergebnis bestimmen
  const finalScore = Math.max(0, Math.min(100, score));

  let result: SchnellcheckResultat;
  let urgency: SchnellcheckBewertung["urgency"];

  if (finalScore <= 30) {
    result = "GREEN";
    urgency = "LOW";
  } else if (finalScore <= 60) {
    result = "YELLOW";
    urgency = score >= 50 ? "MEDIUM" : "LOW";
  } else {
    result = "RED";
    urgency = finalScore >= 80 ? "CRITICAL" : "HIGH";
  }

  // Zielbasierte nächste Schritte
  if (input.mainGoal === "REMOVE_WARNING" && input.hasPublicWarning) {
    nextSteps.unshift("Priorität: Antrag auf Löschung der öffentlichen Warnung");
  }

  return {
    result,
    score: finalScore,
    reasons,
    nextSteps: [...new Set(nextSteps)], // Duplikate entfernen
    urgency,
  };
}
