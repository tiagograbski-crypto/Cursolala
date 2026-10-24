"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
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
};

const COLORS: StarColor[] = [
  { id: "amarelo", name: "Amarelo", mark: "Am", role: "Primária", hex: "#E2B340", label: "#4A3B32", opposite: "violeta", angle: -90 },
  { id: "laranja", name: "Laranja", mark: "Lr", role: "Secundária", hex: "#D4783A", label: "#4A3B32", opposite: "azul", angle: -30 },
  { id: "vermelho", name: "Vermelho", mark: "Vm", role: "Primária", hex: "#A63D3D", label: "#FDFBF7", opposite: "verde", angle: 30 },
  { id: "violeta", name: "Violeta", mark: "Vi", role: "Secundária", hex: "#6E4C86", label: "#FDFBF7", opposite: "amarelo", angle: 90 },
  { id: "azul", name: "Azul", mark: "Az", role: "Primária", hex: "#3E678F", label: "#FDFBF7", opposite: "laranja", angle: 150 },
  { id: "verde", name: "Verde", mark: "Vd", role: "Secundária", hex: "#5E7D52", label: "#FDFBF7", opposite: "vermelho", angle: 210 },
];

const CX = 170;
const CY = 170;
const NODE = 98;

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

export function OswaldStar() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const selected = selectedId ? colorById(selectedId) : null;
  const opposite = selected ? colorById(selected.opposite) : null;

  function choose(id: string) {
    setSelectedId(id);
    window.setTimeout(() => {
      noteRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 40);
  }

  const triangles = useMemo(
    () => [
      [0, 2, 4],
      [1, 3, 5],
    ],
    [],
  );

  return (
    <div>
      <div className="mx-auto w-full max-w-[280px]">
        <svg viewBox="0 8 340 308" className="h-auto w-full" role="img" aria-label="Estrela de Oswald">
          <circle cx={CX} cy={CY} r={146} fill="none" stroke="#4A3B32" strokeOpacity={0.15} strokeWidth={1} />
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
                opacity={selectedId && !active ? 0.35 : 0.95}
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
                  stroke="#4A3B32"
                  strokeOpacity={0.35}
                  strokeWidth={1.25}
                  strokeDasharray="2 7"
                  strokeLinecap="round"
                />
              );
            }),
          )}

          {selected && opposite ? (
            <line
              x1={polar(NODE, selected.angle).x}
              y1={polar(NODE, selected.angle).y}
              x2={polar(NODE, opposite.angle).x}
              y2={polar(NODE, opposite.angle).y}
              stroke="#6B705C"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ) : null}

          <circle cx={CX} cy={CY} r={22} fill="#FDFBF7" stroke="#E8E5DF" />
          <circle cx={CX} cy={CY} r={3.5} fill="#6B705C" />

          {COLORS.map((color) => {
            const point = polar(NODE, color.angle);
            const active = selectedId === color.id || opposite?.id === color.id;
            const radius = active ? 28 : 24;
            return (
              <g key={color.id}>
                <circle cx={point.x} cy={point.y} r={radius} fill={color.hex} />
                <circle cx={point.x} cy={point.y} r={radius} fill="none" stroke="#FDFBF7" strokeWidth={2.5} />
                {active ? <circle cx={point.x} cy={point.y} r={34} fill="none" stroke="#6B705C" strokeWidth={1.4} /> : null}
                <text
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={color.label}
                  style={{ fontSize: 16, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600 }}
                >
                  {color.mark}
                </text>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={36}
                  fill="transparent"
                  className="cursor-pointer"
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

      <div className="mt-3 grid grid-cols-3 gap-2" aria-label="Cores da estrela">
        {COLORS.map((color) => {
          const active = selectedId === color.id;
          return (
            <button
              key={color.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(color.id)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-[12px]",
                active ? "bg-sage/10 text-ink shadow-card" : "bg-pearl text-ink shadow-card",
              )}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color.hex }} />
              {color.name}
            </button>
          );
        })}
      </div>

      <div
        ref={noteRef}
        className="mt-5 min-h-[5.5rem] scroll-mb-32 rounded-[24px] bg-pearl px-6 py-5 text-center shadow-card"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected?.id ?? "idle"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-serif text-[1.55rem] leading-tight text-ink">
              {selected && opposite ? (
                <>
                  {selected.name} pede <em className="text-sage">{opposite.name}</em>.
                </>
              ) : (
                "Toque uma cor."
              )}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-ink-soft">
              {selected && opposite
                ? `${opposite.name} neutraliza o reflexo ${selected.name.toLowerCase()}.`
                : "A linha contínua mostra o par que se anula."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
