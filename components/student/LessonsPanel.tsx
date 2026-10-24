"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { READER_PAGE_KEY, apostilaPages, type PageId } from "@/lib/apostila";

const locked = {
  title: "Correções de lavatório",
  duration: "18 min",
  note: "Abre depois da estrela e dos oxidantes.",
};

export function LessonsPanel() {
  const router = useRouter();

  function openChapter(id: PageId) {
    window.sessionStorage.setItem(READER_PAGE_KEY, id);
    router.push("/aluna/apostila");
  }

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Prática</p>
      <h1 className="mt-1 font-serif text-[2rem] leading-none text-ink">Aulas</h1>
      <p className="mt-3 text-sm leading-6 text-ink-soft">Cada aula acompanha uma página da apostila. O player abre por cima da leitura.</p>
      <ul className="mt-6 space-y-3">
        {apostilaPages.map((page, index) => (
          <li key={page.id} className="rounded-[24px] bg-pearl px-6 py-6 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                  {String(index + 1).padStart(2, "0")} · {page.duration}
                </p>
                <h2 className="mt-1 font-serif text-[1.45rem] leading-tight text-ink">{page.lesson}</h2>
                <p className="mt-1 text-sm text-ink-soft">{page.title}</p>
              </div>
            </div>
            <Button variant="ghost" className="mt-4 px-4 py-2.5 text-[12px]" onClick={() => openChapter(page.id)}>
              Abrir na apostila
            </Button>
          </li>
        ))}
        <li className="rounded-[24px] bg-pearl px-6 py-6 text-ink shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl-deep text-ink">
              <Lock strokeWidth={1.5} className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-serif text-xl leading-tight text-ink">{locked.title}</h2>
              <p className="text-sm">
                {locked.duration} · {locked.note}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
