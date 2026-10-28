import Image from "next/image";

/** Foto da fundadora no hero — luz no rosto, máscara só no topo (logo) e na copy. */
export const FOUNDER_GHOST_SRC = "/images/alaide-ghost.jpg";

export function FounderGhostBackdrop({ className }: { className?: string }) {
  return (
    <div className={className ?? "pointer-events-none absolute inset-0 min-h-[100dvh] w-full"} aria-hidden>
      <Image
        src={FOUNDER_GHOST_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top opacity-50 grayscale md:opacity-30"
      />
      <div className="absolute inset-x-0 top-0 z-0 h-[40%] bg-gradient-to-b from-zinc-950/80 via-zinc-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-[65%] bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent" />
    </div>
  );
}
