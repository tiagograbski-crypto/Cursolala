import type { Role } from "@/lib/session";

export function normalizeLicense(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

/** Demonstração local: licença válida entra como aluna; prefixo LALA-PROD abre o backstage. */
export function resolveRole(value: string): Role | null {
  const token = normalizeLicense(value);
  if (!/^[A-Z0-9-]{6,32}$/.test(token)) return null;
  if (token.startsWith("LALA-PROD")) return "produtora";
  return "aluna";
}
