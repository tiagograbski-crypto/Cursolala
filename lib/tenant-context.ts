import { z } from "zod";
import { publicEnv } from "@/lib/env";

/**
 * Header interno usado pelo middleware para propagar o slug do inquilino
 * resolvido até os React Server Components. Nunca confie em valores vindos
 * do cliente: este header é reescrito a cada request pelo middleware.
 */
export const TENANT_HEADER = "x-gl-tenant" as const;

/** Slug do inquilino: apenas minúsculas, números e hífens. */
export const tenantSlugSchema = z
  .string()
  .min(2)
  .max(63)
  .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, {
    message: "Slug de inquilino inválido.",
  });

export type TenantSlug = z.infer<typeof tenantSlugSchema>;

/**
 * Representação de um inquilino carregado do banco.
 * Alinhado com a futura tabela `public.tenants` (protegida por RLS).
 */
export const tenantSchema = z.object({
  id: z.string().uuid(),
  slug: tenantSlugSchema,
  name: z.string().min(1),
  status: z.enum(["active", "suspended", "pending"]).default("active"),
  createdAt: z.string().datetime().optional(),
});

export type Tenant = z.infer<typeof tenantSchema>;

/** Subdomínios reservados que NÃO representam um inquilino. */
const RESERVED_SUBDOMAINS = new Set(["www", "app", "api", "admin", "static"]);

/**
 * Extrai o slug do inquilino a partir do hostname e, como fallback, do
 * primeiro segmento do pathname (modelo /t/<slug> para desenvolvimento local).
 *
 * Estratégia de produção: subdomínio (ex.: `alaide.glpro.app`).
 * Estratégia local/fallback: caminho (ex.: `localhost:3000/t/alaide`).
 */
export function extractTenantSlug(hostname: string, pathname: string): TenantSlug | null {
  const host = hostname.split(":")[0]?.toLowerCase() ?? "";
  const rootDomain = publicEnv.NEXT_PUBLIC_ROOT_DOMAIN.toLowerCase();

  // 1) Subdomínio sobre o domínio raiz configurado.
  if (host.endsWith(`.${rootDomain}`)) {
    const sub = host.slice(0, host.length - rootDomain.length - 1);
    const candidate = sub.split(".")[0];
    if (candidate && !RESERVED_SUBDOMAINS.has(candidate)) {
      const parsed = tenantSlugSchema.safeParse(candidate);
      if (parsed.success) return parsed.data;
    }
  }

  // 2) Fallback por caminho: /t/<slug> (útil em localhost e previews).
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "t" && segments[1]) {
    const parsed = tenantSlugSchema.safeParse(segments[1]);
    if (parsed.success) return parsed.data;
  }

  return null;
}

/**
 * Classifica a requisição segundo a regra de negócio:
 *  - "root"    → domínio raiz (sem subdomínio) → Home Institucional.
 *  - "tenant"  → subdomínio/caminho com slug bem-formado.
 *  - "invalid" → subdomínio presente, porém malformado → 404.
 *
 * A EXISTÊNCIA do tenant no banco é verificada no middleware (não aqui).
 */
export type TenantRequestClass =
  | { kind: "root" }
  | { kind: "tenant"; slug: TenantSlug }
  | { kind: "invalid"; attempted: string };

const LOCAL_ROOT_HOSTS = new Set(["localhost", "127.0.0.1"]);

export function classifyTenantRequest(hostname: string, pathname: string): TenantRequestClass {
  const host = hostname.split(":")[0]?.toLowerCase() ?? "";
  const rootDomain = publicEnv.NEXT_PUBLIC_ROOT_DOMAIN.toLowerCase();

  // Desenvolvimento local sem subdomínio → Home Institucional (salvo /t/<slug>).
  if (LOCAL_ROOT_HOSTS.has(host)) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "t" && segments[1] !== undefined) {
      const parsed = tenantSlugSchema.safeParse(segments[1]);
      return parsed.success
        ? { kind: "tenant", slug: parsed.data }
        : { kind: "invalid", attempted: segments[1] };
    }
    const devSlug = process.env.NEXT_PUBLIC_DEV_TENANT_SLUG;
    if (devSlug) {
      const parsed = tenantSlugSchema.safeParse(devSlug);
      if (parsed.success) return { kind: "tenant", slug: parsed.data };
    }
    return { kind: "root" };
  }

  // Domínio raiz exato → Home Institucional.
  if (host === rootDomain) return { kind: "root" };

  // Subdomínio sobre o domínio raiz.
  if (host.endsWith(`.${rootDomain}`)) {
    const label = host.slice(0, host.length - rootDomain.length - 1).split(".")[0] ?? "";
    if (!label || RESERVED_SUBDOMAINS.has(label)) return { kind: "root" };
    const parsed = tenantSlugSchema.safeParse(label);
    return parsed.success
      ? { kind: "tenant", slug: parsed.data }
      : { kind: "invalid", attempted: label };
  }

  // Fallback por caminho /t/<slug> (dev/local e previews sem subdomínio).
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "t" && segments[1] !== undefined) {
    const parsed = tenantSlugSchema.safeParse(segments[1]);
    return parsed.success
      ? { kind: "tenant", slug: parsed.data }
      : { kind: "invalid", attempted: segments[1] };
  }

  // Fallback para desenvolvimento local via variável de ambiente.
  // Em produção: NEXT_PUBLIC_DEV_TENANT_SLUG não deve ser definida.
  const devSlug = process.env.NEXT_PUBLIC_DEV_TENANT_SLUG;
  if (devSlug) {
    const parsed = tenantSlugSchema.safeParse(devSlug);
    if (parsed.success) return { kind: "tenant", slug: parsed.data };
  }

  // Host desconhecido sem caminho de tenant → domínio raiz.
  return { kind: "root" };
}

/**
 * Lê o slug do inquilino já resolvido pelo middleware, a partir dos headers
 * da request atual. Deve ser chamado em RSC / Server Actions.
 */
export async function getTenantSlug(): Promise<TenantSlug | null> {
  const { headers } = await import("next/headers");
  const headerStore = await headers();
  const raw = headerStore.get(TENANT_HEADER);
  if (!raw) return null;
  const parsed = tenantSlugSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

/**
 * Garante que existe um inquilino no contexto atual, lançando caso contrário.
 * Use como guarda no topo de queries para impedir acesso sem tenant.
 */
export async function requireTenantSlug(): Promise<TenantSlug> {
  const slug = await getTenantSlug();
  if (!slug) {
    throw new Error("Contexto de inquilino ausente: acesso negado.");
  }
  return slug;
}
