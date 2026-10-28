"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { studentNavItems } from "@/components/student/student-nav";
import { cn } from "@/lib/cn";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden" aria-label="Navegação da aluna">
      <div className="masterglass-silver-glass rounded-none border-x-0 border-b-0 bg-zinc-950/80 px-1 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))]">
        <ul className="mx-auto grid max-w-lg grid-cols-4">
          {studentNavItems.map((tab) => {
            const active = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex flex-col items-center gap-1 px-2 py-2.5 text-[9px] font-medium tracking-[0.16em] transition",
                    active ? "text-white" : "text-white/40 hover:text-white/80",
                  )}
                >
                  <Icon strokeWidth={1.4} className="h-[18px] w-[18px]" />
                  {tab.label}
                  <span
                    className={cn(
                      "absolute inset-x-7 bottom-1 h-px bg-white/80 transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
