import Image from "next/image";
import Link from "next/link";
import { HandoffStickyCta } from "@/components/home/HandoffStickyCta";
import { HomeFounderStage } from "@/components/home/HomeFounderStage";
import { SNAP_CARD, SnapRail } from "@/components/home/SnapRail";
import {
  Award,
  BookOpen,
  Check,
  Clock,
  Dna,
  Fingerprint,
  FlaskConical,
  Lock,
  Sigma,
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
    label: "Módulo I",
    title: "Diagnóstico e Arquitetura do Fio: A biologia da descoloração segura sem corte químico.",
    icon: BookOpen,
  },
  {
    label: "Módulo II",
    title: "A Matemática da Neutralização: Decodificando a Estrela de Oswald.",
    icon: Sigma,
  },
  {
    label: "Módulo III",
    title: "Química de Fixação: Oxidantes para cores à prova de desbotamento.",
    icon: FlaskConical,
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Eu tremia na hora de descolorir um cabelo fino. Hoje, o fundo de clareamento me obedece. O método mudou a lucratividade da minha cadeira.",
    name: "Mariana S.",
    role: "Colorista",
  },
  {
    quote:
      "Não é um curso, é uma formação de caráter químico. Parei de comprar 'receitinhas' e comecei a formular com segurança absoluta.",
    name: "Camila T.",
    role: "Especialista em Loiros",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Preciso ter muita experiência em colorimetria?",
    answer:
      "O método Masterglass constrói o conhecimento desde a base da estrutura do fio até a matemática avançada de neutralização. Perfeito para quem quer corrigir seus vícios técnicos ou começar do zero com o padrão correto.",
  },
  {
    question: "Onde e quando será a imersão?",
    answer:
      "A imersão será dia 22 de Novembro. O local exato e a logística completa chegam com a credencial depois que a Alaíde confirma a sua vaga.",
  },
  {
    question: "Terei acesso ao Acervo Digital?",
    answer:
      "Sim. Todas as profissionais admitidas na imersão presencial ganham acesso vitalício à sua licença no portal MASTERGLASS para consultas na bancada.",
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
  return (
    <div className="min-h-dvh bg-zinc-950 text-pearl scheme-dark selection:bg-white/20 selection:text-pearl">
      <a
        href="#vitrine-hero"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-950 ${CTA_FOCUS}`}
      >
        Ir ao conteúdo
      </a>
      <header
        className="fixed top-0 z-50 w-full border-b border-white/5 bg-zinc-950/50 backdrop-blur-md pt-[env(safe-area-inset-top)]"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-12">
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
        <section id="vitrine-hero" className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-zinc-950">
          <HomeFounderStage />
          <div
            className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-5 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))] md:px-8 md:pb-24"
          >
            <div className="w-full max-w-xl">
              <p className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
                <Dna className="size-3 shrink-0 text-pearl" strokeWidth={1.75} aria-hidden />
                <span className="text-[9px] font-medium uppercase leading-snug tracking-widest text-white/80">
                  Módulo especialista: Colorimetria & Tricologia
                </span>
              </p>
              <h1 className="mb-4 font-serif text-3xl font-medium leading-[1.12] text-pearl md:text-5xl">
                Previsibilidade Absoluta. O Fim do Achismo na Sua Bancada.
              </h1>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                A ciência exata para revelar fundos de clareamento perfeitos e neutralizações impecáveis. Uma imersão
                presencial em Colorimetria Avançada, ancorada pelo acervo digital mais cobiçado do mercado.
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
                <span className="truncate">Próxima Imersão: 22/Nov • 8/10 Credenciais</span>
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
        </section>

        <section className="px-5 py-8 md:px-8 md:py-10">
          <p className="mx-auto max-w-3xl text-center font-serif text-lg leading-relaxed text-white/80 md:text-2xl">
            Você não precisa de mais &apos;receitinhas&apos;. Você precisa de matemática química. O método Masterglass é
            a diferença entre contar com a sorte e comandar a química sem medo do lavatório.
          </p>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="font-serif text-xl font-medium text-pearl md:text-2xl">O Acervo Digital</h2>
          </div>
          <div className="mt-8">
            <SnapRail ariaLabel="Módulos do acervo digital" count={ACERVO.length}>
              {ACERVO.map(({ label, title, icon: Icon }) => (
                <li
                  key={label}
                  className={`masterglass-silver-glass flex min-h-[11.5rem] flex-col gap-5 rounded-2xl p-6 text-pearl ${SNAP_CARD}`}
                >
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/40">{label}</span>
                  <Icon className="size-5 text-white/45" strokeWidth={1.5} aria-hidden />
                  <p className="font-serif text-base leading-snug text-pearl/95 md:text-lg">{title}</p>
                </li>
              ))}
            </SnapRail>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto max-w-4xl">
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

        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="font-serif text-2xl font-medium text-pearl md:text-3xl">A Imersão Masterglass</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
              Uma experiência hands-on. Não é sobre assistir, é sobre executar sob a supervisão do mestre.
            </p>
          </div>
          <div className="mt-8">
            <SnapRail ariaLabel="Fotos da imersão presencial" count={IMMERSION_IMAGES.length}>
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

        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="font-serif text-2xl font-medium text-pearl">O Padrão Masterglass</h2>
          </div>
          <div className="mt-8">
            <SnapRail ariaLabel="Depoimentos de coloristas" count={TESTIMONIALS.length} columnsMd={2}>
              {TESTIMONIALS.map(({ quote, name, role }) => (
                <li
                  key={name}
                  className={`masterglass-silver-glass flex min-h-[16rem] flex-col gap-6 rounded-2xl p-8 text-pearl ${SNAP_CARD}`}
                >
                  <StarRow />
                  <blockquote className="font-serif text-base leading-relaxed text-white/85 md:text-lg">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <footer className="mt-auto text-sm text-white/55">
                    <span className="font-medium text-pearl/90">{name}</span>
                    <span className="text-white/40"> · </span>
                    {role}
                  </footer>
                </li>
              ))}
            </SnapRail>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8 md:pb-24">
          <div className="relative mx-auto max-w-6xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-zinc-900">
              <Image
                src={asset("/images/alaide-bg.jpg")}
                alt="Alaíde Proença"
                fill
                unoptimized
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="masterglass-silver-glass relative z-10 mx-3 -mt-12 rounded-2xl p-6 text-pearl md:mx-8 md:p-8">
              <h2 className="font-serif text-3xl font-medium text-pearl md:text-4xl">Alaíde Proença</h2>
              <ul className="mt-5 space-y-3">
                {MENTOR_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white/75 md:text-base">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8 md:pb-24">
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

        <section className="px-5 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
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

        <section className="px-5 pb-16 md:px-8 md:pb-24">
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

        <footer className="border-t border-white/5 px-5 py-16 md:px-8">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/30">Powered by GL PRO</p>
          <p className="mt-6 text-center">
            <Link
              href="/aluna/login"
              className={`inline-flex min-h-11 items-center text-[11px] tracking-wide text-white/35 transition hover:text-white/60 ${CTA_FOCUS}`}
            >
              Acesso de Alunas
            </Link>
          </p>
        </footer>
      </main>

      <HandoffStickyCta href={WHATSAPP_ALAIDE_URL} />
    </div>
  );
}
