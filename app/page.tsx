"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { HandoffStickyCta } from "@/components/home/HandoffStickyCta";
import { HomeFounderStage } from "@/components/home/HomeFounderStage";
import { SnapRail } from "@/components/home/SnapRail";
import { SNAP_CARD, SNAP_SLIDE } from "@/components/home/snapClasses";
import {
  Award,
  BookOpen,
  Check,
  Clock,
  Dna,
  Fingerprint,
  FlaskConical,
  Lock,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { asset } from "@/lib/asset";
import { alaideWhatsAppUrl } from "@/lib/tenant";

const WHATSAPP_VAGA_URL = alaideWhatsAppUrl("vaga");
const WHATSAPP_ALAIDE_URL = alaideWhatsAppUrl("fala");

const SILVER_GLASS =
  "relative overflow-hidden bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] text-white";

const CTA_FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pearl";

const SHELL = "mx-auto w-full max-w-[1440px]";
const SECTION_X = "px-5 md:px-8 lg:px-12";
const SECTION_Y = "pb-[clamp(4rem,8vw,8rem)]";

const PASSPORT_DELIVERABLES = [
  {
    icon: Clock,
    title: "10h de Imersão Hands-On",
    description: "Prática rigorosa sob supervisão.",
  },
  {
    icon: BookOpen,
    title: "Apostila Física Arquitetura do Fio",
    description: "O manual de bancada.",
  },
  {
    icon: Fingerprint,
    title: "Acervo Digital Vitalício",
    description: "Acesso imediato à sua credencial.",
  },
  {
    icon: Award,
    title: "Certificação Masterglass",
    description: "O selo de elite no mercado.",
  },
] as const;

const IMMERSION_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
    alt: "Lavatório e produtos em salão de luxo",
  },
  {
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
    alt: "Textura de cabelo loiro",
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop",
    alt: "Ferramentas e ambiente de salão",
  },
] as const;

const ACERVO = [
  {
    id: "01",
    kicker: "Diagnóstico",
    title: "Arquitetura do Fio",
    benefit: "Lê a biologia antes de descolorir. Sem corte químico.",
    icon: BookOpen,
  },
  {
    id: "03",
    kicker: "Oxidantes",
    title: "Química de Fixação",
    benefit: "Volumagem certa: cor que não desbota no lavatório.",
    icon: FlaskConical,
  },
] as const;

const TESTIMONIALS = [
  {
    quote: "O fundo de clareamento me obedece. Parei de tremer na descoloração.",
    name: "Mariana S.",
    role: "Colorista",
  },
  {
    quote: "Parei de comprar receitinhas. Agora eu formulo.",
    name: "Camila T.",
    role: "Especialista em Loiros",
  },
  {
    quote: "Neutralização no reflexo, sem chute. A bancada ficou previsível.",
    name: "Letícia R.",
    role: "Colorista",
  },
  {
    quote: "O método mudou o valor da minha cadeira. Matemática, não sorte.",
    name: "Patrícia M.",
    role: "Correção de Cor",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Preciso ter muita experiência em colorimetria?",
    answer:
      "O método Masterglass constrói o conhecimento desde a base da estrutura do fio até a matemática avançada de neutralização. Perfeito para quem quer corrigir seus vícios técnicos ou começar do zero com o padrão correto.",
  },
  {
    question: "Onde e quando é o módulo de Colorimetria?",
    answer:
      "O módulo presencial é dia 22 de Novembro. O local e a logística chegam com a credencial depois que a Alaíde confirma a sua vaga.",
  },
  {
    question: "Terei acesso ao Acervo Digital?",
    answer:
      "Sim. Quem entra no módulo de Colorimetria ganha acesso vitalício ao acervo no portal MASTERGLASS, para consultar na bancada.",
  },
] as const;

const MENTOR_POINTS = [
  "Criadora do Método Masterglass",
  "Especialista em Correção de Cor",
  "Mentora de Profissionais de Elite",
] as const;

const ADMISSION_STEPS = [
  "Chame a Alaíde no WhatsApp e conte o seu nível na bancada.",
  "Aprovação de vaga e alinhamento de nível.",
  "Recebimento do passaporte presencial e liberação do Acervo.",
] as const;

/** Hexagrama 200²: laranja no vértice superior esquerdo, azul no oposto. */
const OSWALD_UP = "100,20 169.28,140 30.72,140";
const OSWALD_DOWN = "100,180 30.72,60 169.28,60";
const OSWALD_ORANGE = { x: 30.72, y: 60 };
const OSWALD_BLUE = { x: 169.28, y: 140 };

