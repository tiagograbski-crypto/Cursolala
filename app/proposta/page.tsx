"use client";

import { Check, ShieldCheck } from "lucide-react";
import { useCallback, useState } from "react";

const CTA_FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pearl";

const GLASS_CARD =
  "rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8";

function proposalAcceptWhatsAppUrl() {
  const text =
    "Olá, equipe GL PRO. Sou Alaíde Proença (Masterglass). Li e aprovo integralmente o Acordo de Licenciamento Tecnológico Masterglass x GL PRO, incluindo o Setup de R$ 3.800,00 e os termos de responsabilidade e LGPD. Autorizo o início da implantação da plataforma.";
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export default function PropostaParceriaPage() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = useCallback(() => {
    setAccepted(true);
    window.open(proposalAcceptWhatsAppUrl(), "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="min-h-dvh bg-zinc-950 text-pearl scheme-dark selection:bg-white/20 selection:text-pearl">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.08),transparent)]"
        aria-hidden
      />

      <main className="relative mx-auto w-full max-w-3xl px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(3rem,env(safe-area-inset-top))] sm:px-8 sm:pb-16 sm:pt-20">
        <header className="border-b border-white/10 pb-10 text-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">
            Proposta de Parceria
          </p>
          <h1 className="mt-4 font-serif text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-tight tracking-tight text-pearl">
            Acordo de Licenciamento Tecnológico
          </h1>
          <p className="mt-3 font-sans text-sm font-light tracking-wide text-white/60">
            Masterglass x GL PRO
          </p>
        </header>

        <article className="mt-12 space-y-12 font-sans text-[clamp(0.9375rem,2.2vw,1.0625rem)] leading-relaxed text-white/85">
          <section>
            <h2 className="mb-4 font-serif text-lg font-medium text-pearl">O Escopo</h2>
            <p className="text-white/75">
              Este documento formaliza a entrega de uma Plataforma Proprietária (SaaS Single-Tenant),
              desenvolvida com arquitetura mobile-first, animações nativas e infraestrutura de banco de
              dados. Um ativo digital avaliado em mais de R$ 35.000 no mercado de tecnologia, projetado
              exclusivamente para a escalabilidade da marca Masterglass.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-lg font-medium text-pearl">O Investimento</h2>
            <div className={`${GLASS_CARD} ring-1 ring-white/5`}>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                Setup de Ativação
              </p>
              <p className="mt-3 font-serif text-[clamp(2rem,6vw,2.75rem)] font-semibold tabular-nums text-pearl">
                R$ 3.800,00
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Taxa única de arquitetura, design e entrega das chaves da plataforma. O código-fonte e o
                motor tecnológico permanecem como propriedade intelectual da GL PRO, sendo licenciados
                para uso exclusivo da Masterglass.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-lg font-medium text-pearl">
              Infraestrutura e Incentivo de Lançamento
            </h2>
            <div className={GLASS_CARD}>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                Licenciamento e Cloud
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Para apoiar a tração inicial da mentoria, a GL PRO isentará a taxa de infraestrutura, banco
                de dados e manutenção de servidores pelos primeiros 90 dias (3 meses de cortesia). Após este
                período, a manutenção do ecossistema terá um custo fixo de R$ 149,00 mensais (ou R$ 49 por
                aluna, o que for acordado).
              </p>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center gap-2.5">
              <ShieldCheck className="size-5 shrink-0 text-white/50" strokeWidth={1.5} aria-hidden />
              <h2 className="font-serif text-lg font-medium text-pearl">
                Termos de Responsabilidade e LGPD
              </h2>
            </div>
            <div className={`${GLASS_CARD} space-y-6 text-sm text-zinc-400`}>
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  Responsabilidade GL PRO
                </p>
                <p className="leading-relaxed">
                  Garantir a estabilidade técnica da plataforma (99.9% Uptime), manutenção do servidor e
                  proteção criptografada dos dados das alunas conforme a LGPD (Lei Geral de Proteção de
                  Dados).
                </p>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  Responsabilidade Masterglass
                </p>
                <p className="leading-relaxed">
                  A GL PRO atua estritamente como provedora de infraestrutura de software. A Masterglass
                  (Alaíde Proença) detém 100% da propriedade e responsabilidade civil, criminal e técnica
                  sobre o conteúdo gravado, os métodos ensinados (física/química capilar), procedimentos
                  realizados em alunas ou clientes, e transações financeiras oriundas das vendas.
                </p>
              </div>
            </div>
          </section>
        </article>

        <footer className="mt-14 border-t border-white/10 pt-10">
          <p className="mb-6 text-center text-xs leading-relaxed text-white/40">
            Ao aprovar, você confirma a leitura integral deste acordo e autoriza o início da implantação
            técnica da plataforma licenciada.
          </p>
          <button
            type="button"
            onClick={handleAccept}
            disabled={accepted}
            className={`mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition disabled:cursor-default sm:w-auto ${
              accepted
                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200/90"
                : `bg-white text-zinc-950 hover:bg-pearl ${CTA_FOCUS}`
            }`}
          >
            {accepted ? (
              <>
                <Check className="size-4" strokeWidth={2} aria-hidden />
                Aceite enviado — implantação autorizada
              </>
            ) : (
              "Aprovar e Iniciar Implantação"
            )}
          </button>
          <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-white/25">
            Powered by GL PRO
          </p>
        </footer>
      </main>
    </div>
  );
}
