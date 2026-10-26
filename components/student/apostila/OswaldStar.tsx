"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type StarColor = {
  id: string;
  name: string;
  mark: string;
  role: "Primária" | "Secundária";
  hex: string;
  label: string;
  opposite: string;
  angle: number;
  salonHint: string;
};

const COLORS: StarColor[] = [
  {
    id: "amarelo",
    name: "Amarelo",
    mark: "Am",
    role: "Primária",
    hex: "#E2B340",
    label: "#4A3B32",
    opposite: "violeta",
    angle: -90,
    salonHint: "Fundo 8–9 · loiro quente",
  },
  {
    id: "laranja",
    name: "Laranja",
    mark: "Lr",
    role: "Secundária",
    hex: "#D4783A",
    label: "#4A3B32",
    opposite: "azul",
    angle: -30,
    salonHint: "Fundo 6–7 · cobre vivo",
  },
  {
    id: "vermelho",
    name: "Vermelho",
    mark: "Vm",
    role: "Primária",
    hex: "#A63D3D",
    label: "#FDFBF7",
    opposite: "verde",
    angle: 30,
    salonHint: "Fundo 4–5 · vermelho residual",
  },
  {
    id: "violeta",
    name: "Violeta",
    mark: "Vi",
    role: "Secundária",
    hex: "#6E4C86",
    label: "#FDFBF7",
    opposite: "amarelo",
    angle: 90,
    salonHint: "Neutraliza amarelo · .1 suave",
  },
  {
    id: "azul",
    name: "Azul",
    mark: "Az",
    role: "Primária",
    hex: "#3E678F",
    label: "#FDFBF7",
    opposite: "laranja",
    angle: 150,
    salonHint: "Neutraliza laranja · .8 mate",
  },
  {
    id: "verde",
    name: "Verde",
    mark: "Vd",
    role: "Secundária",
    hex: "#5E7D52",
    label: "#FDFBF7",
    opposite: "vermelho",
    angle: 210,
    salonHint: "Neutraliza vermelho · base verde",
  },
];

const CX = 170;
const CY = 170;
const NODE = 98;

const COLOR_ORDER = [...COLORS].sort((a, b) => a.angle - b.angle);

