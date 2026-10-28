import { FounderGhostBackdrop } from "@/components/ui/FounderGhostBackdrop";

/** Foto da fundadora — somente no hero (`absolute`), nunca `fixed` no viewport. */
export function HomeFounderStage() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-zinc-950" aria-hidden>
      <FounderGhostBackdrop className="absolute inset-0 h-full w-full" />
    </div>
  );
}
