"use client";

import { useEffect, useState } from "react";
import { licensesThisMonth, readLicenses } from "@/lib/licenses";
import { formatBRL } from "@/lib/tenant";
import type { TenantRecord } from "@/lib/tenant";

export function InfraReport({ tenantRecord }: { tenantRecord: TenantRecord }) {
  const [count, setCount] = useState<number | null>(null);
  const [month, setMonth] = useState("");

  useEffect(() => {
    setCount(licensesThisMonth(readLicenses()).length);
    setMonth(new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }));
  }, []);

  const total = (count ?? 0) * tenantRecord.rentalFeeCents;

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Infraestrutura</p>
      <h2 className="mt-1 font-serif text-[2rem] leading-none text-ink">Acerto do mês</h2>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{month}</p>

      <section className="mt-6 rounded-[28px] bg-pearl px-7 py-8 shadow-card">
        <p className="font-serif text-6xl leading-none text-ink">{count ?? "—"}</p>
        <p className="mt-2 text-sm text-ink-soft">Licenças geradas no mês</p>
        <div className="mt-8 space-y-3 pt-2 text-sm">
          <div className="flex items-center justify-between text-ink-soft">
            <span>Taxa de locação GL PRO</span>
            <span>{formatBRL(tenantRecord.rentalFeeCents)}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-ink">Total do espaço</span>
            <span className="font-serif text-3xl leading-none text-ink">{count === null ? "—" : formatBRL(total)}</span>
          </div>
        </div>
        <p className="mt-4 text-[13px] leading-6 text-ink-soft">
          {count === null
            ? "Contando licenças deste aparelho."
            : `${count} × ${formatBRL(tenantRecord.rentalFeeCents)} por licença emitida neste mês.`}{" "}
          O valor está configurado para o espaço {tenantRecord.brand}.
        </p>
      </section>
    </div>
  );
}
