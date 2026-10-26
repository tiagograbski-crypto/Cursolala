"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, Lock } from "lucide-react";
import { ProducerPortrait } from "@/components/ui/ProducerPortrait";
import { studentNavItems } from "@/components/student/student-nav";
import { tenant } from "@/lib/tenant";
import { cn } from "@/lib/cn";

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 hidden h-dvh w-[17.5rem] shrink-0 flex-col border-r border-white/10 bg-zinc-950/80 px-6 py-8 text-pearl shadow-2xl backdrop-blur-3xl lg:flex"
      aria-label="Navegação principal"
    >
      <div className="flex items-center gap-4">
        <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
          <ProducerPortrait />
        </span>
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-none text-pearl">{tenant.brand}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">Espaço da aluna</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-5 py-5">
        <div
          className="h-[3px] overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={tenant.courseProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do curso"
        >
          <div className="h-full rounded-full bg-pearl" style={{ width: `${tenant.courseProgress}%` }} />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
          {tenant.courseProgress}% concluído
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
                active ? "bg-white/10 text-pearl" : "text-white/40 hover:bg-white/5 hover:text-pearl",
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
        className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/40"
      >
        <Award strokeWidth={1.5} className="h-[18px] w-[18px]" />
        Certificado bloqueado
        <Lock strokeWidth={2} className="absolute right-4 h-3.5 w-3.5 text-white/40" />
      </button>
    </aside>
  );
}
