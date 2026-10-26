import { z } from "zod";

/**
 * Validação estrita das variáveis de ambiente.
 * Falha cedo (no boot) caso algo esteja ausente ou malformado.
 * Nunca use `process.env` diretamente no restante do código.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url({
    message: "NEXT_PUBLIC_SUPABASE_URL deve ser uma URL válida.",
  }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, {
    message: "NEXT_PUBLIC_SUPABASE_ANON_KEY é obrigatória.",
  }),
  /** Domínio raiz do SaaS, usado para extrair o subdomínio do inquilino. */
  NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1).default("glpro.local"),
});

const serverEnvSchema = z.object({
  /** Chave de serviço: SOMENTE no servidor. Nunca exponha ao cliente. */
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

function parsePublicEnv() {
  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
  });

  if (!parsed.success) {
    throw new Error(
      `Variáveis de ambiente públicas inválidas:\n${parsed.error.issues
        .map((issue) => ` - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  return parsed.data;
}

function parseServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  if (!parsed.success) {
    throw new Error(
      `Variáveis de ambiente do servidor inválidas:\n${parsed.error.issues
        .map((issue) => ` - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  return parsed.data;
}

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const publicEnv: PublicEnv = parsePublicEnv();

/** Disponível apenas em contexto de servidor. */
export function getServerEnv(): ServerEnv {
  return parseServerEnv();
}
