import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env";

/**
 * Cliente Supabase para uso em React Server Components, Route Handlers
 * e Server Actions. A sessão do usuário é lida/escrita via cookies.
 *
 * Em RSC puros a escrita de cookies não é permitida — por isso o `setAll`
 * é protegido com try/catch (a renovação de sessão ocorre no middleware).
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Chamado a partir de um Server Component sem acesso de escrita.
            // A renovação da sessão é tratada pelo middleware.
          }
        },
      },
    },
  );
}
