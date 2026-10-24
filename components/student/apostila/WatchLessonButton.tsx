"use client";

import { Play } from "lucide-react";

export function WatchLessonButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-pearl px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-sage shadow-card"
    >
      <Play strokeWidth={1.5} className="h-3.5 w-3.5" />
      Ver Aula Prática
    </button>
  );
}
