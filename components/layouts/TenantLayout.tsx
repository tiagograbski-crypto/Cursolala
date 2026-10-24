"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { GlProSeal } from "@/components/ui/GlProSeal";
import { SessionGate } from "@/components/layouts/SessionGate";
import { clearSession } from "@/lib/session";
import { tenant } from "@/lib/tenant";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/produtora", label: "Liberação" },
  { href: "/produtora/acerto", label: "Acerto" },
  { href: "/produtora/vendas", label: "Vendas" },
];

export function TenantLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SessionGate role="produtora">
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
        <header className="sticky top-0 z-30 bg-pearl/90 px-6 pb-5 pt-6 shadow-card backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-sage">Backstage</p>
              <h1 className="mt-1 font-serif text-[1.85rem] leading-none text-ink">{tenant.brand}</h1>
            </div>
            <button
              type="button"
              onClick={() => {
                clearSession();
                router.replace("/");
              }}
              className="pt-1 text-[11px] uppercase tracking-[0.16em] text-ink"
            >
              Sair
            </button>
          </div>
          <nav className="mt-5 grid grid-cols-3 gap-1 rounded-2xl bg-pearl-deep p-1.5" aria-label="Gestão do espaço">
            {tabs.map((tab) => {
              const active = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-2 py-2.5 text-center text-[12px] tracking-wide transition",
                    active ? "bg-pearl text-ink shadow-card" : "text-ink",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
        <footer className="px-5 pb-8 pt-2">
          <GlProSeal />
        </footer>
      </div>
    </SessionGate>
  );
}
