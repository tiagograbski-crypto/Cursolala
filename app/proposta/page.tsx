"use client";

import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  Check,
  Database,
  Fingerprint,
  Globe,
  Layers,
  LogOut,
  Scale,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useState, type ReactNode } from "react";

/** Template reutilizável — altere apenas este objeto para novos clientes GL.ID. */
const contractData = {
  licensor: "GL.ID",
  licensorWebsite: "https://glid.ia.br",
  clientBrand: "Masterglass",
  clientSignatory: "Alaíde Proença",
  projectName: "Plataforma Proprietária de Alta Conversão",
  courtesyDays: 30,
  secondInstallmentDays: 30,
  deliveryBusinessDaysMin: 30,
  deliveryBusinessDaysMax: 45,
  domainExample: "suamarca.com.br",
  partnerListCents: 699_700,
  partnerSetupCents: 409_700,
  whiteLabelListCents: 1_799_700,
  whiteLabelCents: 1_199_700,
  tiers: [
    { id: "starter", name: "Starter", volume: "Até 10 alunas ativas", monthlyCents: 9_700 },
    { id: "growth", name: "Growth", volume: "De 11 a 50 alunas", monthlyCents: 19_700 },
    { id: "elite", name: "Elite", volume: "Acima de 50 alunas", monthlyCents: 29_700 },
  ],
  architectCredit: "Tiago Grabski / GL.ID (Glide)",
  stack: "Next.js / Edge Computing / Serverless DB",
} as const;

type Plano = "A" | "B";

const FORM_ACCEPT_LABEL = "Declaro ter lido e estar de pleno acordo com os termos deste contrato.";

const SHEET =
  "rounded-xl bg-[#FDFBF7] p-6 text-zinc-800 shadow-2xl shadow-black/40 sm:p-10 md:p-12";
const PANEL = "rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-6";
const H2 = "font-serif text-xl font-semibold leading-snug text-zinc-900";
const BODY = "text-sm leading-relaxed text-pretty text-zinc-700";
const LABEL = "text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500";
const INPUT =
  "mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#4A5D23] focus:outline-none focus:ring-2 focus:ring-[#4A5D23]/20 disabled:bg-zinc-50";
