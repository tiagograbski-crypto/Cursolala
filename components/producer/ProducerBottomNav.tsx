"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { producerNavItems } from "@/components/producer/producer-nav";
import { cn } from "@/lib/cn";

export function ProducerBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden" aria-label="Navegação do backstage">
      <div className="mx-auto max-w-lg rounded-3xl bg-pearl/88 px-3 py-2.5 shadow-float backdrop-blur-lg pb-[max(0.35rem,env(safe-area-inset-bottom))]">
        <ul className="grid grid-cols-4 gap-1">
          {producerNavItems.map((tab) => {
            const active = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] tracking-wide",
                    active ? "text-sage" : "text-ink",
                  )}
                >
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", active && "bg-sage/10")}>
                    <Icon strokeWidth={1.5} className="h-[18px] w-[18px]" />
                  </span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
