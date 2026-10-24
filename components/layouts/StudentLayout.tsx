"use client";

import type { ReactNode } from "react";
import { Award, Lock } from "lucide-react";
import { BottomNav } from "@/components/student/BottomNav";
import { SessionGate } from "@/components/layouts/SessionGate";
import { ProducerPortrait } from "@/components/ui/ProducerPortrait";
import { tenant } from "@/lib/tenant";

export function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <SessionGate role="aluna">
      <div className="min-h-dvh">
        <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
          <header className="sticky top-0 z-30 bg-pearl/90 shadow-card backdrop-blur-md">
            <div className="flex items-center gap-4 px-6 py-4">
              <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-card">
                <ProducerPortrait />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-[17px] leading-none text-ink">{tenant.brand}</p>
                <div
                  className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-pearl-deep"
                  role="progressbar"
                  aria-valuenow={tenant.courseProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progresso do curso"
                >
                  <div className="h-full rounded-full bg-sage" style={{ width: `${tenant.courseProgress}%` }} />
                </div>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-ink">
                  {tenant.courseProgress}% concluído
                </p>
              </div>
              <button
                type="button"
                disabled
                aria-label="Certificado bloqueado até a conclusão da trilha"
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-pearl text-ink shadow-card"
              >
                <Award strokeWidth={1.5} className="h-[18px] w-[18px]" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pearl text-ink shadow-card">
                  <Lock strokeWidth={2} className="h-2.5 w-2.5" />
                </span>
              </button>
            </div>
          </header>
          <main className="flex-1 px-6 pt-8 pb-[calc(8.5rem+env(safe-area-inset-bottom))]">{children}</main>
        </div>
        <BottomNav />
      </div>
    </SessionGate>
  );
}