const CTA_FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A5D23]";
const BTN_SIGN =
  "bg-[#4A5D23] font-bold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40";

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatAcceptTimestamp(date: Date) {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function buildAcceptWhatsAppUrl(payload: {
  legalName: string;
  taxId: string;
  email: string;
  acceptedAt: string;
  plano: Plano;
}) {
  const half = formatBRL(contractData.partnerSetupCents / 2);
  const pathLine =
    payload.plano === "A"
      ? [
          "Plano contratado: A — Ecossistema GL.ID",
          `Setup: ${formatBRL(contractData.partnerSetupCents)}`,
          `Pagamento: 50% no start (${half}) e 50% na entrega (${half}), em até ${contractData.secondInstallmentDays} dias.`,
          "Propriedade: licença de uso pessoal e intransferível. Vedadas engenharia reversa, cópia de fluxo e extração do código-fonte. Conteúdo da cliente.",
          "Rescisão: exportação em CSV. Vedada extração do código, do painel e da arquitetura. Dados excluídos em 30 dias após o cancelamento ou em 60 dias de atraso.",
          `Cloud: ${contractData.courtesyDays} dias de cortesia; depois, Starter, Growth ou Elite.`,
        ]
      : [
          "Plano contratado: B — Independência Total",
          `Compra: ${formatBRL(contractData.whiteLabelCents)}`,
          "Pagamento: entrada + parcelamento a combinar.",
          "Propriedade: código final as is, sem mensalidade e sem suporte gratuito. Bibliotecas-base, motores de banco e componentes reutilizáveis permanecem da GL.ID. Vedada revenda como SaaS.",
          "Entrega: repositório as is após a quitação. Encerram-se suporte, correção e manutenção gratuita.",
          "Cloud: isenção de mensalidade GL.ID. Provedores por conta da cliente.",
        ];

  const text = [
    `Assinatura eletrônica — ${contractData.clientBrand} x ${contractData.licensor}`,
    `Nome/Razão: ${payload.legalName}`,
    `CPF/CNPJ: ${payload.taxId}`,
    `E-mail: ${payload.email}`,
    `Data/hora aceite: ${payload.acceptedAt}`,
    ...pathLine,
    "Natureza: relação B2B. Passivo restrito à pessoa jurídica da GL.ID. Sócios e Tiago isentos.",
    "Declaro ter lido e estar de pleno acordo com os termos do plano escolhido.",
  ].join("\n");

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

const UNIVERSAL_CLAUSES = [
  {
    id: "domain",
    title: "Domínio",
    icon: Globe,
    paragraphs: [
      `Independência total. A plataforma roda em domínio próprio da cliente (exemplo: ${contractData.domainExample}). Aquisição e renovação anual têm custo variável e são pagas por ela, direto ao órgão registrador.`,
    ],
  },
  {
    id: "sla",
    title: "Prazos de Engenharia (SLA)",
    icon: CalendarClock,
    paragraphs: [
      `${contractData.deliveryBusinessDaysMin} a ${contractData.deliveryBusinessDaysMax} dias úteis, contados da compensação da entrada.`,
    ],
  },
  {
    id: "scope",
    title: "Limites de Escopo e Expansão de Infoprodutos",
    icon: Layers,
    paragraphs: [
      "Escopo fechado. O valor do Setup e o escopo da plataforma cobrem a estruturação, o design e a entrega de 1 (um) único curso ou formação principal. Esse pagamento não cobre trabalho ilimitado de novos produtos.",
      "Taxa de expansão. A criação de novos cursos independentes, a adição de esteiras paralelas de infoprodutos (novos grandes módulos isolados, com identidade própria) ou a montagem de novas vitrines de vendas dentro da plataforma exigem um novo orçamento de Setup de Expansão.",
      "Atualizações regulares. A Contratante pode adicionar aulas de atualização e módulos complementares que pertençam exclusivamente ao curso original, pelo painel administrativo, sem novo Setup.",
      "Painel self-service e hora técnica. O gerenciamento de vídeos, alunos e textos é obrigação da Contratante pelo painel administrativo. Alteração estrutural, de design ou inserção manual de conteúdo pela equipe da GL.ID é orçada e cobrada como Hora Técnica avulsa (R$ 150/hora).",
    ],
  },
  {
    id: "b2b",
    title: "Natureza Comercial e Blindagem",
    icon: Briefcase,
    paragraphs: [
      "Este contrato firma uma relação estritamente B2B (Business-to-Business). A responsabilidade civil, operacional e financeira restringe-se à pessoa jurídica da GL.ID. Os sócios, desenvolvedores e arquitetos, incluindo Tiago, ficam expressamente isentos de qualquer passivo, litígio ou solidariedade por falha do sistema, vazamento ou indisponibilidade.",
    ],
  },
] as const;

const HOLD_HARMLESS = [
  {
    term: "Infraestrutura de Terceiros",
    text: "A plataforma roda em infraestrutura global de terceiros (Vercel, AWS, Google Cloud, Stripe e Mercado Pago). A entrega é feita no estado em que se encontra ('as is'), em regime de melhor esforço. A GL.ID não responde por quedas desses serviços, bloqueios de gateways de pagamento, lucros cessantes ou vendas perdidas.",
  },
  {
    term: "Propriedade Intelectual e Pirataria",
    text: "A GL.ID fornece a 'estante tecnológica'. Todo o conteúdo é de propriedade e responsabilidade da Contratante. Vazamentos, pirataria ou cópias de vídeo por terceiros não geram responsabilidade à GL.ID, visto que não existe proteção intransponível na internet.",
  },
  {
    term: "Teto de Responsabilidade",
    text: "A responsabilidade civil total da GL.ID fica limitada ao valor efetivamente pago no setup (ou soma das últimas 3 mensalidades no Plano A). Danos indiretos e lucros cessantes ficam fora desse teto.",
  },
  {
    term: "Indenização",
    text: "A Contratante defende, indeniza e mantém indene a GL.ID em reclamações de alunas e autuações de órgãos de defesa do consumidor (inclusive Procon), fundadas em promessa do curso, conteúdo, chargeback ou relação de consumo.",
  },
  {
    term: "LGPD e Proteção de Dados",
    text: "A Contratante atua como Controladora dos dados de suas alunas. A GL.ID atua estritamente como Operadora tecnológica. A GL.ID não possui responsabilidade solidária ou subsidiária por vazamentos de dados, invasões ou indisponibilidade causados por: (I) falhas nos provedores globais de nuvem (Firebase, Vercel, AWS); (II) uso indevido ou compartilhamento de senhas pela equipe da Contratante; (III) ataques cibernéticos inevitáveis (força maior). Qualquer litígio movido por alunos finais será assumido integralmente e exclusivamente pela Contratante.",
  },
] as const;

const OPERATIONAL_FAQ = [
  {
    q: "Se o meu conteúdo e o direito de uso são vitalícios, por que existe a necessidade de pagar manutenção de nuvem (mensalidade) no longo prazo?",
    a: "Pense na plataforma como um Imóvel Próprio. O Setup inicial (R$ 4.097 ou R$ 11.997) coloca o apartamento em operação. Os móveis são o seu conteúdo, e é você quem os gerencia. No entanto, para o apartamento funcionar, você precisa pagar a 'conta de luz e o condomínio' todos os meses. Na tecnologia, a 'conta de luz' é o Servidor na Nuvem (Amazon, Vercel, Firebase) que mantém o site 24 horas no ar para suas alunas não ficarem no escuro. Se você parar de pagar o servidor, o seu conteúdo continua sob a sua gestão, mas o site sai do ar até a fatura ser regularizada.",
  },
  {
    id: "videos",
    q: "Onde ficam armazenados os vídeos das aulas e quem paga por esse armazenamento quando o número de alunas crescer?",
    a: "Para garantir a máxima velocidade e qualidade de streaming, utilizamos uma arquitetura moderna dividida em duas partes:",
    points: [
      "Os Vídeos (arquivos pesados): Devem ser hospedados pela Contratante em plataformas especializadas de streaming de sua escolha (como Vimeo, Panda Video, ou até mesmo YouTube Privado). O custo do plano dessas plataformas de vídeo, caso não utilize opções gratuitas, é de responsabilidade direta da Contratante.",
    ],
  },
  {
    q: "E se eu quiser adicionar, alterar ou excluir vídeos e módulos de aula no futuro?",
    a: "Você tem total autonomia. A plataforma é entregue com um painel gerenciador onde sua própria equipe pode subir novos vídeos, PDFs e criar novos módulos de forma ilimitada, sem depender da GL.ID e sem custos adicionais de desenvolvimento.",
  },
  {
    q: "E se eu quiser alterar o design (cores, layout) ou pedir funcionalidades novas?",
    a: "Mudanças estruturais, de layout ou a criação de novas lógicas de negócio envolvem reescrita de código-fonte. Essas solicitações são tratadas via 'Ticket de Atualização'. Você solicita o que deseja, e nós enviamos um orçamento pontual baseado em nossa Hora Técnica B2B (atualmente fixada em R$ 150,00/hora).",
  },
] as const;

/** Escopo exclusivo do Plano A — não renderizar no Plano B. */
const PLAN_A_CLOUD_FAQ = {
  q: "O que a mensalidade de Manutenção Cloud (ex: R$ 97,00) realmente cobre?",
  a: "A manutenção cloud cobre exclusivamente a infraestrutura ('a conta de luz e aluguel do terreno'): mantém a plataforma no ar 24/7, garante a velocidade de carregamento dos dados e a segurança do banco de dados contra ataques. Ela não inclui suporte técnico para alterações de design, edição de vídeos ou criação de novas funcionalidades.",
} as const;

const DB_POINT_A =
  "O Banco de Dados (textos, senhas, estrutura): Fica na nossa infraestrutura em nuvem.";
const DB_POINT_B =
  "O Banco de Dados (textos, senhas, estrutura): Fica nos provedores de nuvem assumidos pela Contratante (Google Firebase / Vercel), com cobrança direta no cartão da cliente.";

export default function PropostaSmartContractPage() {
  const acceptId = useId();
  const [planoSelecionado, setPlanoSelecionado] = useState<"A" | "B" | null>(null);
  const [signed, setSigned] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [email, setEmail] = useState("");
  const [formAccepted, setFormAccepted] = useState(false);
  const [liveClock, setLiveClock] = useState("");
  const [acceptedAt, setAcceptedAt] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setLiveClock(formatAcceptTimestamp(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const taxDigits = digitsOnly(taxId);
  const taxLooksValid = taxDigits.length === 11 || taxDigits.length === 14;

  const canSign =
    !signed &&
    planoSelecionado !== null &&
    formAccepted &&
    legalName.trim().length >= 3 &&
    taxLooksValid &&
    emailLooksValid;

  const displayTimestamp = acceptedAt ?? liveClock;

  const handleSign = useCallback(() => {
    if (!canSign || !planoSelecionado) return;
    const stamp = formatAcceptTimestamp(new Date());
    setAcceptedAt(stamp);
    setSigned(true);
    window.open(
      buildAcceptWhatsAppUrl({
        legalName: legalName.trim(),
        taxId: taxId.trim(),
        email: email.trim(),
        acceptedAt: stamp,
        plano: planoSelecionado,
      }),
      "_blank",
      "noopener,noreferrer",
    );
  }, [canSign, email, legalName, planoSelecionado, taxId]);

  return (
    <div className="relative min-h-dvh bg-zinc-950">
      <main className="relative z-0 mx-auto w-full max-w-5xl px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] md:px-6 md:pb-14 md:pt-8">
        <Link
          href="/"
          className={`relative z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-[#FDFBF7] transition hover:bg-white/10 ${CTA_FOCUS}`}
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden />
          Voltar ao aplicativo
        </Link>
        <div className={`relative mt-4 ${SHEET}`}>
          <header className="border-b border-zinc-200 pb-8 text-center">
            <p className={LABEL}>Master Smart Contract · GL.ID</p>
            <h1 className="mt-3 font-serif text-[clamp(1.85rem,4.2vw,2.75rem)] font-semibold leading-tight text-zinc-900">
              Contrato de Desenvolvimento de Software
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              {contractData.clientBrand} ×{" "}
              <a
                href={contractData.licensorWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-[#4A5D23]"
              >
                {contractData.licensor}
              </a>
            </p>
            <p className={`mx-auto mt-5 max-w-2xl ${BODY}`}>
              Escolha um caminho para{" "}
              <span className="font-medium text-zinc-900">{contractData.projectName}</span>. O
              documento abaixo abre somente as cláusulas do plano marcado.
            </p>
          </header>

          <section aria-labelledby="paths-heading" className="relative z-10 mt-10">
            <h2 id="paths-heading" className="sr-only">
              Escolha do plano
            </h2>
            <div className="relative z-10 grid items-stretch gap-4 md:grid-cols-2">
              <PlanChoice
                plano="A"
                active={planoSelecionado === "A"}
                dimmed={planoSelecionado !== null && planoSelecionado !== "A"}
                disabled={signed}
                onSelect={setPlanoSelecionado}
                kicker="Ecossistema GL.ID"
                title="Plano Parceiro"
                listPrice={formatBRL(contractData.partnerListCents)}
                price={formatBRL(contractData.partnerSetupCents)}
                offer="Condição Especial de Parceria"
              />
              <PlanChoice
                plano="B"
                active={planoSelecionado === "B"}
                dimmed={planoSelecionado !== null && planoSelecionado !== "B"}
                disabled={signed}
                onSelect={setPlanoSelecionado}
                kicker="Independência Total"
                title="White Label"
                listPrice={formatBRL(contractData.whiteLabelListCents)}
                price={formatBRL(contractData.whiteLabelCents)}
                offer="Valor Promocional"
              />
            </div>
          </section>

          {planoSelecionado === null ? (
            <p className="mt-8 text-center text-sm text-zinc-500">
              Selecione a Opção A ou a Opção B para ler o contrato correspondente.
            </p>
          ) : (
            <div className="mt-10 space-y-10">
              <PlanClauses plano={planoSelecionado} />
              <ResponsibilityMatrix plano={planoSelecionado} />
              <UniversalClauses />
              <HoldHarmless />
              <OperationalFaq plano={planoSelecionado} />
              <SignatureBlock
                plano={planoSelecionado}
                signed={signed}
                canSign={canSign}
                acceptId={acceptId}
                legalName={legalName}
                taxId={taxId}
                email={email}
                formAccepted={formAccepted}
                displayTimestamp={displayTimestamp}
                onLegalName={setLegalName}
                onTaxId={setTaxId}
                onEmail={setEmail}
                onFormAccepted={setFormAccepted}
                onSign={handleSign}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function PlanChoice({
  plano,
  active,
  dimmed,
  disabled,
  onSelect,
  kicker,
  title,
  listPrice,
  price,
  offer,
}: {
  plano: Plano;
  active: boolean;
  dimmed: boolean;
  disabled: boolean;
  onSelect: (plano: Plano) => void;
  kicker: string;
  title: string;
  listPrice: string;
  price: string;
  offer: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plano)}
      disabled={disabled}
      aria-pressed={active}
      className={`relative z-10 flex h-full cursor-pointer flex-col rounded-lg p-6 text-left transition pointer-events-auto md:p-8 ${CTA_FOCUS} ${
        active
          ? "border-[3px] border-[#4A5D23] bg-[#4A5D23]/[0.07] shadow-md"
          : "border border-zinc-200 bg-white hover:border-zinc-300"
      } ${dimmed ? "opacity-40" : "opacity-100"} disabled:cursor-default`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className={LABEL}>Opção {plano}</span>
        {active ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#4A5D23]">
            <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
            Ativo
          </span>
        ) : null}
      </span>
      <span className="mt-4 font-serif text-[clamp(1.65rem,3vw,2.15rem)] font-semibold leading-none text-zinc-900">
        {kicker}
      </span>
      <span className="mt-2 text-sm text-zinc-600">{title}</span>
      <span className="mt-6 text-sm text-zinc-400">
        De: <span className="tabular-nums line-through">{listPrice}</span>
      </span>
      <span className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-[#4A5D23]">
        Por: {price}
      </span>
      <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        {offer}
      </span>
    </button>
  );
}

function PlanClauses({ plano }: { plano: Plano }) {
  const half = formatBRL(contractData.partnerSetupCents / 2);

  return (
    <section aria-labelledby="plan-clauses-heading">
      <h2 id="plan-clauses-heading" className={H2}>
        Cláusulas do Plano {plano}
      </h2>
      <div className={`${PANEL} mt-4 space-y-8`}>
        {plano === "A" && (
          <>
            <Clause icon={Scale} title="Pagamento">
              50% no start do projeto ({half}) e 50% na entrega da plataforma ({half}), com
              vencimento em até {contractData.secondInstallmentDays} dias da entrega. Regra
              inflexível: sem parcelamento.
            </Clause>
            <Clause icon={Fingerprint} title="Propriedade">
              Licença de uso. É vedada engenharia reversa, descompilação, cópia do fluxo, da
              arquitetura de telas ou da lógica para reproduzir produto concorrente, bem como
              qualquer tentativa de extração ou espelhamento do código-fonte. A licença é pessoal,
              intransferível e limitada à operação do método da própria Contratante. O conteúdo é
              100% da cliente ({contractData.clientBrand}).
            </Clause>
            <Clause icon={Database} title="Manutenção Cloud">
              Cortesia de {contractData.courtesyDays} dias após a entrega. Depois, cobrança mensal
              por uso de banco de dados.
              <ul className="mt-4 divide-y divide-zinc-100 rounded-lg border border-zinc-200 bg-[#FDFBF7]">
                {contractData.tiers.map((tier) => (
                  <li
                    key={tier.id}
                    className="flex items-baseline justify-between gap-3 px-3 py-2.5 text-sm"
                  >
                    <span>
                      <span className="font-medium text-zinc-900">{tier.name}</span>
                      <span className="mt-0.5 block text-xs text-zinc-500">{tier.volume}</span>
                    </span>
                    <span className="shrink-0 font-medium tabular-nums text-zinc-900">
                      {formatBRL(tier.monthlyCents)}
                      <span className="text-xs font-normal text-zinc-500">/mês</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-zinc-200 pt-6">
                <h4 className="font-serif text-base font-semibold text-zinc-900">
                  Política de Inadimplência de Infraestrutura
                </h4>
                <ul className="mt-4 space-y-4">
                  <LegalPoint term="Suspensão de Acesso">
                    O atraso superior a 5 (cinco) dias úteis no pagamento da fatura de infraestrutura
                    acarretará a suspensão temporária do acesso à plataforma, até a sua devida
                    regularização.
                  </LegalPoint>
                  <LegalPoint term="Exclusão de Dados">
                    O atraso superior a 60 (sessenta) dias autoriza a exclusão total e permanente dos
                    dados nos servidores. Antes desse prazo, a Contratante tem direito à exportação
                    dos seus dados em planilha ou CSV. É estritamente proibida a cópia, extração,
                    espelhamento ou portabilidade do código-fonte, do painel administrativo e da
                    arquitetura da GL.ID. Após a exclusão, a GL.ID não retém cópias e não tem dever de
                    custódia, guarda ou backup. A exclusão é definitiva e sem indenização.
                  </LegalPoint>
                </ul>
              </div>
            </Clause>
            <Clause icon={LogOut} title="Protocolo de Rescisão e Portabilidade de Dados">
              <p>
                No cancelamento voluntário ou na inadimplência do Plano A, a Contratante tem direito à
                exportação dos seus dados em planilha ou CSV. Esse direito não alcança o código-fonte,
                o painel administrativo nem a arquitetura da GL.ID.
              </p>
              <ul className="mt-4 space-y-4">
                <LegalPoint term="O que a Contratante leva">
                  Exportação integral do banco de dados de clientes (nomes, e-mails, progresso de
                  aulas e histórico) em planilha ou CSV estruturado, e o direito de realocar os seus
                  vídeos e conteúdos.
                </LegalPoint>
                <LegalPoint term="O que a Contratante não leva">
                  É estritamente proibida a cópia, a extração, o espelhamento ou a portabilidade do
                  código-fonte, do painel administrativo e da arquitetura da GL.ID, inclusive o design
                  da interface (UI/UX). Esses ativos permanecem propriedade intelectual exclusiva da
                  GL.ID.
                </LegalPoint>
                <LegalPoint term="Exclusão LGPD">
                  No cancelamento, após a entrega do arquivo de exportação, a GL.ID exclui de forma
                  permanente os dados das alunas e da Contratante nos servidores (Firebase/Vercel) em
                  até 30 dias. Na inadimplência, a exclusão total ocorre aos 60 dias de atraso. A
                  partir da exclusão, a GL.ID não retém cópias e extingue qualquer responsabilidade ou
                  dever de custódia.
                </LegalPoint>
              </ul>
            </Clause>
          </>
        )}
        {plano === "B" && (
          <>
            <Clause icon={Scale} title="Pagamento">
              Entrada mais parcelamento, a combinar. O preço de aquisição é{" "}
              {formatBRL(contractData.whiteLabelCents)}.
            </Clause>
            <Clause icon={Fingerprint} title="Propriedade">
              Transfere-se o código final customizado, no estado em que se encontra (“as is”), sob
              licença de uso exclusiva da marca da Contratante, após a quitação, sem mensalidade da
              GL.ID e sem suporte gratuito depois da entrega. A GL.ID mantém a propriedade perpétua
              das bibliotecas-base, dos motores de banco de dados, dos componentes reutilizáveis, do
              painel administrativo genérico e da arquitetura proprietária. É expressamente proibido
              à Contratante revender, sublicenciar ou operar a estrutura como SaaS.
            </Clause>
            <Clause icon={CalendarClock} title="Protocolo de Entrega">
              A entrega do repositório é estrita no estado em que se encontra (“as is”), após a
              quitação integral. Com a transferência, encerram-se suporte, correção e manutenção
              gratuita. Ajuste posterior só por hora técnica avulsa.
            </Clause>
            <Clause icon={Database} title="Manutenção Cloud">
              <p>
                Isenção de mensalidade {contractData.licensor}. A cliente assume a configuração e a
                cobrança direta dos provedores de nuvem, no próprio cartão.
              </p>
              <p className="mt-4 rounded-lg border border-zinc-200 bg-[#FDFBF7] px-4 py-3">
                <span className="font-medium text-zinc-900">Atenção sobre Escala: </span>
                Ao adquirir a Independência Total, a Contratante atrelará seu próprio cartão de
                crédito às provedoras de nuvem (Google Firebase / Vercel). O custo mensal cobrado
                por essas empresas não é fixo; ele aumenta ou diminui automaticamente, em dólar,
                conforme o volume de acessos e a quantidade de alunas ativas na plataforma.
              </p>
            </Clause>
          </>
        )}
      </div>
    </section>
  );
}

const MATRIX_GL_A = [
  "Manter a plataforma e os servidores operacionais (Firebase/Vercel) em regime de melhor esforço.",
  "Aplicar atualizações de segurança e monitorar a integridade do banco de dados.",
  "Garantir o funcionamento da estante tecnológica e o licenciamento do código.",
] as const;

const MATRIX_CLIENT_A = [
  "Realizar o pagamento pontual da mensalidade de manutenção Cloud (Tiers).",
  "Gerenciar 100% do conteúdo, vídeos e alunos.",
  "Atuar como Controladora dos dados (LGPD) e prestar suporte direto às alunas.",
  "Proteger credenciais de acesso da sua equipe para evitar vazamentos.",
] as const;

const MATRIX_GL_B = [
  "Entregar o código-fonte (licença de uso exclusiva) no estado em que se encontra (“as is”).",
  "Realizar o setup inicial e a migração para as contas de nuvem da Contratante.",
  "Encerrar obrigações de suporte e manutenção gratuita após a entrega do repositório.",
] as const;

const MATRIX_CLIENT_B = [
  "Assumir 100% da titularidade e dos custos das contas de infraestrutura (Vercel, Firebase, AWS, Stripe).",
  "Contratar equipe própria ou acionar a GL.ID via Hora Técnica para qualquer atualização ou manutenção futura.",
  "Gerenciar banco de dados, backups, conteúdo e suporte aos alunos.",
  "Atuar como Controladora e Operadora primária dos dados após o handover.",
] as const;

function ResponsibilityMatrix({ plano }: { plano: Plano }) {
  return (
    <section aria-labelledby="matrix-heading">
      <h2 id="matrix-heading" className={H2}>
        Matriz de Responsabilidades
      </h2>
      <p className={`mt-2 ${BODY}`}>O que cabe a cada parte no Plano {plano}.</p>
      {plano === "A" && <MatrixGrid glid={MATRIX_GL_A} client={MATRIX_CLIENT_A} />}
      {plano === "B" && <MatrixGrid glid={MATRIX_GL_B} client={MATRIX_CLIENT_B} />}
    </section>
  );
}

function MatrixGrid({ glid, client }: { glid: readonly string[]; client: readonly string[] }) {
  return (
    <div className="mt-4 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
      <MatrixCard icon={Shield} party={contractData.licensor} title="Deveres da GL.ID" duties={glid} />
      <MatrixCard icon={User} party="Contratante" title="Deveres da Contratante (Lala)" duties={client} />
    </div>
  );
}

function MatrixCard({
  icon: Icon,
  party,
  title,
  duties,
}: {
  icon: typeof Shield;
  party: string;
  title: string;
  duties: readonly string[];
}) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-lg border border-zinc-200 bg-white shadow-sm">
      <header className="border-b border-zinc-200 bg-[#FDFBF7] px-4 py-4 sm:px-5">
        <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#4A5D23]">
          <Icon className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          {party}
        </span>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-zinc-900">{title}</h3>
      </header>
      <ul className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
        {duties.map((duty) => (
          <li key={duty} className="flex gap-3">
            <Check className="mt-0.5 size-4 shrink-0 text-[#4A5D23]" strokeWidth={2.25} aria-hidden />
            <span className={BODY}>{duty}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function HoldHarmless() {
  return (
    <section aria-labelledby="hold-harmless-heading">
      <h2 id="hold-harmless-heading" className={H2}>
        Limitação de Responsabilidade e LGPD
      </h2>
      <div className={`${PANEL} mt-4`}>
        <ul className="space-y-6">
          {HOLD_HARMLESS.map((item) => (
            <LegalPoint key={item.term} term={item.term}>
              {item.text}
            </LegalPoint>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LegalPoint({ term, children }: { term: string; children: ReactNode }) {
  return (
    <li className={BODY}>
      <span className="font-semibold text-zinc-900">{term}: </span>
      {children}
    </li>
  );
}

function UniversalClauses() {
  return (
    <section aria-labelledby="universal-heading">
      <h2 id="universal-heading" className={H2}>
        Regras Contratuais
      </h2>
      <div className={`${PANEL} mt-4 space-y-8`}>
        {UNIVERSAL_CLAUSES.map(({ id, title, icon, paragraphs }) => (
          <Clause key={id} icon={icon} title={title}>
            <div className="space-y-4">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Clause>
        ))}
      </div>
    </section>
  );
}

function OperationalFaq({ plano }: { plano: Plano }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={H2}>
        Alinhamento Operacional (FAQ)
      </h2>
      <dl className="mt-4 divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-[#FDFBF7]">
        {OPERATIONAL_FAQ.map((item) => (
          <div key={item.q} className="px-4 py-5 sm:px-6 sm:py-6">
            <dt className="font-serif text-base font-semibold leading-snug text-zinc-900">{item.q}</dt>
            <dd className={`mt-3 ${BODY}`}>
              {item.a}
              {"points" in item ? (
                <ol className="mt-3 list-decimal space-y-2 pl-5">
                  {"id" in item && item.id === "videos" && plano === "A" && <li>{DB_POINT_A}</li>}
                  {"id" in item && item.id === "videos" && plano === "B" && <li>{DB_POINT_B}</li>}
                  {item.points.map((point) => (
                    <li key={point.slice(0, 32)}>{point}</li>
                  ))}
                </ol>
              ) : null}
            </dd>
          </div>
        ))}
        {plano === "A" && (
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <dt className="font-serif text-base font-semibold leading-snug text-zinc-900">
              {PLAN_A_CLOUD_FAQ.q}
            </dt>
            <dd className={`mt-3 ${BODY}`}>{PLAN_A_CLOUD_FAQ.a}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}

function Clause({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Scale;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-zinc-100 pb-8 last:border-0 last:pb-0">
      <div className="mb-4 flex items-start gap-2">
        <Icon className="mt-0.5 size-4 shrink-0 text-zinc-600" strokeWidth={1.5} aria-hidden />
        <h3 className="min-w-0 font-serif text-base font-semibold leading-snug text-zinc-900">{title}</h3>
      </div>
      <div className={BODY}>{children}</div>
    </div>
  );
}

function SignatureBlock({
  plano,
  signed,
  canSign,
  acceptId,
  legalName,
  taxId,
  email,
  formAccepted,
  displayTimestamp,
  onLegalName,
  onTaxId,
  onEmail,
  onFormAccepted,
  onSign,
}: {
  plano: Plano;
  signed: boolean;
  canSign: boolean;
  acceptId: string;
  legalName: string;
  taxId: string;
  email: string;
  formAccepted: boolean;
  displayTimestamp: string;
  onLegalName: (value: string) => void;
  onTaxId: (value: string) => void;
  onEmail: (value: string) => void;
  onFormAccepted: (value: boolean) => void;
  onSign: () => void;
}) {
  const buttonLabel = signed
    ? `Assinatura registrada — Plano ${plano}`
    : `Assinar e Contratar Plano ${plano}`;

  return (
    <section aria-labelledby="e-signature-heading" className="border-t-2 border-zinc-300 pt-10">
      <div className="rounded-lg border-2 border-dashed border-zinc-300 bg-white p-6 shadow-sm">
        <p className={LABEL}>Contrato formal · Plano {plano}</p>
        <h2 id="e-signature-heading" className="mt-2 font-serif text-xl font-semibold text-zinc-900">
          Termo de aceite e assinatura eletrônica
        </h2>
        <p className={`mt-3 ${BODY}`}>
          A assinatura vale para o Plano {plano}, nas cláusulas exibidas acima.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="legal-name" className="text-xs font-medium text-zinc-800">
              Nome completo / Razão social
            </label>
            <input
              id="legal-name"
              type="text"
              autoComplete="name"
              disabled={signed}
              value={legalName}
              onChange={(e) => onLegalName(e.target.value)}
              className={INPUT}
              placeholder={contractData.clientSignatory}
            />
          </div>
          <div>
            <label htmlFor="tax-id" className="text-xs font-medium text-zinc-800">
              CPF / CNPJ
            </label>
            <input
              id="tax-id"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              disabled={signed}
              value={taxId}
              onChange={(e) => onTaxId(e.target.value)}
              className={INPUT}
              placeholder="000.000.000-00"
            />
          </div>
          <div>
            <label htmlFor="legal-email" className="text-xs font-medium text-zinc-800">
              E-mail
            </label>
            <input
              id="legal-email"
              type="email"
              autoComplete="email"
              disabled={signed}
              value={email}
              onChange={(e) => onEmail(e.target.value)}
              className={INPUT}
              placeholder="contato@masterglass.com.br"
            />
          </div>
        </div>

        <p className="mt-6 text-xs text-zinc-600">
          Data e hora do aceite:{" "}
          <span className="font-mono text-sm font-medium text-zinc-900">{displayTimestamp}</span>
        </p>

        <label
          htmlFor={acceptId}
          className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-[#FDFBF7] p-4"
        >
          <input
            id={acceptId}
            type="checkbox"
            checked={formAccepted}
            disabled={signed}
            onChange={(e) => onFormAccepted(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-zinc-300 accent-[#4A5D23]"
          />
          <span className="text-sm text-zinc-700">{FORM_ACCEPT_LABEL}</span>
        </label>

        <button
          type="button"
          onClick={onSign}
          disabled={!canSign}
          className={`mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm transition ${CTA_FOCUS} ${
            signed ? "bg-zinc-300 font-semibold text-zinc-700" : BTN_SIGN
          }`}
        >
          {signed ? <Check className="size-4" strokeWidth={2.5} aria-hidden /> : null}
          {buttonLabel}
        </button>
        {!canSign && !signed ? (
          <p className="mt-3 text-center text-xs text-zinc-500">
            O botão permanece bloqueado até nome, CPF ou CNPJ, e-mail e a declaração.
          </p>
        ) : null}

        <footer className="mt-12 border-t border-zinc-200 pt-6 text-xs leading-relaxed text-zinc-500">
          <p>
            Desenvolvido e Arquitetado por:{" "}
            <span className="text-zinc-700">{contractData.architectCredit}</span>
          </p>
          <p className="mt-1">
            Stack: <span className="text-zinc-700">{contractData.stack}</span>
          </p>
        </footer>
      </div>
    </section>
  );
}
