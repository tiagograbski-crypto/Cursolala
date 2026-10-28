import Image from "next/image";
import { asset } from "@/lib/asset";

/** Foto da fundadora no hero — retrato à direita no desktop, máscara de copy no mobile. */
export const FOUNDER_GHOST_SRC = "/images/alaide-ghost.jpg";

export function FounderGhostBackdrop({ className }: { className?: string }) {
  return (
    <div className={className ?? "pointer-events-none absolute inset-0 min-h-[100dvh] w-full"} aria-hidden>
      <div className="absolute inset-0 lg:inset-y-0 lg:left-1/2 lg:right-0">
        <Image
          src={asset(FOUNDER_GHOST_SRC)}
          alt=""
          fill
          priority
          unoptimized
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top opacity-50 grayscale md:opacity-30 lg:object-[70%_12%] lg:opacity-45"
        />
        <div className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-zinc-950 to-transparent lg:block" />
      </div>
      <div className="absolute inset-x-0 top-0 z-0 h-[40%] bg-gradient-to-b from-zinc-950/80 via-zinc-950/20 to-transparent lg:hidden" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-[65%] bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent lg:hidden" />
    </div>
  );
}
