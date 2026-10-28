const KEY = "glpro.diagnoses.alaide-proenca";

export type Elasticity = "aprovado" | "emborrachado" | "quebra";

export type Diagnosis = {
  id: string;
  clientName: string;
  /** Legado — fichas antigas misturavam textura e porosidade. */
  fiber?: string;
  texture: string;
  porosity: string;
  chemistry: string;
  elasticity: Elasticity;
  currentFund: string;
  targetFund: string;
  notes: string;
  savedAt: string;
};

function asDiagnosis(raw: unknown): Diagnosis | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Partial<Diagnosis> & { fiber?: string; targetFund?: string };
  if (!row.id || !row.clientName || !row.elasticity) return null;
  return {
    id: row.id,
    clientName: row.clientName,
    fiber: row.fiber,
    texture: row.texture || row.fiber || "Médio",
    porosity: row.porosity || "Média",
    chemistry: row.chemistry || "Não informado",
    elasticity: row.elasticity,
    currentFund: row.currentFund || row.targetFund || "",
    targetFund: row.targetFund || "",
    notes: row.notes || "",
    savedAt: row.savedAt || new Date().toISOString(),
  };
}

export function readDiagnoses(): Diagnosis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(asDiagnosis).filter((item): item is Diagnosis => item !== null);
  } catch {
    return [];
  }
}

export function writeDiagnoses(list: Diagnosis[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}
