import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { getMvpTenant } from "@/lib/tenant";

export default function AlunaIndex() {
  const tenantRecord = getMvpTenant();

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Academia · Selo Masterglass</p>
      <h1 className="mt-2 font-serif text-[2.15rem] leading-tight text-ink md:text-[2.75rem]">
        Bem-vinda à excelência.
      </h1>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-ink md:text-base">
        Sua jornada oficial para dominar os protocolos da {tenantRecord.brand} começa aqui. Siga os{" "}
        <span className="text-ink">protocolos oficiais</span>, acompanhe seu progresso no condomínio digital e avance em
        direção à sua <span className="text-ink">Licença Profissional</span>.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">
        O acervo técnico e as sessões foram desenhados para confirmar, no primeiro minuto, que você está no lugar certo
        para escalar preço, autoridade e resultado no salão.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/aluna/apostila" className={buttonClass("primary", false, "px-8")}>
          Entrar no acervo técnico
        </Link>
        <Link href="/aluna/aulas" className={buttonClass("ghost", false, "px-8")}>
          Ver trilhas de maestria
        </Link>
      </div>
    </div>
  );
}
