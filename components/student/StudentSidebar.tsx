"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, Lock } from "lucide-react";
import { ProducerPortrait } from "@/components/ui/ProducerPortrait";
import { studentNavItems } from "@/components/student/student-nav";
import type { TenantRecord } from "@/lib/tenant";
import { cn } from "@/lib/cn";

export function StudentSidebar({ tenantRecord }: { tenantRecord: TenantRecord }) {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 hidden h-dvh w-[17.5rem] shrink-0 flex-col border-r border-ink/8 bg-pearl/95 px-6 py-8 text-ink shadow-card backdrop-blur-md lg:flex"
      aria-label="Navegação principal"
    >
      <div className="flex items-center gap-4">
        <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
          <ProducerPortrait portrait={tenantRecord.portrait} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-none text-ink">{tenantRecord.brand}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/40">Espaço da aluna</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-pearl-deep px-5 py-5">
        <div
          className="h-[3px] overflow-hidden rounded-full bg-ink/10"
          role="progressbar"
          aria-valuenow={tenantRecord.courseProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do curso"
        >
          <div className="h-full rounded-full bg-sage" style={{ width: `${tenantRecord.courseProgress}%` }} />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-ink/40">
          {tenantRecord.courseProgress}% concluído
        </p>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {studentNavItems.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm tracking-wide transition",
                active ? "bg-pearl-deep text-ink shadow-card" : "text-ink/45 hover:bg-pearl-deep/70 hover:text-ink",
              )}
            >
              <Icon strokeWidth={1.5} className="h-[18px] w-[18px] shrink-0" />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        disabled
        aria-label="Certificado bloqueado até a conclusão da trilha"
        className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-pearl-deep px-4 py-3 text-sm text-ink/40"
      >
        <Award strokeWidth={1.5} className="h-[18px] w-[18px]" />
        Certificado bloqueado
        <Lock strokeWidth={2} className="absolute right-4 h-3.5 w-3.5 text-ink/40" />
      </button>
    </aside>
  );
}
