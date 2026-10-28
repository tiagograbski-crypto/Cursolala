import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

interface GraphicStageProps {
  caption: string;
  figure: number;
  aspectRatio?: "4/3" | "16/9" | "1/1";
  children?: ReactNode;
}

/**
 * GraphicStage — Palco escuro para gráficos técnicos de alto impacto.
 * Glass Chumbo para fazer as cores do gráfico saltarem contra o fundo pérola.
 */
export function GraphicStage({
  caption,
  figure,
  aspectRatio = "4/3",
  children,
}: GraphicStageProps) {
  return (
    <figure className="my-10">
      <div
        className="
          relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center
          overflow-hidden rounded-2xl
          border border-white/10
          bg-zinc-950/80 backdrop-blur-3xl
          px-4 py-6 shadow-2xl sm:px-6 sm:py-8
        "
        data-glass-surface=""
        style={{ aspectRatio: children ? undefined : aspectRatio.replace("/", " / "), minHeight: children ? undefined : undefined }}
        aria-label={caption}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 45%, rgb(107 112 92 / 0.35), transparent 70%)",
          }}
        />

        {children ? (
          <div className="relative z-10 w-full">{children}</div>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-3 py-8">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5"
              aria-hidden
            >
              <ImageIcon strokeWidth={1} className="h-6 w-6 text-white/30" />
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
                Inserir gráfico técnico
              </span>
              <span className="text-[9px] tracking-[0.12em] text-white/25">
                Figura {String(figure).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}
      </div>

      <figcaption className="mx-auto mt-4 max-w-3xl text-center font-light text-[11px] tracking-[0.1em] text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
