"use client";

import { Check, Copy, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonClass } from "@/components/ui/Button";
import { fieldClass, FieldLabel } from "@/components/ui/Field";
import { createLicenseCode, readLicenses, writeLicenses, type IssuedLicense } from "@/lib/licenses";
import { licenseWhatsAppUrl } from "@/lib/tenant";
import { cn } from "@/lib/cn";

export function LicenseDesk() {
  const [studentName, setStudentName] = useState("");
  const [issued, setIssued] = useState<IssuedLicense | null>(null);
  const [recent, setRecent] = useState<IssuedLicense[]>([]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRecent(readLicenses().slice(0, 5));
    setReady(true);
  }, []);

  function generate() {
    const license: IssuedLicense = {
      code: createLicenseCode(),
      studentName: studentName.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [license, ...readLicenses()];
    if (!writeLicenses(next)) {
      setSaveError(true);
      return;
    }
    setSaveError(false);
    setIssued(license);
    setRecent(next.slice(0, 5));
    setCopied(false);
    setCopyError(false);
  }

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Liberação</p>
        <h2 className="mt-1 font-serif text-[2rem] leading-none text-ink">Licença de acesso</h2>
        <p className="mt-3 text-sm leading-6 text-ink-soft">Gere o código depois do pagamento e envie no WhatsApp. A aluna entra na portaria com ele.</p>
      </div>

      <section className="rounded-[28px] bg-pearl p-7 shadow-card">
        <label className="block">
          <FieldLabel>Nome da aluna</FieldLabel>
          <input
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Quem já pagou"
            className={cn(fieldClass, "mt-2")}
          />
        </label>
        <Button full className="mt-4" onClick={generate}>
          Gerar Licença de Acesso
        </Button>
        {saveError ? (
          <p className="mt-3 text-sm leading-6 text-ink" role="alert">
            Não foi possível guardar a licença neste aparelho.
          </p>
        ) : null}

        {issued ? (
          <div className="mt-6 rounded-[22px] bg-pearl-deep px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              {issued.studentName || "Licença pronta"}
            </p>
            <p className="mt-1 break-all font-serif text-[1.45rem] leading-tight tracking-[0.06em] text-ink">{issued.code}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="ghost" className="px-3 py-3 text-[12px]" onClick={() => copy(issued.code)}>
                {copied ? <Check strokeWidth={1.5} className="h-4 w-4" /> : <Copy strokeWidth={1.5} className="h-4 w-4" />}
                {copied ? "Copiado" : "Copiar"}
              </Button>
              <a
                className={buttonClass("primary", false, "px-3 py-3 text-[12px]")}
                href={licenseWhatsAppUrl(issued.code, issued.studentName)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle strokeWidth={1.5} className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
              {copyError ? (
                <p className="mt-3 text-sm leading-6 text-ink-soft">Segure o código para copiar manualmente.</p>
              ) : null}
          </div>
        ) : null}
      </section>

      <section>
        <h3 className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">Últimas neste aparelho</h3>
        {!ready ? <div className="mt-3 h-16" /> : null}
        {ready && recent.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">Nenhuma licença gerada ainda.</p>
        ) : null}
        <ul className="mt-3 space-y-2">
          {recent.map((item) => (
            <li key={`${item.code}-${item.createdAt}`} className="flex items-center justify-between gap-3 rounded-2xl bg-pearl px-5 py-4 shadow-card">
              <span>
                <span className="block text-sm text-ink">{item.studentName || "Sem nome"}</span>
                <span className="font-serif tracking-wide text-ink-soft">{item.code}</span>
              </span>
              <span className="text-[11px] text-ink-soft">
                {new Date(item.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
