"use client";

import { useRouter } from "next/navigation";
import { OswaldStar } from "@/components/student/apostila/OswaldStar";
import { Button } from "@/components/ui/Button";
import { READER_PAGE_KEY, LESSON_ENTRY_PAGE, apostilaPages, type PageId } from "@/lib/apostila";

// ─── Currículo de Colorimetria Magistral ───────────────────────────────────

type TrilhaCopy = {
  /** Rótulo da trilha exibido acima do título */
  label: string;
  /** Título serifado principal do card */
  session: string;
  /** Copy de benefício em neurovendas */
  benefit: string;
};

const trilhaCopy: Record<PageId, TrilhaCopy> = {
  abertura: {
    label: "Trilha 01 · Fundamentos",
    session: "Arquitetura do Fio e Fundo de Clareamento",
    benefit:
      "Entenda a matemática da descoloração e descubra onde 90% dos amadores destroem o cabelo antes mesmo de aplicar a cor.",
  },
  oswald: {
    label: "Trilha 02 · Neutralização",
    session: "Estrela de Oswald: A Bússola da Neutralização",
    benefit:
      "Domine a engenharia dos opostos. Elimine o chute, apague reflexos indesejados e crie o loiro espelhado que sua cliente exige.",
  },
  oxidantes: {
    label: "Trilha 03 · Química Capilar",
    session: "Química da Fixação e Oxidantes",
    benefit:
      "Volumagem não é intuição, é ciência. O cálculo exato para ancoragem de cor e durabilidade extrema.",
  },
};

// ─── Componente principal ──────────────────────────────────────────────────

export function LessonsPanel() {
  const router = useRouter();

  function openChapter(id: PageId) {
    // Grava o número da primeira página do capítulo correspondente
    window.sessionStorage.setItem(READER_PAGE_KEY, String(LESSON_ENTRY_PAGE[id]));
    router.push("/aluna/apostila");
  }

  return (
    <div>
      {/* Cabeçalho da seção */}
      <p className="text-[10px] uppercase tracking-[0.22em] text-sage">
        Colorimetria Magistral
      </p>
      <h1 className="mt-1 font-serif text-[2rem] leading-none text-ink">
        Trilhas de maestria
      </h1>
      <p className="mt-3 text-sm leading-6 text-ink-soft">
        Cada trilha entrega um protocolo do acervo técnico — do diagnóstico de
        fundo ao cálculo de oxidante. Avance na sequência e conquiste sua
        credencial de especialista Masterglass.
      </p>

      {/* Grade de trilhas */}
      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {apostilaPages.map((page) => {
          const copy = trilhaCopy[page.id];
          const isOswald = page.id === "oswald";

          return (
            <li
              key={page.id}
              className={[
                "rounded-3xl px-6 py-7 shadow-card transition-shadow duration-300 hover:shadow-float",
                // A Bento Box da Estrela é escura para maximizar contraste do placeholder
                isOswald
                  ? "bg-zinc-900 text-white"
                  : "bg-pearl text-ink",
              ].join(" ")}
            >
              {/* Numeração + duração */}
              <p
                className={[
                  "text-[10px] uppercase tracking-[0.16em]",
                  isOswald ? "text-white/40" : "text-ink-soft",
                ].join(" ")}
              >
                {copy.label} · {page.duration}
              </p>

              {/* Título serifado */}
              <h2
                className={[
                  "mt-1.5 font-serif text-[1.35rem] leading-snug",
                  isOswald ? "text-white" : "text-ink",
                ].join(" ")}
              >
                {copy.session}
              </h2>

              {/* Benefit copy */}
              <p
                className={[
                  "mt-2 text-sm leading-6",
                  isOswald ? "text-white/60" : "text-ink-soft",
                ].join(" ")}
              >
                {copy.benefit}
              </p>

              {/* Placeholder visual exclusivo da Estrela de Oswald */}
              {isOswald ? (
                <div className="mt-5 -mx-1">
                  <OswaldStar variant="glass" compact embedded />
                </div>
              ) : null}

              {/* CTA */}
              <Button
                variant="ghost"
                className={[
                  "mt-5 px-4 py-2.5 text-[12px]",
                  isOswald
                    ? "border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
                    : "",
                ].join(" ")}
                onClick={() => openChapter(page.id)}
              >
                Abrir protocolo no acervo
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
