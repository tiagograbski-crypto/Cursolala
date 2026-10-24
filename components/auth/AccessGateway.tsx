"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { PreloadScreen } from "@/components/auth/PreloadScreen";
import { Button } from "@/components/ui/Button";
import { GlProSeal } from "@/components/ui/GlProSeal";
import { ProducerPortrait } from "@/components/ui/ProducerPortrait";
import { normalizeLicense, resolveRole } from "@/lib/access";
import { homeFor, readSession, writeSession } from "@/lib/session";
import { tenant } from "@/lib/tenant";

export function AccessGateway() {
  const router = useRouter();
  const [gate, setGate] = useState<"check" | "form" | "preload">("check");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const pending = useRef(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const session = readSession();
    if (session) {
      router.replace(homeFor(session.role));
      return;
    }
    setGate("form");
  }, [router]);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function fail(message: string) {
    setError(message);
    setShaking(false);
    window.requestAnimationFrame(() => setShaking(true));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const license = normalizeLicense(token);
    const role = resolveRole(license);
    if (!role) {
      fail("Licença não reconhecida. Confira o código enviado pela produtora.");
      return;
    }

    pending.current = true;
    setError("");
    setGate("preload");
    timer.current = window.setTimeout(() => {
      const saved = writeSession({ token: license, role, tenantId: tenant.id });
      if (!saved) {
        pending.current = false;
        setGate("form");
        setError("Não foi possível guardar a licença neste aparelho.");
        return;
      }
      router.push(homeFor(role));
    }, 1500);
  }

  if (gate === "check") {
    return (
      <AuthLayout>
        <div className="flex min-h-dvh flex-col">
          <div className="flex-1" />
          <footer className="pb-10">
            <GlProSeal />
          </footer>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {gate === "preload" ? (
          <PreloadScreen key="preload" />
        ) : (
          <motion.div
            key="form"
            className="flex min-h-dvh flex-col px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="w-full max-w-sm text-center">
                <span className="mx-auto mb-7 block h-[7.25rem] w-[7.25rem] overflow-hidden rounded-full shadow-card">
                  <ProducerPortrait />
                </span>
                <p className="text-[10px] uppercase tracking-[0.34em] text-sage">{tenant.discipline}</p>
                <h1 className="mt-4 font-serif text-[3.15rem] leading-[0.88] text-ink">
                  Alaíde
                  <br />
                  Proença
                </h1>
                <span className="mx-auto mt-6 block h-px w-10 bg-sage" />
                <p className="mt-6 text-sm leading-6 text-ink-soft">Acesso pessoal, enviado pela produtora.</p>

                <form onSubmit={submit} className={shaking ? "animate-shake mt-10" : "mt-10"}>
                  <label className="block text-left">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                      Licença de acesso
                    </span>
                    <input
                      value={token}
                      onChange={(event) => {
                        setToken(event.target.value.toUpperCase());
                        if (error) setError("");
                      }}
                      autoCapitalize="characters"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="go"
                      placeholder="LALA-2026"
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "license-error" : undefined}
                      className="mt-3 w-full border-b border-sage/40 bg-transparent py-4 text-center font-serif text-[1.7rem] tracking-[0.16em] text-ink outline-none transition placeholder:font-sans placeholder:text-sm placeholder:tracking-[0.2em] placeholder:text-ink/45 focus:border-sage"
                    />
                  </label>

                  {error ? (
                    <p id="license-error" className="mt-4 text-sm leading-6 text-ink" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <Button type="submit" full className="mt-8" disabled={normalizeLicense(token).length < 6}>
                    Entrar
                  </Button>
                </form>

                <p className="mt-8 text-[11px] leading-5 text-ink-soft">
                  Demonstração: <span className="text-ink">LALA-2026</span> entra como aluna.{" "}
                  <span className="text-ink">LALA-PROD</span> abre o backstage.
                </p>
              </div>
            </div>
            <footer className="pb-10">
              <GlProSeal />
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
