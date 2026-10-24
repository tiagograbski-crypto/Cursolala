"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, FieldLabel } from "@/components/ui/Field";
import { readDiagnoses, writeDiagnoses, type Diagnosis, type Elasticity } from "@/lib/diagnoses";
import { cn } from "@/lib/cn";

const fibers = ["Natural", "Poroso", "Resistente", "Sensibilizado", "Quebradiço"];
const funds = [
  "10 — Amarelo muito claro",
  "9 — Amarelo",
  "8 — Amarelo alaranjado",
  "7 — Laranja",
  "6 — Laranja avermelhado",
  "5 — Vermelho alaranjado",
  "4 — Vermelho",
  "3 — Vermelho intenso",
];

const elasticityOptions: { id: Elasticity; label: string; hint: string }[] = [
  { id: "aprovado", label: "Aprovado", hint: "O fio volta sem marcar." },
  { id: "emborrachado", label: "Emborrachado", hint: "Estica e não retorna." },
];

export function AnamneseForm() {
  const [clientName, setClientName] = useState("");
  const [fiber, setFiber] = useState(fibers[0]);
  const [elasticity, setElasticity] = useState<Elasticity | null>(null);
  const [targetFund, setTargetFund] = useState(funds[1]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<Diagnosis | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!clientName.trim()) {
      setError("Informe o nome da cliente.");
      return;
    }
    if (!elasticity) {
      setError("Marque o teste de elasticidade.");
      return;
    }
    const diagnosis: Diagnosis = {
      id: crypto.randomUUID(),
      clientName: clientName.trim(),
      fiber,
      elasticity,
      targetFund,
      savedAt: new Date().toISOString(),
    };
    const stored = writeDiagnoses([diagnosis, ...readDiagnoses()]);
    if (!stored) {
      setError("Não foi possível salvar neste aparelho.");
      return;
    }
    setSaved(diagnosis);
    setError("");
  }

  if (saved) {
    const elasticityLabel = saved.elasticity === "aprovado" ? "Aprovado" : "Emborrachado";
    return (
      <div className="rounded-[28px] bg-pearl px-7 py-10 text-center shadow-card">
        <p className="text-[10px] uppercase tracking-[0.2em] text-sage">Ficha salva</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">{saved.clientName}</h2>
        <dl className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em]">Diagnóstico de fio</dt>
            <dd className="text-ink">{saved.fiber}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em]">Elasticidade</dt>
            <dd className="text-ink">{elasticityLabel}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em]">Fundo alvo</dt>
            <dd className="text-ink">{saved.targetFund}</dd>
          </div>
        </dl>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setSaved(null);
            setClientName("");
            setElasticity(null);
          }}
        >
          Nova ficha
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Salão</p>
        <h1 className="mt-1 font-serif text-[2rem] leading-none text-ink">Anamnese</h1>
        <p className="mt-3 text-sm leading-6 text-ink-soft">A ficha que se preenche com a cliente na cadeira, antes de misturar.</p>
      </div>

      <label className="block">
        <FieldLabel>Nome da Cliente</FieldLabel>
        <input
          value={clientName}
          onChange={(event) => {
            setClientName(event.target.value);
            if (error) setError("");
          }}
          className={cn(fieldClass, "mt-2")}
          placeholder="Nome na ficha"
          autoComplete="name"
        />
      </label>

      <label className="block">
        <FieldLabel>Diagnóstico de Fio</FieldLabel>
        <span className="relative mt-2 block">
          <select value={fiber} onChange={(event) => setFiber(event.target.value)} className={cn(fieldClass, "appearance-none pr-10")}>
            {fibers.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        </span>
      </label>

      <fieldset>
        <legend id="elasticidade" className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-soft">
          Teste de Elasticidade
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-labelledby="elasticidade" aria-required="true">
          {elasticityOptions.map((option) => {
            const active = elasticity === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setElasticity(option.id);
                  if (error) setError("");
                }}
                className={cn(
                  "rounded-[22px] px-5 py-5 text-left transition",
                  active ? "bg-sage/10 text-ink shadow-card" : "bg-pearl text-ink shadow-card",
                )}
              >
                <span className={cn("block h-3.5 w-3.5 rounded-full", active ? "bg-sage" : "bg-pearl-deep")} />
                <span className="mt-3 block font-serif text-xl leading-none text-ink">{option.label}</span>
                <span className="mt-1 block text-[12px] leading-5 text-ink-soft">{option.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <FieldLabel>Fundo de Clareamento Alvo</FieldLabel>
        <span className="relative mt-2 block">
          <select
            value={targetFund}
            onChange={(event) => setTargetFund(event.target.value)}
            className={cn(fieldClass, "appearance-none pr-10")}
          >
            {funds.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        </span>
      </label>

      {error ? (
        <p className="text-sm text-ink" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" full>
        Salvar Diagnóstico
      </Button>
    </form>
  );
}
