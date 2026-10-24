const KEY = "glpro.diagnoses.alaide-proenca";

export type Elasticity = "aprovado" | "emborrachado";

export type Diagnosis = {
  id: string;
  clientName: string;
  fiber: string;
  elasticity: Elasticity;
  targetFund: string;
  savedAt: string;
};

export function readDiagnoses(): Diagnosis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Diagnosis[];
    return Array.isArray(parsed) ? parsed : [];
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
