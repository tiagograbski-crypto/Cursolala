"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, Play, User } from "lucide-react";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/aluna/apostila", label: "Apostila", icon: BookOpen },
  { href: "/aluna/aulas", label: "Aulas", icon: Play },
  { href: "/aluna/anamnese", label: "Anamnese", icon: ClipboardList },
  { href: "/aluna/perfil", label: "Perfil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40" aria-label="Navegação da aluna">
      <div className="mx-auto w-full max-w-lg bg-pearl/92 px-4 pt-2.5 shadow-card backdrop-blur-md pb-[max(0.7rem,env(safe-area-inset-bottom))]">
        <ul className="grid grid-cols-4">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[10px] tracking-wide",
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
