"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { GlProSeal } from "@/components/ui/GlProSeal";
import { normalizeLicense, resolveRole } from "@/lib/access";
import { homeFor, readSession, writeSession } from "@/lib/session";
import { getMvpTenant } from "@/lib/tenant";

export default function AlunaLoginPage() {
  const router = useRouter();
  const tenant = getMvpTenant();
  const [license, setLicense] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (!session) return;
    router.replace(homeFor(session.role));
  }, [router]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const token = normalizeLicense(license);
    const role = resolveRole(token);
    if (!role) {
      setError("Licença não reconhecida. Confira o código enviado pela produtora.");
      return;
    }

    setPending(true);
    const saved = writeSession({ token, role, tenantId: tenant.id });
    if (!saved) {
      setPending(false);
      setError("Não foi possível guardar a licença neste aparelho.");
      return;
    }

    router.push(homeFor(role));
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-zinc-950 px-6 py-8">
        <div className="pointer-events-none absolute left-1/2 top-[18%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />
        <section
          data-glass-surface=""
          className="relative w-full max-w-xl rounded-[28px] border border-white/10 bg-zinc-950/80 px-8 py-10 text-pearl shadow-2xl backdrop-blur-3xl sm:px-12 [&_h1]:text-pearl [&_p]:text-pearl"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-white/45">Portaria VIP</p>
          <h1 className="mt-4 font-serif text-[3.25rem] leading-[0.92] text-pearl">Acesso Restrito</h1>
          <p className="mt-4 text-sm leading-6 text-pearl/75">Insira sua Licença Masterglass</p>

          <form onSubmit={submit} className="mt-10">
            <label className="block">
              <span className="sr-only">Licença Masterglass</span>
              <input
                value={license}
                onChange={(event) => {
                  setLicense(event.target.value.toUpperCase());
                  if (error) setError("");
                }}
                autoCapitalize="characters"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                placeholder="LALA-XXXX-XXXX"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "license-error" : undefined}
                className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-5 text-center font-serif text-[1.65rem] tracking-[0.18em] text-pearl outline-none transition placeholder:font-sans placeholder:text-[13px] placeholder:tracking-[0.28em] placeholder:text-white/35 focus:border-white/40"
              />
            </label>

            {error ? (
              <p id="license-error" className="mt-4 text-sm leading-6 text-pearl" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" full className="mt-6" disabled={pending || normalizeLicense(license).length < 6}>
              Autenticar Credencial
            </Button>
          </form>

          <div className="mt-8">
            <GlProSeal tone="light" />
          </div>
        </section>
    </main>
  );
}
