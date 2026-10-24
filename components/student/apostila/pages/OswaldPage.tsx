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
      <h2 className="mt-3 max-w-[10ch] font-serif text-[2.35rem] leading-[0.96] text-ink">Estrela de Oswald</h2>
      <div className="mt-5">
        <WatchLessonButton onClick={onWatch} />
      </div>
      <p className="mt-4 text-[1.02rem] leading-[1.75] text-ink">
        A estrela não decora a parede. Ela decide o que anula o quê. Primárias e secundárias se olham de frente, ligadas
        pelo tracejado: o reflexo que você não quer pede a cor que está do outro lado.
      </p>
      <div className="mt-3">
        <OswaldStar />
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
