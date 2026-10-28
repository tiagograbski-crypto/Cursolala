import { type ApostilaChapter } from "@/lib/apostila-content";

interface ChapterDividerProps {
  chapter: ApostilaChapter;
}

/**
 * ChapterDivider — Interstício de capítulo.
 * Interrompe o ritmo da leitura clara com um bloco Glass Chumbo dramático.
 * Renderizado pelo ApostilaReader ao entrar nos Caps. 2, 3 e 4.
 */
export function ChapterDivider({ chapter }: ChapterDividerProps) {
  return (
    <div
      aria-label={`Início do Capítulo ${chapter.chapterNumber}: ${chapter.title}`}
      className="
        relative mb-8 overflow-hidden rounded-[28px]
        border border-white/10
        bg-zinc-900/85 backdrop-blur-2xl
        shadow-float
        px-8 py-16 md:py-24
      "
    >
      {/* Ruído de textura sutil (gradiente radial de fundo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgb(107 112 92 / 0.25), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Número do capítulo */}
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/30">
          Capítulo
        </p>
        <span
          className="mt-1 select-none font-serif leading-none text-white/10"
          style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
          aria-hidden
        >
          {String(chapter.chapterNumber).padStart(2, "0")}
        </span>

        {/* Divisor */}
        <div className="my-5 h-px w-12 bg-white/20" aria-hidden />

        {/* Título */}
        <h2 className="max-w-[18ch] font-serif text-[1.65rem] leading-[1.1] text-pearl md:text-[2rem]">
          {chapter.title}
        </h2>

        {/* Subtítulo */}
        <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-white/40">
          {chapter.subtitle}
        </p>

        {/* Range de páginas */}
        <p className="mt-6 text-[10px] tracking-[0.16em] text-white/20">
          Páginas {chapter.startPage} – {chapter.endPage}
        </p>
      </div>
    </div>
  );
}
