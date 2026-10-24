export type Role = "aluna" | "produtora";

export type Session = {
  token: string;
  role: Role;
  tenantId: "alaide-proenca";
};

const KEY = "glpro.session";

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (parsed?.tenantId !== "alaide-proenca") return null;
    if (parsed.role !== "aluna" && parsed.role !== "produtora") return null;
    if (typeof parsed.token !== "string" || parsed.token.length < 6) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeSession(session: Session) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
}

export function homeFor(role: Role) {
  return role === "produtora" ? "/produtora" : "/aluna/apostila";
}
