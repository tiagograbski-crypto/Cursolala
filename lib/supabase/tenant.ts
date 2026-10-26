import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  requireTenantSlug,
  tenantSchema,
  tenantSlugSchema,
  type Tenant,
} from "@/lib/tenant-context";

/**
 * Resolve o inquilino do contexto atual (slug vindo do middleware) no banco.
 *
 * RLS: a policy em `public.tenants` deve permitir leitura apenas do inquilino
 * correspondente ao claim/escopo da sessão. Esta função nunca consulta sem um
 * slug válido — reforçando o isolamento multi-tenant na camada de aplicação.
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  const slug = await requireTenantSlug();
  return getTenantBySlug(slug);
}

export async function getTenantBySlug(slugInput: string): Promise<Tenant | null> {
  const slug = tenantSlugSchema.parse(slugInput);
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("tenants")
    .select("id, slug, name, status, created_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Falha ao resolver inquilino "${slug}": ${error.message}`);
  }
  if (!data) return null;

  return tenantSchema.parse({
    id: data.id,
    slug: data.slug,
    name: data.name,
    status: data.status,
    createdAt: data.created_at ?? undefined,
  });
}
