"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { studentNavItems } from "@/components/student/student-nav";
import { cn } from "@/lib/cn";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden" aria-label="Navegação da aluna">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/80 px-3 py-2.5 pb-[max(0.35rem,env(safe-area-inset-bottom))] text-pearl shadow-2xl backdrop-blur-3xl">
        <ul className="grid grid-cols-4 gap-1">
          {studentNavItems.map((tab) => {
            const active = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold tracking-wide transition",
                    active ? "text-pearl" : "text-white/40 hover:text-pearl",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      active && "bg-white/15",
                    )}
                  >
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
