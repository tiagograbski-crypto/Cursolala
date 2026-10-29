"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const HANDOFF_Y = 400;

const CTA_FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pearl";

type StickySecondaryLink = {
  href: string;
  label: string;
};

/** Passagem de bastão: o flutuante só entra depois que o CTA do hero já saiu da dobra. */
export function HandoffStickyCta({
  href,
  secondary,
}: {
  href: string;
  secondary?: StickySecondaryLink;
}) {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    function onScroll() {
      const next = window.scrollY > HANDOFF_Y;
      setShowStickyCTA((prev) => (prev === next ? prev : next));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 right-6 z-50 pb-[env(safe-area-inset-bottom)] transition-all duration-500 ease-out md:left-auto md:right-6",
        showStickyCTA
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-12 opacity-0",
      )}
      aria-hidden={!showStickyCTA}
    >
      <div className="flex flex-col gap-2.5 sm:items-end">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showStickyCTA ? 0 : -1}
          className={cn(
            "flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-zinc-950 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition hover:bg-pearl sm:min-w-[16rem] sm:w-auto",
            CTA_FOCUS,
          )}
          aria-label="Falar com a Alaíde no WhatsApp 47 9691-2277"
        >
          Falar com a Alaíde
        </a>
        {secondary ? (
          <Link
            href={secondary.href}
            tabIndex={showStickyCTA ? 0 : -1}
            className={cn(
              "flex min-h-10 w-full items-center justify-center rounded-full border border-white/15 bg-zinc-950/70 px-5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-white/25 hover:text-pearl sm:min-w-[16rem] sm:w-auto",
              CTA_FOCUS,
            )}
          >
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
