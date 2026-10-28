"use client";

import { WatchLessonButton } from "@/components/student/apostila/WatchLessonButton";
import { ProducerPortrait } from "@/components/ui/ProducerPortrait";

export function ManifestoPage({ onWatch, portrait }: { onWatch: () => void; portrait: string }) {
  return (
    <article>
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-sage">P0 · Abertura</p>
      <h2 className="mt-3 max-w-[11ch] font-serif text-[2.35rem] leading-[0.96] text-ink">
        A engenharia e a matemática da cor
      </h2>
      <div className="mt-5">
        <WatchLessonButton onClick={onWatch} />
      </div>
      <p className="mt-8 text-[1.2rem] leading-relaxed text-ink">
        Cor não é pressentimento. É relação, medida e escolha.
      </p>
      <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.75]">
        <p>
          Há uma distância entre cobrir um reflexo e saber de onde ele veio. No lavatório, o fio conta a verdade em
          tons: o fundo que sobe, o pigmento que falta, a abertura que passou do ponto.
        </p>
        <p>
          Esta apostila é a bancada em forma de leitura. Cada página entrega uma regra que cabe na mão, com o cabelo à
          frente. Sem chute, sem receita emprestada, sem medo de chumbar o loiro.
        </p>
      </div>
      <blockquote className="mt-8 pl-1 text-[1.15rem] leading-relaxed text-ink">
        A estrela organiza os opostos. O oxidante mede a abertura. O restante é critério.
      </blockquote>
      <footer className="mt-10 flex items-center gap-3">
        <span className="block h-11 w-11 overflow-hidden rounded-full shadow-card">
          <ProducerPortrait portrait={portrait} />
        </span>
        <span>
          <span className="block font-serif text-lg leading-none">Alaíde Proença</span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-ink-soft">Colorimetria</span>
        </span>
      </footer>
    </article>
  );
}
