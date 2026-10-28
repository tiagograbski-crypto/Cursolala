"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export { SNAP_CARD, SNAP_SLIDE } from "@/components/home/snapClasses";

type SnapRailProps = {
  ariaLabel: string;
  children: ReactNode;
  count: number;
  columnsMd?: 2 | 3;
  /** Mantém o carrossel horizontal em todos os breakpoints (depoimentos). */
  keepRail?: boolean;
};

export function SnapRail({ ariaLabel, children, count, columnsMd = 3, keepRail = false }: SnapRailProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.children) as HTMLElement[];
    if (cards.length === 0) return;

    const midpoint = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - midpoint);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    syncActive();
    rail.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      rail.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive]);

  function goTo(index: number) {
    const card = railRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }

  return (
    <div>
      <ul
        ref={railRef}
        tabIndex={0}
        aria-label={ariaLabel}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain hide-scrollbar px-5 pb-4",
          "focus-visible:outline-none",
          keepRail
            ? "md:px-8 lg:px-12"
            : cn(
                "md:mx-auto md:grid md:w-full md:max-w-[1440px] md:snap-none md:gap-5 md:overflow-visible md:px-8 md:pb-0 lg:px-12",
                columnsMd === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
              ),
        )}
      >
        {children}
      </ul>
      <div className={cn("mt-1 flex justify-center gap-2", !keepRail && "md:hidden")}>
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir ao card ${index + 1} de ${count}`}
            aria-current={index === active ? "true" : undefined}
            className={cn(
              "h-2 w-2 min-h-2 min-w-2 rounded-full transition-colors",
              index === active ? "bg-white/70" : "bg-white/20",
            )}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