function polar(radius: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function arcPath(radius: number, start: number, end: number) {
  const a = polar(radius, start);
  const b = polar(radius, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${large} 1 ${b.x} ${b.y}`;
}

function colorById(id: string) {
  return COLORS.find((color) => color.id === id) ?? COLORS[0];
}

export type OswaldStarVariant = "pearl" | "glass";

export function OswaldStar({
  variant = "pearl",
  compact = false,
  /** Sem moldura dupla quando já está dentro de GraphicStage */
  embedded = false,
}: {
  variant?: OswaldStarVariant;
  compact?: boolean;
  embedded?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const noteId = useId();
  const reduceMotion = useReducedMotion();
  const selected = selectedId ? colorById(selectedId) : null;
  const opposite = selected ? colorById(selected.opposite) : null;
  const isGlass = variant === "glass";
  const showChrome = isGlass && !embedded;

  const choose = useCallback((id: string) => {
    setSelectedId(id);
    window.setTimeout(() => {
      noteRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 40);
  }, []);

  const clearSelection = useCallback(() => setSelectedId(null), []);

  const cycleColor = useCallback(
    (direction: 1 | -1) => {
      if (!selectedId) {
        choose(COLOR_ORDER[0].id);
        return;
      }
      const index = COLOR_ORDER.findIndex((c) => c.id === selectedId);
      const next = COLOR_ORDER[(index + direction + COLOR_ORDER.length) % COLOR_ORDER.length];
      choose(next.id);
    },
    [choose, selectedId],
  );

  const triangles = useMemo(
    () => [
      [0, 2, 4],
      [1, 3, 5],
    ],
    [],
  );

  const ringStroke = isGlass ? "rgb(255 255 255 / 0.12)" : "#4A3B32";
  const dashStroke = isGlass ? "rgb(255 255 255 / 0.22)" : "#4A3B32";
  const hubFill = isGlass ? "rgb(255 255 255 / 0.06)" : "#FDFBF7";
  const hubStroke = isGlass ? "rgb(255 255 255 / 0.14)" : "#E8E5DF";
  const hubCore = isGlass ? "#FDFBF7" : "#6B705C";
  const linkStroke = isGlass ? "#FDFBF7" : "#6B705C";
  const focusRing = isGlass ? "focus-visible:ring-pearl/80" : "focus-visible:ring-sage";

  const shell = cn(
    showChrome &&
      "rounded-[28px] border border-white/10 bg-zinc-950/80 p-5 text-pearl shadow-2xl backdrop-blur-3xl sm:p-6 [&_p]:!text-pearl",
    embedded && isGlass && "text-pearl",
  );

  const chipActive = isGlass ? "bg-white/12 text-pearl ring-1 ring-white/15" : "bg-sage/10 text-ink shadow-card";
  const chipIdle = isGlass
    ? "bg-white/5 text-pearl/55 hover:bg-white/10 hover:text-pearl"
    : "bg-pearl text-ink shadow-card";

  const noteShell = isGlass
    ? "border border-white/10 bg-white/5 text-pearl"
    : "bg-pearl text-ink shadow-card";

  const noteSub = isGlass ? "text-pearl" : "text-ink-soft";
  const noteHint = isGlass ? "text-pearl-muted" : "text-ink-soft";
  const noteAccent = isGlass ? "text-pearl" : "text-sage";

  const linkLine =
    selected && opposite
      ? {
          x1: polar(NODE, selected.angle).x,
          y1: polar(NODE, selected.angle).y,
          x2: polar(NODE, opposite.angle).x,
          y2: polar(NODE, opposite.angle).y,
        }
      : null;

  return (
    <div
      tabIndex={0}
      className={cn(shell, "outline-none focus-visible:ring-2 focus-visible:ring-offset-2", focusRing)}
      {...(showChrome || embedded ? { "data-glass-surface": "" } : {})}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          cycleColor(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          cycleColor(-1);
        }
        if (event.key === "Escape") clearSelection();
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={cn(
            "flex-1 text-center text-[10px] uppercase tracking-[0.22em] sm:text-left",
            isGlass ? "!text-pearl/70" : "text-sage",
            compact ? "mb-3" : "mb-4",
          )}
        >
          Estrela Ala · bússola de neutralização
        </p>
        {selectedId ? (
          <button
            type="button"
            onClick={clearSelection}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition",
              isGlass
                ? "text-pearl/70 hover:bg-white/10 hover:text-pearl"
                : "text-ink-soft hover:bg-pearl-deep",
            )}
          >
            Limpar
          </button>
        ) : null}
      </div>

      <div className={cn("mx-auto w-full", compact ? "max-w-[220px]" : "max-w-[280px]")}>
        <svg
          viewBox="0 8 340 308"
          className="h-auto w-full touch-manipulation"
          role="img"
          aria-label="Estrela de Oswald interativa"
          aria-describedby={noteId}
        >
          <circle
            cx={CX}
            cy={CY}
            r={146}
            fill="none"
            stroke={ringStroke}
            strokeOpacity={isGlass ? 1 : 0.15}
            strokeWidth={1}
          />
          {COLORS.map((color) => {
            const active = selectedId === color.id || opposite?.id === color.id;
            return (
              <path
                key={`arc-${color.id}`}
                d={arcPath(138, color.angle - 24, color.angle + 24)}
                fill="none"
                stroke={color.hex}
                strokeWidth={active ? 12 : 8}
                strokeLinecap="round"
                opacity={selectedId && !active ? (isGlass ? 0.28 : 0.35) : 0.95}
                style={active ? { filter: isGlass ? `drop-shadow(0 0 10px ${color.hex}88)` : undefined } : undefined}
              />
            );
          })}

          {triangles.map((indexes, triangle) =>
            indexes.map((index, edge) => {
              const next = indexes[(edge + 1) % indexes.length];
              const from = polar(NODE, COLORS[index].angle);
              const to = polar(NODE, COLORS[next].angle);
              return (
                <line
                  key={`dash-${triangle}-${edge}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={dashStroke}
                  strokeOpacity={isGlass ? 1 : 0.35}
                  strokeWidth={1.25}
                  strokeDasharray="2 7"
                  strokeLinecap="round"
                />
              );
            }),
          )}

          {linkLine ? (
            <motion.line
              key={`${selected?.id}-${opposite?.id}`}
              x1={linkLine.x1}
              y1={linkLine.y1}
              x2={linkLine.x2}
              y2={linkLine.y2}
              stroke={linkStroke}
              strokeOpacity={isGlass ? 0.9 : 1}
              strokeWidth={2.75}
              strokeLinecap="round"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}

          <circle cx={CX} cy={CY} r={22} fill={hubFill} stroke={hubStroke} />
          <circle cx={CX} cy={CY} r={3.5} fill={hubCore} />
          {!compact ? (
            <text
              x={CX}
              y={CY + 34}
              textAnchor="middle"
              fill={isGlass ? "rgb(255 255 255 / 0.4)" : "#6B705C"}
              style={{ fontSize: 7, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600, letterSpacing: "0.14em" }}
            >
              NEUTRO
            </text>
          ) : null}

          {COLORS.map((color) => {
            const point = polar(NODE, color.angle);
            const active = selectedId === color.id || opposite?.id === color.id;
            const radius = active ? (compact ? 24 : 28) : compact ? 20 : 24;
            return (
              <g key={color.id}>
                <circle cx={point.x} cy={point.y} r={radius} fill={color.hex} />
                <circle cx={point.x} cy={point.y} r={radius} fill="none" stroke="#FDFBF7" strokeWidth={2.5} />
                {active ? (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={radius + 6}
                    fill="none"
                    stroke={isGlass ? "#FDFBF7" : "#6B705C"}
                    strokeOpacity={isGlass ? 0.55 : 1}
                    strokeWidth={1.4}
                  />
                ) : null}
                <text
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={color.label}
                  pointerEvents="none"
                  style={{
                    fontSize: compact ? 13 : 16,
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {color.mark}
                </text>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={36}
                  fill="transparent"
                  className={cn(
                    "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                    focusRing,
                  )}
                  role="button"
                  tabIndex={0}
                  aria-label={`${color.name}, ${color.role}. Ver cor oposta`}
                  aria-pressed={selectedId === color.id}
                  onClick={() => choose(color.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      choose(color.id);
                    }
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <p
        className={cn(
          "mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.12em]",
          isGlass ? "text-pearl-muted" : "text-ink-soft",
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="h-px w-5 border-t border-dashed border-current opacity-70" aria-hidden />
          Triângulo complementar
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-px w-5 bg-current opacity-70" aria-hidden />
          Par que neutraliza
        </span>
      </p>

      <div
        className={cn(
          "mt-3 gap-2",
          compact ? "grid grid-cols-3" : "grid grid-cols-3",
        )}
        aria-label="Cores da estrela"
      >
        {COLORS.map((color) => {
          const active = selectedId === color.id;
          return (
            <button
              key={color.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(color.id)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-full transition active:scale-[0.98]",
                compact ? "px-2 py-2 text-[10px]" : "px-3 py-2.5 text-[12px]",
                active ? chipActive : chipIdle,
              )}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full ring-1 ring-white/20 sm:h-2.5 sm:w-2.5"
                style={{ backgroundColor: color.hex }}
              />
              <span className={compact ? "sr-only sm:not-sr-only" : undefined}>{color.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id={noteId}
        ref={noteRef}
        className={cn(
          "mt-5 scroll-mb-32 rounded-[24px] px-5 py-4 text-center sm:px-6 sm:py-5",
          compact ? "min-h-[4.5rem]" : "min-h-[5.5rem]",
          noteShell,
        )}
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected?.id ?? "idle"}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <p
              className={cn(
                "font-serif leading-tight",
                compact ? "text-[1.25rem]" : "text-[1.55rem]",
                isGlass ? "text-pearl" : "text-ink",
              )}
            >
              {selected && opposite ? (
                <>
                  {selected.name} pede <em className={noteAccent}>{opposite.name}</em>.
                </>
              ) : (
                "Toque o reflexo que subiu no fio."
              )}
            </p>
            <span className={cn("mt-1.5 block text-sm leading-6", noteSub)}>
              {selected && opposite ? (
                <>
                  <span className="block">{opposite.name} neutraliza o reflexo {selected.name.toLowerCase()}.</span>
                  {!compact ? (
                    <span className={cn("mt-1 block text-[11px] uppercase tracking-[0.14em]", noteHint)}>
                      {selected.salonHint} → {opposite.salonHint}
                    </span>
                  ) : null}
                </>
              ) : (
                "A linha contínua une o par que se anula na bancada."
              )}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
