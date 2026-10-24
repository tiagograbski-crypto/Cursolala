"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Play, X } from "lucide-react";

export function VideoSheet({
  open,
  title,
  duration,
  onClose,
}: {
  open: boolean;
  title: string;
  duration: string;
  onClose: () => void;
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
          key="aula"
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            type="button"
            aria-label="Fechar aula"
            className="absolute inset-0 bg-graphite/35"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label={title}
            className="relative w-full max-w-lg rounded-t-[28px] bg-pearl px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-5 shadow-card"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-pearl-deep" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-sage">Aula prática</p>
                <h3 className="mt-1 font-serif text-2xl leading-tight text-ink">{title}</h3>
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

            <div className="relative mt-5 flex aspect-video items-center justify-center overflow-hidden rounded-[22px] bg-graphite">
              <button
                type="button"
                className="flex h-16 w-16 items-center justify-center rounded-full border border-pearl/50 text-pearl"
                aria-label="Reproduzir placeholder"
              >
                <Play strokeWidth={1.5} className="ml-0.5 h-6 w-6" fill="currentColor" />
              </button>
              <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.16em] text-pearl/80">
                {duration} · player
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              O vídeo da bancada abre neste painel, junto da página. Nada é baixado para fora do espaço.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
