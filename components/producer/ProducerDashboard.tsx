"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, TrendingUp } from "lucide-react";
import { Button, buttonClass } from "@/components/ui/Button";
import { createLicenseCode, readLicenses, writeLicenses, type IssuedLicense } from "@/lib/licenses";
import type { TenantRecord } from "@/lib/tenant";

type IssuedCode = {
  id: string;
  code: string;
};

const INITIAL_LICENSES: IssuedCode[] = [
  { id: "seed-mstg", code: "LALA-9XF2-MSTG" },
  { id: "seed-7qwr", code: "LALA-4KPM-7QWR" },
  { id: "seed-c8ld", code: "LALA-H3VN-C8LD" },
];

function toIssuedCode(item: IssuedLicense): IssuedCode {
  return { id: `${item.code}-${item.createdAt}`, code: item.code };
}

export function ProducerDashboard({ tenantRecord }: { tenantRecord: TenantRecord }) {
  const [licenses, setLicenses] = useState<IssuedCode[]>(INITIAL_LICENSES);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    const stored = readLicenses();
    if (stored.length > 0) setLicenses(stored.map(toIssuedCode));
  }, []);

  function issue() {
    const license: IssuedLicense = {
      code: createLicenseCode(),
      studentName: "",
      createdAt: new Date().toISOString(),
    };
    const stored = [license, ...readLicenses()];
    if (!writeLicenses(stored)) {
      setSaveError(true);
      return;
    }
    setSaveError(false);
    setLicenses(stored.map(toIssuedCode));
    setCopiedId(null);
    setCopyError(false);
  }

  async function copy(item: IssuedCode) {
    try {
      await navigator.clipboard.writeText(item.code);
      setCopiedId(item.id);
      setCopyError(false);
    } catch {
      setCopiedId(null);
      setCopyError(true);
    }
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sage">Backstage</p>
      <h1 className="mt-2 font-serif text-[2.25rem] leading-tight text-ink md:text-[2.75rem]">{tenantRecord.brand}</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft">
        Licenças do espaço e o módulo de tração. Tudo neste aparelho, pronto para a operação da turma.
      </p>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-5">
        <section className="flex flex-col rounded-[28px] bg-pearl p-7 text-ink shadow-card xl:col-span-3 md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sage">Máquina de Tokens</p>
          <h2 className="mt-2 font-serif text-[2rem] leading-none text-ink">Central de Licenças</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-soft">
            Emita a credencial e envie para a aluna. Cada código nasce válido por 30 dias.
          </p>

          <Button full className="mt-6 whitespace-normal px-6 py-4 text-center leading-snug" onClick={issue}>
            Emitir Nova Licença (Válida por 30 dias)
          </Button>

          <ul className="mt-6 divide-y divide-ink/10">
            {licenses.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-4">
                <span>
                  <span className="block font-serif text-[1.35rem] tracking-[0.12em] text-ink">{item.code}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-ink-soft">Válida por 30 dias</span>
                </span>
                <Button variant="ghost" className="shrink-0 px-4 py-2.5 text-[12px]" onClick={() => copy(item)}>
                  {copiedId === item.id ? (
                    <Check strokeWidth={1.5} className="h-4 w-4" />
                  ) : (
                    <Copy strokeWidth={1.5} className="h-4 w-4" />
                  )}
                  {copiedId === item.id ? "Copiado" : "Copiar"}
                </Button>
              </li>
            ))}
          </ul>
          {saveError ? (
            <p className="text-sm leading-6 text-ink" role="alert">
              Não foi possível guardar a licença neste aparelho.
            </p>
          ) : null}
          {copyError ? (
            <p className="text-sm leading-6 text-ink-soft" role="alert">
              Segure o código para copiar manualmente.
            </p>
          ) : null}
        </section>

        <section
          data-glass-surface=""
          className="flex flex-col rounded-[28px] border border-white/10 bg-zinc-950/80 p-7 text-pearl shadow-2xl backdrop-blur-3xl xl:col-span-2 md:p-8 [&_h2]:text-pearl [&_p]:text-pearl"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-pearl">
            <TrendingUp strokeWidth={1.5} className="h-5 w-5" />
          </span>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Growth & Marketing</p>
          <h2 className="mt-2 font-serif text-[2rem] leading-tight text-pearl">Impulsionamento e Vendas</h2>
          <p className="mt-4 text-sm leading-7 text-pearl/75">Acervo de Marketing</p>
          <p className="text-sm leading-7 text-pearl/75">Estratégias de Tração</p>
          <div className="pt-8">
            <Link href="/produtora/vendas" className={buttonClass("primary", false, "px-6")}>
              Acessar Materiais
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
