"use client";

import { OswaldStar } from "@/components/student/apostila/OswaldStar";
import { WatchLessonButton } from "@/components/student/apostila/WatchLessonButton";

const steps = [
  "Identifique o reflexo que subiu no fio.",
  "Toque essa cor na estrela.",
  "A cor do outro lado é a que neutraliza.",
];

export function OswaldPage({ onWatch }: { onWatch: () => void }) {
  return (
    <article>
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-sage">P1 · Neutralização</p>
      <h2 className="mt-3 max-w-[12ch] font-serif text-[2.35rem] leading-[0.96] text-ink">
        Estrela Ala
      </h2>
      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">Método Oswald · neutralização</p>
      <div className="mt-5">
        <WatchLessonButton onClick={onWatch} />
      </div>
      <p className="mt-4 text-[1.02rem] leading-[1.75] text-ink">
        A Estrela Ala não decora a parede — ela decide o que anula o quê. Primárias e secundárias se olham de frente; o
        tracejado liga triângulos complementares. O reflexo que subiu no fio aponta para a cor do outro lado da linha.
      </p>
      <div className="mt-5">
        <OswaldStar variant="glass" />
      </div>
      <ol className="mt-7 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-6 text-ink">
            <span className="font-serif text-xl leading-none text-sage">{index + 1}</span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
