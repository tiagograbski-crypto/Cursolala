import { NextResponse, type NextRequest } from "next/server";
import { classifyTenantRequest, TENANT_HEADER } from "@/lib/tenant-context";
import { tenantSlugExists } from "@/lib/tenant";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

/**
 * Middleware do GL PRO (Edge).
 *
 * Responsabilidades, nesta ordem:
 *  1. Identificar o inquilino (tenant) a partir do subdomínio ou do caminho.
 *  2. Propagar o slug resolvido via header interno para os Server Components.
 *  3. Renovar a sessão do Supabase, mantendo os cookies sincronizados.
 *
 * O header de tenant é SEMPRE reescrito aqui, impedindo spoofing pelo cliente.
 */
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") ?? url.hostname;

  const classification = classifyTenantRequest(hostname, url.pathname);

  // Regra de negócio: subdomínio malformado → 404.
  if (classification.kind === "invalid") {
    return tenantNotFound(request);
  }

  // Regra de negócio: subdomínio bem-formado porém inexistente no banco → 404.
  if (classification.kind === "tenant" && !tenantSlugExists(classification.slug)) {
    return tenantNotFound(request);
  }

  // Reencaminha os headers, sempre sobrescrevendo o header de tenant.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete(TENANT_HEADER);
  if (classification.kind === "tenant") {
    requestHeaders.set(TENANT_HEADER, classification.slug);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (classification.kind === "tenant") {
    response.headers.set(TENANT_HEADER, classification.slug);
  }

  // Raiz (Home Institucional) e tenant válido: renova a sessão do Supabase.
  return updateSupabaseSession(request, response);
}

/** Reescreve para a not-found global do App Router com status 404. */
function tenantNotFound(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = "/espaco-nao-encontrado";
  return NextResponse.rewrite(url, { status: 404 });
}

export const config = {
  /**
   * Executa em todas as rotas, exceto assets estáticos e otimização de imagem.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
