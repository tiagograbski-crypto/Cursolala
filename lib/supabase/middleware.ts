import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { publicEnv } from "@/lib/env";

/**
 * Renova a sessão do Supabase dentro do middleware (Edge) e propaga os
 * cookies atualizados tanto para a request quanto para a response.
 *
 * Recebe uma `response` já preparada (com os headers de tenant) para que
 * o contexto multi-tenant e a sessão convivam na mesma passagem.
 */
export async function updateSupabaseSession(
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> {
  const supabase = createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Dispara a renovação do token de acesso, se necessário.
  await supabase.auth.getUser();

  return response;
}
