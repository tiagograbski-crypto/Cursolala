"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { GlProSeal } from "@/components/ui/GlProSeal";
import { ProducerBottomNav } from "@/components/producer/ProducerBottomNav";
import { ProducerSidebar } from "@/components/producer/ProducerSidebar";
import { SessionGate } from "@/components/layouts/SessionGate";
import { clearSession } from "@/lib/session";
import type { TenantRecord } from "@/lib/tenant";

export function ProducerLayout({
  children,
  tenantRecord,
}: {
  children: ReactNode;
  tenantRecord: TenantRecord;
}) {
  const router = useRouter();

  return (
    <SessionGate role="produtora">
      <div className="min-h-dvh bg-pearl">
        <div className="mx-auto flex min-h-dvh w-full max-w-[1920px]">
          <ProducerSidebar tenantRecord={tenantRecord} />

          <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 bg-pearl/90 px-6 pb-5 pt-6 shadow-card backdrop-blur-md lg:hidden">
              <div className="mx-auto flex w-full max-w-lg items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-sage">Backstage</p>
                  <h1 className="mt-1 font-serif text-[1.85rem] leading-none text-ink">{tenantRecord.brand}</h1>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    clearSession();
                    router.replace("/aluna/login");
                  }}
                  className="pt-1 text-[11px] uppercase tracking-[0.16em] text-ink"
                >
                  Sair
                </button>
              </div>
            </header>

            <main
              className="flex-1 px-5 py-6 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:px-8 md:py-8 lg:px-10 lg:pb-12 lg:pt-10 2xl:px-14"
            >
              <div className="mx-auto w-full max-w-lg md:max-w-3xl lg:max-w-5xl 2xl:max-w-7xl">{children}</div>
            </main>

            <footer className="hidden px-5 pb-8 pt-2 lg:block lg:px-10 2xl:px-14">
              <div className="mx-auto max-w-7xl">
                <GlProSeal />
              </div>
            </footer>
          </div>
        </div>
        <ProducerBottomNav />
      </div>
    </SessionGate>
  );
}
