import { MessageCircle } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { agencyWhatsAppUrl } from "@/lib/tenant";

export function UpsellCard() {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Upsell</p>
      <h2 className="mt-1 font-serif text-[2rem] leading-none text-ink">Impulsionar vendas</h2>
      <article className="mt-6 overflow-hidden rounded-[28px] bg-ink px-7 py-8 text-pearl shadow-card">
        <p className="text-[10px] uppercase tracking-[0.24em] text-pearl/80">Agência parceira</p>
        <h3 className="mt-3 font-serif text-[2.35rem] leading-[1.02] text-pearl">
          O curso entrega a técnica.
          <br />
          O tráfego entrega a agenda.
        </h3>
        <p className="mt-4 text-sm leading-6 text-pearl/75">
          Campanhas de tráfego pago desenhadas para o lançamento do espaço, sem você operar anúncio no intervalo do salão.
        </p>
        <a
          href={agencyWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("primary", true, "mt-8")}
        >
          <MessageCircle strokeWidth={1.5} className="h-4 w-4" />
          Falar com Agência Parceira
        </a>
      </article>
    </div>
  );
}
