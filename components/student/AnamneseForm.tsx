"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, FieldLabel } from "@/components/ui/Field";
import { readDiagnoses, writeDiagnoses, type Diagnosis, type Elasticity } from "@/lib/diagnoses";
import { cn } from "@/lib/cn";

const textures = ["Fino", "Médio", "Grosso"];
const porosities = ["Baixa", "Média", "Alta"];
const chemistries = [
  "Virgem — sem química",
  "Coloração nos últimos 12 meses",
  "Descoloração acumulada",
  "Alisamento / progressiva",
  "Misto — mais de um processo",
];
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
  { id: "aprovado", label: "Aprovado", hint: "Estica e volta sem marcar." },
  { id: "emborrachado", label: "Emborrachado", hint: "Estica e não retorna." },
  { id: "quebra", label: "Quebra", hint: "Parte sem elongar — dano proteico." },
];

function elasticityLabel(value: Elasticity) {
  return elasticityOptions.find((item) => item.id === value)?.label ?? value;
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <span className="relative mt-2 block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(fieldClass, "appearance-none truncate pr-10")}
        >
          {options.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ChevronDown
          strokeWidth={1.5}
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
        />
      </span>
    </label>
  );
}

export function AnamneseForm() {
  const [clientName, setClientName] = useState("");
  const [texture, setTexture] = useState(textures[1]);
  const [porosity, setPorosity] = useState(porosities[1]);
  const [chemistry, setChemistry] = useState(chemistries[0]);
  const [elasticity, setElasticity] = useState<Elasticity | null>(null);
  const [currentFund, setCurrentFund] = useState(funds[3]);
  const [targetFund, setTargetFund] = useState(funds[1]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<Diagnosis | null>(null);
  const [archive, setArchive] = useState<Diagnosis[]>([]);

  useEffect(() => {
    setArchive(readDiagnoses());
  }, [saved]);

  function resetForm() {
    setSaved(null);
    setClientName("");
    setTexture(textures[1]);
    setPorosity(porosities[1]);
    setChemistry(chemistries[0]);
    setElasticity(null);
    setCurrentFund(funds[3]);
    setTargetFund(funds[1]);
    setNotes("");
    setError("");
  }

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
      texture,
      porosity,
      chemistry,
      elasticity,
      currentFund,
      targetFund,
      notes: notes.trim(),
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
    return (
      <div className="mx-auto w-full max-w-xl space-y-5">
        <div className="rounded-[28px] bg-pearl px-5 py-8 shadow-card sm:px-7 sm:py-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-sage">Ficha salva neste aparelho</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">{saved.clientName}</h2>
          <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/40">Textura</dt>
              <dd className="mt-1 text-ink">{saved.texture}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/40">Porosidade</dt>
              <dd className="mt-1 text-ink">{saved.porosity}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/40">Histórico químico</dt>
              <dd className="mt-1 text-ink">{saved.chemistry}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/40">Elasticidade</dt>
              <dd className="mt-1 text-ink">{elasticityLabel(saved.elasticity)}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/40">Fundo atual → alvo</dt>
              <dd className="mt-1 text-ink">
                {saved.currentFund} → {saved.targetFund}
              </dd>
            </div>
            {saved.notes ? (
              <div className="sm:col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/40">Observações</dt>
                <dd className="mt-1 text-ink">{saved.notes}</dd>
              </div>
            ) : null}
          </dl>
          <Button variant="graphite" full className="mt-8" onClick={resetForm}>
            Nova ficha
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-xl space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Cadeira</p>
        <h1 className="mt-1 font-serif text-[2rem] leading-none text-ink">Anamnese</h1>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Os 3 minutos de diagnóstico da apostila: textura, porosidade, histórico e fundo — antes de misturar.
        </p>
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField label="Textura do Fio" value={texture} onChange={setTexture} options={textures} />
        <SelectField label="Porosidade" value={porosity} onChange={setPorosity} options={porosities} />
      </div>

      <SelectField
        label="Histórico Químico (12 meses)"
        value={chemistry}
        onChange={setChemistry}
        options={chemistries}
      />

      <fieldset>
        <legend id="elasticidade" className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
          Teste de Elasticidade
        </legend>
        <div
          className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3"
          role="radiogroup"
          aria-labelledby="elasticidade"
          aria-required="true"
        >
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
                  active ? "bg-sage/10 text-ink shadow-card ring-1 ring-sage/30" : "bg-pearl text-ink shadow-card",
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField
          label="Fundo de Clareamento Atual"
          value={currentFund}
          onChange={setCurrentFund}
          options={funds}
        />
        <SelectField
          label="Fundo de Clareamento Alvo"
          value={targetFund}
          onChange={setTargetFund}
          options={funds}
        />
      </div>

      <label className="block">
        <FieldLabel>Observações — alergia, quebra, preferência</FieldLabel>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className={cn(fieldClass, "mt-2 min-h-[6.5rem] resize-y")}
          placeholder="Ex.: alergia a PPD, pontas porosas, quer loiro sem amarelo."
        />
      </label>

      {error ? (
        <p className="text-sm text-ink" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" full>
        Salvar Diagnóstico
      </Button>

      {archive.length > 0 ? (
        <section className="pt-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-ink/40">Fichas neste aparelho</p>
          <ul className="mt-3 space-y-2">
            {archive.slice(0, 5).map((item) => (
              <li key={item.id} className="rounded-2xl bg-pearl px-5 py-4 shadow-card">
                <p className="font-serif text-lg leading-none text-ink">{item.clientName}</p>
                <p className="mt-1.5 break-words text-[12px] leading-5 text-ink-soft">
                  {item.texture} · {item.porosity} · {item.currentFund} → {item.targetFund}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </form>
  );
}
