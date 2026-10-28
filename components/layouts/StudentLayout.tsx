"use client";

import type { ReactNode } from "react";
import { Award, Lock } from "lucide-react";
import { BottomNav } from "@/components/student/BottomNav";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { OswaldPreloader } from "@/components/OswaldPreloader";
import { SessionGate } from "@/components/layouts/SessionGate";
import { ProducerPortrait } from "@/components/ui/ProducerPortrait";
import type { TenantRecord } from "@/lib/tenant";

export function StudentLayout({
  children,
  tenantRecord,
}: {
  children: ReactNode;
  tenantRecord: TenantRecord;
}) {
  return (
    <SessionGate role="aluna">
      <OswaldPreloader>
      <div className="min-h-dvh bg-pearl scheme-light">
        <div className="mx-auto flex min-h-dvh w-full max-w-[1920px]">
          <StudentSidebar tenantRecord={tenantRecord} />

          <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 border-b border-ink/8 bg-pearl/90 text-ink shadow-card backdrop-blur-md lg:hidden">
              <div className="mx-auto flex w-full max-w-lg items-center gap-4 px-6 py-4">
                <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
                  <ProducerPortrait portrait={tenantRecord.portrait} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-serif text-[17px] leading-snug text-ink">{tenantRecord.brand}</p>
                  <div
                    className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-ink/10"
                    role="progressbar"
                    aria-valuenow={tenantRecord.courseProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progresso do curso"
                  >
                    <div className="h-full rounded-full bg-sage" style={{ width: `${tenantRecord.courseProgress}%` }} />
                  </div>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-ink/40">
                    {tenantRecord.courseProgress}% concluído
                  </p>
                </div>
                <button
                  type="button"
                  disabled
                  aria-label="Certificado bloqueado até a conclusão da trilha"
                  className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-ink/10 bg-pearl-deep text-ink/40"
                >
                  <Award strokeWidth={1.5} className="h-[18px] w-[18px]" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-ink/10 bg-pearl text-ink/40">
                    <Lock strokeWidth={2} className="h-2.5 w-2.5" />
                  </span>
                </button>
              </div>
            </header>

            <main
              className="flex-1 px-5 pt-6 pb-[calc(8rem+env(safe-area-inset-bottom))] md:px-8 md:pt-8 lg:px-10 lg:pb-12 lg:pt-10 2xl:px-14"
            >
              <div className="mx-auto w-full max-w-lg md:max-w-3xl lg:max-w-5xl 2xl:max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
        <BottomNav />
      </div>
      </OswaldPreloader>
    </SessionGate>
  );
}
