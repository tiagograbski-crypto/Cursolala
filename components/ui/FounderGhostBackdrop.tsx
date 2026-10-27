/** Camada de fundo — enquadramento único na home (preloader + vitrine). */
export const FOUNDER_GHOST_SRC = "/images/alaide-ghost.jpg";

export function FounderGhostBackdrop({ className }: { className?: string }) {
  return (
    <div className={className ?? "pointer-events-none absolute inset-0 min-h-[100dvh] w-full"} aria-hidden>
      <img
        src={FOUNDER_GHOST_SRC}
        alt=""
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-top opacity-[0.28] mix-blend-luminosity saturate-0"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(255,255,255,0.05),transparent_55%)]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20 md:via-zinc-950/50 md:to-transparent"
      />
      <div
        className="absolute inset-x-0 top-0 h-[min(72vh,36rem)] bg-gradient-to-b from-zinc-950/45 via-zinc-950/30 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent" />
    </div>
  );
}
