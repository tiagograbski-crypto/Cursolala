"use client";

import { useRouter } from "next/navigation";
import { Award, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlProSeal } from "@/components/ui/GlProSeal";
import { ProducerPortrait } from "@/components/ui/ProducerPortrait";
import { clearSession, readSession } from "@/lib/session";
import { tenant } from "@/lib/tenant";

export function ProfilePanel() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(readSession()?.token ?? "");
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <span className="block h-20 w-20 overflow-hidden rounded-full shadow-card">
          <ProducerPortrait />
        </span>
        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-sage">Aluna</p>
        <h1 className="mt-2 font-serif text-3xl leading-none text-ink">{tenant.brand}</h1>
      </div>

      <dl className="mt-8 space-y-3">
        <div className="rounded-[24px] bg-pearl px-6 py-5 shadow-card">
          <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">Licença pessoal</dt>
          <dd className="mt-1 break-all font-serif text-[1.65rem] leading-tight tracking-[0.06em] text-ink">{token || "—"}</dd>
        </div>
        <div className="rounded-[24px] bg-pearl px-6 py-5 shadow-card">
          <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">CPF na marca d'água</dt>
          <dd className="mt-1 text-sm text-ink">{tenant.maskedDocument}</dd>
        </div>
        <div className="flex items-center justify-between rounded-[24px] bg-pearl px-6 py-5 shadow-card">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">Certificado</dt>
            <dd className="mt-1 text-sm text-ink">Bloqueado · {tenant.courseProgress}% da trilha</dd>
          </div>
          <span className="relative text-ink-soft">
            <Award strokeWidth={1.5} className="h-6 w-6" />
            <Lock strokeWidth={2} className="absolute -right-1 -top-1 h-3 w-3" />
          </span>
        </div>
      </dl>

      <Button
        variant="ghost"
        full
        className="mt-6"
        onClick={() => {
          clearSession();
          router.replace("/");
        }}
      >
        Sair do espaço
      </Button>
      <div className="mt-10">
        <GlProSeal />
      </div>
    </div>
  );
}
