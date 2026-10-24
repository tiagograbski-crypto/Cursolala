"use client";

import { WatchLessonButton } from "@/components/student/apostila/WatchLessonButton";
import { cn } from "@/lib/cn";

const volumes = [
  {
    vol: "10 vol",
    name: "Depósito",
    pips: 1,
    rule: "Se o fundo já está no tom, não peça abertura. Peça depósito.",
    body: "Abre pouco. Serve para tonalizar, devolver reflexo e trabalhar tom sobre tom sem deslocar o fundo.",
  },
  {
    vol: "20 vol",
    name: "Equilíbrio",
    pips: 2,
    rule: "Na dúvida entre abrir e respeitar o fio, comece no 20.",
    body: "A volumagem de bancada. Clareia cerca de um a dois tons e ainda deixa a nuance trabalhar.",
  },
  {
    vol: "30 vol",
    name: "Abertura",
    pips: 3,
    rule: "30 volumes não corrige diagnóstico frouxo. Leia o fio antes.",
    body: "Para fios resistentes, quando o fundo precisa subir mais. A elasticidade entra na decisão antes da mistura.",
  },
];

export function OxidantsPage({ onWatch }: { onWatch: () => void }) {
  return (
    <article>
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-sage">P2 · Bancada</p>
      <h2 className="mt-3 max-w-[11ch] font-serif text-[2.35rem] leading-[0.96] text-ink">Fórmulas e oxidantes</h2>
      <div className="mt-5">
        <WatchLessonButton onClick={onWatch} />
      </div>
      <p className="mt-7 text-[15px] leading-[1.75] text-ink/90">
        A volumagem mede a abertura. Não é um detalhe da embalagem: é a diferença entre depositar cor e pedir um fundo
        novo ao fio.
      </p>
      <div className="mt-8 space-y-7">
        {volumes.map((item) => (
          <article key={item.vol} className="relative rounded-[26px] bg-pearl px-6 pb-6 pt-8 shadow-card">
            <span className="absolute -top-3 right-5 rotate-2 rounded-full bg-sage px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-pearl shadow-float">
              Regra da Lala
            </span>
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="font-serif text-[2rem] leading-none text-ink">{item.vol}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink-soft">{item.name}</p>
              </div>
              <div className="flex gap-1.5 pb-1" aria-hidden>
                {Array.from({ length: 3 }).map((_, index) => (
                  <span
                    key={index}
                    className={cn("h-1 w-6 rounded-full", index < item.pips ? "bg-sage" : "bg-pearl-deep")}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 font-serif text-[1.35rem] leading-snug text-ink">{item.rule}</p>
            <p className="mt-3 text-[1.02rem] leading-7 text-ink">{item.body}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
