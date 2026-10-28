"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import { chapters, getChapterByPage } from "@/lib/apostila-content";
import { cn } from "@/lib/cn";

interface ApostilaDrawerProps {
  open: boolean;
  currentPage: number;
  onClose: () => void;
  onJump: (page: number) => void;
}

export function ApostilaDrawer({
  open,
  currentPage,
  onClose,
  onJump,
}: ApostilaDrawerProps) {
  const activeChapter = getChapterByPage(currentPage);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="apostila-indice"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            type="button"
            aria-label="Fechar índice"
            className="absolute inset-0 bg-ink/25"
            onClick={onClose}
          />

          <div className="pointer-events-none relative mx-auto h-full w-full max-w-sm">
            <motion.aside
              role="dialog"
              aria-label="Índice da apostila"
              className="pointer-events-auto flex h-full w-full flex-col border-x border-ink/8 bg-pearl px-6 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] text-ink shadow-card"
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ink/40">
                    Apostila Digital
                  </p>
                  <h2 className="mt-1 font-serif text-3xl leading-none text-ink">Capítulos</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl-deep text-ink"
                  aria-label="Fechar"
                >
                  <X strokeWidth={1.5} className="h-4 w-4" />
                </button>
              </div>

              <ol className="mt-8 flex-1 space-y-2 overflow-y-auto">
                {chapters.map((chapter) => {
                  const isActive = chapter.id === activeChapter?.id;
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => onJump(chapter.startPage)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-2xl px-4 py-3.5 text-left transition-all",
                          isActive
                            ? "bg-pearl-deep text-ink shadow-card"
                            : "text-ink/50 hover:bg-pearl-deep/70 hover:text-ink",
                        )}
                      >
                        <span className="mt-0.5 shrink-0 font-serif text-xl leading-none">
                          {chapter.chapterNumber}
                        </span>
                        <span>
                          <span className="block font-serif text-[1.1rem] leading-tight">
                            {chapter.title}
                          </span>
                          <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] text-ink/40">
                            {chapter.subtitle}
                          </span>
                          <span className="mt-1 block text-[10px] text-ink/40">
                            Pág {chapter.startPage}–{chapter.endPage} · {chapter.pages.length} aulas
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-4 rounded-2xl bg-pearl-deep px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink/40">Você está na</p>
                <p className="mt-0.5 font-serif text-xl leading-none text-ink">
                  Página {String(currentPage).padStart(2, "0")}
                </p>
                {activeChapter && (
                  <p className="mt-0.5 text-[11px] text-ink/45">{activeChapter.title}</p>
                )}
              </div>
            </motion.aside>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
