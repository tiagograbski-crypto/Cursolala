import { AlertTriangle } from "lucide-react";

type AlertVariant = "aviso" | "erro";

interface ProtocolAlertProps {
  title: string;
  body: string;
  variant?: AlertVariant;
}

const VARIANT_LABELS: Record<AlertVariant, string> = {
  aviso: "Aviso de Excelência",
  erro: "Onde o mercado amador erra",
};

/**
 * ProtocolAlert — Quebra cognitiva para dicas críticas de Colorimetria.
 * Glass Chumbo com ícone de alerta em sage e copy de autoridade técnica.
 * Encaixa diretamente no fluxo de ApostilaPageRenderer como bloco "protocol-alert".
 */
export function ProtocolAlert({
  title,
  body,
  variant = "aviso",
}: ProtocolAlertProps) {
  return (
    <aside
      aria-label={`${VARIANT_LABELS[variant]}: ${title}`}
      className="
        my-8 overflow-hidden rounded-2xl
        border border-white/10
        bg-zinc-900/85 backdrop-blur-2xl
        shadow-float
        px-6 py-6
      "
    >
      {/* Cabeçalho */}
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/15"
          aria-hidden
        >
          <AlertTriangle
            strokeWidth={1.5}
            className="h-4 w-4 text-sage"
          />
        </span>

        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/35">
            {VARIANT_LABELS[variant]}
          </p>
          <p className="mt-0.5 font-serif text-[1.05rem] leading-snug text-pearl">
            {title}
          </p>
        </div>
      </div>

      {/* Corpo */}
      <p className="mt-4 text-[0.97rem] leading-[1.8] text-white/65">
        {body}
      </p>
    </aside>
  );
}
