"use client";

import { useEffect, useState, type ReactNode } from "react";

const HOLD_MS = 1800;

/**
 * Hexagrama de dois triângulos equiláteros no viewBox 100×100.
 * Circunraio 40, centro (50, 50): o de cima aponta para o topo, o de baixo para a base.
 */
const TRIANGLE_UP = "50,10 84.64,70 15.36,70";
const TRIANGLE_DOWN = "50,90 15.36,30 84.64,30";

export function OswaldPreloader({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isLoading) return children;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-28 w-28 animate-oswald-beat text-white/70"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <polygon points={TRIANGLE_UP} />
        <polygon points={TRIANGLE_DOWN} />
      </svg>
      <p className="mt-8 font-serif tracking-[0.4em] text-[10px] text-white/50">Autenticando Licença...</p>
    </div>
  );
}
