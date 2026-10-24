"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import { apostilaPages, type PageId } from "@/lib/apostila";
import { cn } from "@/lib/cn";

export function ApostilaDrawer({
  open,
  pageId,
  onClose,
  onSelect,
}: {
  open: boolean;
  pageId: PageId;
  onClose: () => void;
  onSelect: (id: PageId) => void;
}) {
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
          key="indice"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            type="button"
            aria-label="Fechar índice"
            className="absolute inset-0 bg-graphite/25"
            onClick={onClose}
          />
          <div className="pointer-events-none relative mx-auto h-full w-full max-w-lg">
            <motion.aside
              role="dialog"
              aria-label="Índice da apostila"
              className="pointer-events-auto flex h-full w-full flex-col bg-pearl px-6 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-card"
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Leitor</p>
                  <h2 className="mt-1 font-serif text-3xl leading-none text-ink">Índice</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl text-ink shadow-card"
                  aria-label="Fechar"
                >
                  <X strokeWidth={1.5} className="h-4 w-4" />
                </button>
              </div>

              <ol className="mt-8 space-y-2">
                {apostilaPages.map((page) => {
                  const active = page.id === pageId;
                  return (
                    <li key={page.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(page.id)}
                        className={cn(
                          "flex w-full items-baseline gap-3 rounded-2xl px-3 py-3 text-left transition",
                          active ? "bg-pearl-deep shadow-card" : "hover:bg-pearl-deep",
                        )}
                      >
                        <span className="w-7 font-serif text-lg text-sage">{page.index}</span>
                        <span>
                          <span className="block font-serif text-xl leading-none text-ink">{page.title}</span>
                          <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                            {page.menu}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </motion.aside>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
