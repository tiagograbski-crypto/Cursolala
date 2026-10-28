import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  caption: string;
  figure: number;
  aspectRatio?: "4/3" | "16/9" | "1/1";
}

export function ImagePlaceholder({
  caption,
  figure,
  aspectRatio = "4/3",
}: ImagePlaceholderProps) {
  return (
    <figure className="my-10">
      <div
        className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-200/50 bg-zinc-900/5 shadow-sm backdrop-blur-sm"
        style={{ aspectRatio: aspectRatio.replace("/", " / ") }}
        aria-label={caption}
      >
        <ImageIcon
          strokeWidth={1}
          className="h-10 w-10 text-zinc-300"
          aria-hidden
        />
        <div className="flex flex-col items-center gap-0.5 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Inserir imagem
          </span>
          <span className="text-[10px] tracking-[0.06em] text-zinc-400/70">
            Figura {String(figure).padStart(2, "0")}
          </span>
        </div>
      </div>
      <figcaption className="mx-auto mt-3 max-w-3xl text-center font-light text-[11px] tracking-[0.08em] text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