function OswaldLab() {
  const [isNeutralized, setIsNeutralized] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsNeutralized(true)}
      aria-pressed={isNeutralized}
      aria-label={
        isNeutralized
          ? "Neutralização exata: laranja anulado pelo azul"
          : "O pesadelo: fundo laranja. Toque para aplicar a matemática"
      }
      className={`relative flex aspect-square w-full cursor-pointer touch-manipulation select-none flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-zinc-950 transition-transform duration-200 active:scale-[0.98] md:aspect-video ${CTA_FOCUS}`}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-[78%] w-[78%] max-h-[28rem] max-w-[28rem] transition-all duration-700 ease-in-out"
        fill="none"
        aria-hidden
      >
        <polygon
          points={OSWALD_UP}
          className={`transition-all duration-700 ease-in-out ${isNeutralized ? "stroke-white/35" : "stroke-white/20"}`}
          strokeWidth="1.2"
        />
        <polygon
          points={OSWALD_DOWN}
          className={`transition-all duration-700 ease-in-out ${isNeutralized ? "stroke-white/35" : "stroke-white/20"}`}
          strokeWidth="1.2"
        />
        <circle
          cx={OSWALD_ORANGE.x}
          cy={OSWALD_ORANGE.y}
          r={isNeutralized ? 3.2 : 5.5}
          className={`origin-center transition-all duration-700 ease-in-out ${
            isNeutralized
              ? "fill-orange-400/40"
              : "fill-orange-400 animate-pulse shadow-orange-500/50 motion-reduce:animate-none"
          }`}
        />
        <circle
          cx={OSWALD_BLUE.x}
          cy={OSWALD_BLUE.y}
          r={isNeutralized ? 5.5 : 2.4}
          className={`transition-all duration-700 ease-in-out ${
            isNeutralized ? "fill-blue-400" : "fill-white/25"
          }`}
        />
        <g className="mix-blend-screen">
          <line
            x1={OSWALD_ORANGE.x}
            y1={OSWALD_ORANGE.y}
            x2={OSWALD_BLUE.x}
            y2={OSWALD_BLUE.y}
            className={`stroke-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.8)] transition-all duration-700 ease-in-out ${
              isNeutralized ? "opacity-100" : "opacity-0"
            }`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8">
        <p
          className={`max-w-[14rem] text-center font-serif text-[15px] leading-snug text-pearl transition-all duration-700 ease-in-out md:text-lg ${
            isNeutralized ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          O Pesadelo: Fundo Laranja
        </p>
        <p
          className={`absolute max-w-[16rem] text-center font-serif text-[15px] leading-snug text-pearl transition-all duration-700 ease-in-out md:text-lg ${
            isNeutralized ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          }`}
        >
          Neutralização Exata: Laranja anulado pelo Azul.
        </p>
      </div>

      <span
        className={`absolute top-6 left-1/2 w-[min(90%,20rem)] -translate-x-1/2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 transition-all duration-700 ease-in-out ${
          isNeutralized ? "pointer-events-none opacity-0" : "animate-pulse motion-reduce:animate-none"
        }`}
      >
        Toque para Aplicar a Matemática
      </span>
    </button>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400/90 text-amber-400/90" strokeWidth={0} aria-hidden />
      ))}
    </div>
  );
}

export default function MasterglassVitrinePage() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("vitrine-native");
    return () => root.classList.remove("vitrine-native");
  }, []);

  return (
    <div className="min-h-dvh overscroll-none bg-zinc-950 text-pearl scheme-dark selection:bg-white/20 selection:text-pearl">
      <a
        href="#vitrine-hero"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-950 ${CTA_FOCUS}`}
      >
        Ir ao conteúdo
      </a>
      <header
        className="fixed top-0 z-50 w-full border-b border-white/5 bg-zinc-950/50 backdrop-blur-md pt-[env(safe-area-inset-top)]"
      >
        <div className={`${SHELL} flex items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-12`}>
          <Link
            href="/"
            className={`min-w-0 ${CTA_FOCUS}`}
            aria-label="MASTERGLASS Colorimetria — início"
          >
            <span className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <span className="text-xs tracking-[0.22em] text-white sm:tracking-[0.3em]">MASTERGLASS</span>
              <span className="text-xs text-white/20" aria-hidden>
                |
              </span>
              <span className="truncate text-[9px] tracking-widest text-pearl/70">COLORIMETRIA</span>
            </span>
          </Link>
          <Link
            href="/aluna/login"
            className={`flex min-h-[32px] shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-white/50 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white sm:px-3 ${CTA_FOCUS}`}
          >
            <Lock size={12} strokeWidth={1.75} aria-hidden />
            <span className="text-[10px] font-medium tracking-wide">Espaço da Aluna</span>
          </Link>
        </div>
      </header>

      <main className="relative z-0 w-full pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
        <section id="vitrine-hero" className="relative isolate min-h-[100dvh] overflow-hidden bg-zinc-950">
          <HomeFounderStage />
          <div className="relative z-10 grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-end px-5 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))] md:px-8 md:pb-24 lg:justify-center lg:pb-24 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:pr-10">
              <div className="w-full max-w-xl">
                <p className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
                  <Dna className="size-3 shrink-0 text-pearl" strokeWidth={1.75} aria-hidden />
                  <span className="text-[9px] font-medium uppercase leading-snug tracking-widest text-white/80">
                    Módulo especialista: Colorimetria & Tricologia
                  </span>
                </p>
                <h1 className="mb-4 font-serif text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.08] text-pearl">
                  Previsibilidade Absoluta. O Fim do Achismo na Sua Bancada.
                </h1>
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  Este é o módulo de Colorimetria: a ciência exata para fundos de clareamento perfeitos e
                  neutralizações impecáveis. Presencial, com o acervo digital na bancada.
                </p>

                <div
                  className="masterglass-silver-glass mt-8 inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2.5 text-[11px] leading-none text-white/75"
                  role="status"
                  aria-label="Status de admissão"
                >
                  <span className="relative flex size-2 shrink-0" aria-hidden>
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="truncate">Módulo Colorimetria: 22/Nov • 8/10 vagas</span>
                </div>

                <a
                  href={WHATSAPP_VAGA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex min-h-12 w-full max-w-md items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-zinc-950 transition hover:bg-pearl sm:w-auto ${CTA_FOCUS}`}
                >
                  Garantir minha vaga
                </a>
              </div>
            </div>
            <div className="hidden min-h-0 lg:block" aria-hidden />
          </div>
        </section>

        <section className={`${SECTION_X} py-[clamp(2.5rem,5vw,5rem)]`}>
          <p className="mx-auto max-w-3xl text-center font-serif text-[clamp(1.15rem,2.4vw,1.75rem)] leading-relaxed text-white/80">
            Você não precisa de mais &apos;receitinhas&apos;. Você precisa de matemática química. O método Masterglass é
            a diferença entre contar com a sorte e comandar a química sem medo do lavatório.
          </p>
        </section>

        <section className={`${SECTION_X} ${SECTION_Y}`}>
          <div className={SHELL}>
            <h2 className="font-serif text-xl font-medium text-pearl md:text-2xl">O Acervo Digital</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              Do diagnóstico ao oxidante. No centro, a matemática que mata o reflexo.
            </p>
            <ul className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5">
              {ACERVO.map((item) => (
                <li
                  key={item.id}
                  className="masterglass-silver-glass flex w-full min-w-0 flex-col gap-3 rounded-2xl p-5 text-pearl lg:gap-5 lg:p-6"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-serif text-3xl leading-none text-white/35">{item.id}</span>
                    <item.icon className="size-5 text-white/45" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">{item.kicker}</p>
                    <p className="mt-1 font-serif text-xl leading-snug text-pearl">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{item.benefit}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
              Laboratório · Estrela de Oswald
            </p>
            <div className="mt-4">
              <OswaldLab />
            </div>
          </div>
        </section>

        <section className={`${SECTION_X} ${SECTION_Y}`}>
          <div className={SHELL}>
            <div className={`${SILVER_GLASS} rounded-3xl p-8 text-pearl md:p-12`}>
              <h2 className="mb-8 text-center font-serif text-3xl font-medium text-pearl">
                O Seu Passaporte Presencial
              </h2>
              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {PASSPORT_DELIVERABLES.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex gap-4">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5"
                      aria-hidden
                    >
                      <Icon className="size-5 text-white/70" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-serif text-lg leading-snug text-pearl">{title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={SECTION_Y}>
          <div className={`${SHELL} ${SECTION_X}`}>
            <h2 className="font-serif text-2xl font-medium text-pearl md:text-3xl">O Módulo de Colorimetria</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
              Não é aula assistida. É Colorimetria na bancada, sob a supervisão da Alaíde.
            </p>
          </div>
          <div className="mt-8">
            <SnapRail ariaLabel="Fotos do módulo presencial de Colorimetria" count={IMMERSION_IMAGES.length}>
              {IMMERSION_IMAGES.map(({ src, alt }) => (
                <li
                  key={src}
                  className={`relative aspect-video overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 ${SNAP_CARD}`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 85vw"
                    className="object-cover opacity-80"
                  />
                </li>
              ))}
            </SnapRail>
          </div>
        </section>

        <section className={SECTION_Y}>
          <div className={`${SHELL} ${SECTION_X}`}>
            <h2 className="font-serif text-2xl font-medium text-pearl">O Padrão Masterglass</h2>
          </div>
          <div className="mt-8">
            <SnapRail ariaLabel="Depoimentos de coloristas" count={TESTIMONIALS.length} keepRail>
              {TESTIMONIALS.map(({ quote, name, role }) => (
                <li
                  key={name}
                  className={`masterglass-silver-glass flex flex-col gap-4 rounded-2xl p-6 text-pearl ${SNAP_SLIDE}`}
                >
                  <StarRow />
                  <blockquote className="font-serif text-[15px] leading-snug text-white/85">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <p className="mt-auto text-sm text-white/55">
                    <span className="font-medium text-pearl/90">{name}</span>
                    <span className="text-white/40"> · </span>
                    {role}
                  </p>
                </li>
              ))}
            </SnapRail>
          </div>
        </section>

        <section className={`${SECTION_X} ${SECTION_Y}`}>
          <div className={`${SHELL} relative mx-auto max-w-lg`}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-zinc-900">
              <Image
                src={asset("/images/alaide-bg.jpg")}
                alt="Alaíde Proença"
                fill
                unoptimized
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover object-[center_12%]"
              />
            </div>
            <div className="masterglass-silver-glass relative z-10 mx-4 -mt-14 rounded-2xl p-6 text-pearl sm:mx-6 sm:-mt-16 lg:p-8">
              <h2 className="font-serif text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-none text-pearl">
                Alaíde Proença
              </h2>
              <ul className="mt-5 space-y-2.5">
                {MENTOR_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white/75">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`${SECTION_X} ${SECTION_Y}`}>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-2xl font-medium text-pearl">Dúvidas Frequentes</h2>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {FAQ_ITEMS.map(({ question, answer }) => (
                <details key={question} className="group">
                  <summary
                    className="flex min-h-[44px] cursor-pointer list-none items-start py-4 pr-2 text-left text-sm font-medium leading-snug text-pearl/95 transition hover:text-pearl md:text-base [&::-webkit-details-marker]:hidden"
                  >
                    <span className="flex w-full items-start justify-between gap-4">
                      {question}
                      <span
                        className="shrink-0 text-lg font-light text-white/35 transition group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-white/65 md:text-base">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${SECTION_X} ${SECTION_Y}`}>
          <div className={`${SHELL} grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8`}>
            <article className={`${SILVER_GLASS} rounded-3xl p-8 text-pearl md:p-12`}>
              <Check className="size-6 text-emerald-400" strokeWidth={1.75} aria-hidden />
              <h2 className="mt-5 font-serif text-2xl font-medium text-pearl">Para Quem É</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                Para coloristas que querem dominar a matemática química, corrigir erros com segurança e elevar o valor
                da sua cadeira parando de ter medo do lavatório.
              </p>
            </article>
            <article
              className="rounded-3xl border border-white/5 bg-black/40 p-8 text-white/50 backdrop-blur-md"
            >
              <X className="size-6 text-red-400/65" strokeWidth={1.75} aria-hidden />
              <h2 className="mt-5 font-serif text-2xl font-medium text-white/60">Para Quem Não É</h2>
              <p className="mt-4 text-sm leading-relaxed md:text-base">
                Para quem busca receitinhas prontas, quer atalhos sem estudar a biologia do fio ou não está disposta a
                executar a técnica na prática.
              </p>
            </article>
          </div>
        </section>

        <section className={`${SECTION_X} ${SECTION_Y}`}>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-2xl font-medium text-pearl md:text-3xl">Como garantir sua vaga</h2>
            <ol className="mt-10 space-y-8 border-l border-white/20 pl-6">
              {ADMISSION_STEPS.map((step, index) => (
                <li key={step} className="relative text-sm leading-relaxed text-white/75 md:text-base">
                  <span
                    className="absolute -left-[1.6rem] top-1 flex size-5 items-center justify-center rounded-full border border-white/20 bg-zinc-900 text-[10px] text-white/50"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <footer
          className={`border-t border-white/5 ${SECTION_X} pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-[clamp(3rem,6vw,5rem)]`}
        >
          <div className={`${SHELL} flex flex-col gap-10 md:flex-row md:items-end md:justify-between`}>
            <div>
              <p className="text-xs tracking-[0.28em] text-white">MASTERGLASS</p>
              <p className="mt-1 text-[10px] tracking-[0.22em] text-pearl/55">COLORIMETRIA</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
                Módulo presencial com a Alaíde Proença. 22 de novembro.
              </p>
            </div>
            <nav className="flex flex-col gap-3 text-sm" aria-label="Rodapé">
              <a
                href={WHATSAPP_ALAIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/60 transition hover:text-pearl ${CTA_FOCUS}`}
              >
                Falar com a Alaíde
              </a>
              <Link href="/aluna/login" className={`text-white/60 transition hover:text-pearl ${CTA_FOCUS}`}>
                Espaço da Aluna
              </Link>
            </nav>
          </div>
          <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">Powered by GL PRO</p>
        </footer>
      </main>

      <HandoffStickyCta href={WHATSAPP_ALAIDE_URL} />
    </div>
  );
}
