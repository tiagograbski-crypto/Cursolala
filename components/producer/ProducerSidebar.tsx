"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GlProSeal } from "@/components/ui/GlProSeal";
import { producerNavItems } from "@/components/producer/producer-nav";
import type { TenantRecord } from "@/lib/tenant";
import { clearSession } from "@/lib/session";
import { cn } from "@/lib/cn";

export function ProducerSidebar({ tenantRecord }: { tenantRecord: TenantRecord }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className="sticky top-0 hidden h-dvh w-[17.5rem] shrink-0 flex-col bg-pearl/95 px-6 py-8 shadow-card backdrop-blur-lg lg:flex"
      aria-label="Gestão do espaço"
    >
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-sage">Backstage</p>
        <h1 className="mt-2 font-serif text-2xl leading-none text-ink">{tenantRecord.brand}</h1>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1.5">
        {producerNavItems.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm tracking-wide transition",
                active ? "bg-pearl-deep text-ink shadow-card" : "text-ink hover:bg-pearl-deep/70",
              )}
            >
              <Icon strokeWidth={1.5} className="h-[18px] w-[18px] shrink-0 text-sage" />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => {
          clearSession();
          router.replace("/aluna/login");
        }}
        className="rounded-2xl px-4 py-3 text-left text-[11px] uppercase tracking-[0.16em] text-ink transition hover:bg-pearl-deep"
      >
        Sair
      </button>
      <div className="mt-6">
        <GlProSeal />
      </div>
    </aside>
  );
}
