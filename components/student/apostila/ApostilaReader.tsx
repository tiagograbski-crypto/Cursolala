"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { ApostilaDrawer } from "@/components/student/apostila/ApostilaDrawer";
import { VideoSheet } from "@/components/student/apostila/VideoSheet";
import { Watermark } from "@/components/student/apostila/Watermark";
import { ManifestoPage } from "@/components/student/apostila/pages/ManifestoPage";
import { OswaldPage } from "@/components/student/apostila/pages/OswaldPage";
import { OxidantsPage } from "@/components/student/apostila/pages/OxidantsPage";
import {
  apostilaPages,
  READER_PAGE_KEY,
  isPageId,
  pageById,
  type PageId,
} from "@/lib/apostila";
import { cn } from "@/lib/cn";

function PageNavigation({
  pageId,
  onPrev,
  onNext,
}: {
  pageId: PageId;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentIndex = apostilaPages.findIndex((page) => page.id === pageId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < apostilaPages.length - 1;
  const page = pageById(pageId);

  return (
    <div className="sticky bottom-[calc(7.5rem+env(safe-area-inset-bottom))] z-30 mt-auto pt-6 lg:bottom-6">
      <div className="flex items-center justify-between gap-2 rounded-[28px] border border-white/10 bg-zinc-950/80 px-3 py-3 text-pearl shadow-2xl backdrop-blur-3xl sm:gap-3 sm:px-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[12px] transition-all sm:px-5",
            hasPrev
              ? "text-pearl hover:bg-white/10 active:scale-95"
              : "cursor-not-allowed text-white/40",
          )}
          aria-label="Página anterior"
        >
          <ChevronLeft strokeWidth={1.5} className="h-4 w-4" />
          <span className="hidden sm:inline">
            {hasPrev ? apostilaPages[currentIndex - 1]?.index : "—"}
          </span>
          <span className="sm:hidden">Anterior</span>
        </button>

        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">{page.menu}</p>
          <p className="font-serif text-lg leading-none text-pearl">
            {page.index}
            <span className="text-white/40">/{apostilaPages.length}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[12px] transition-all sm:px-5",
            hasNext
              ? "text-pearl hover:bg-white/10 active:scale-95"
              : "cursor-not-allowed text-white/40",
          )}
          aria-label="Próxima página"
        >
          <span className="hidden sm:inline">
            {hasNext ? apostilaPages[currentIndex + 1]?.index : "—"}
          </span>
          <span className="sm:hidden">Próxima</span>
          <ChevronRight strokeWidth={1.5} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ApostilaReader() {
  const [pageId, setPageId] = useState<PageId | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [video, setVideo] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(READER_PAGE_KEY);
    setPageId(isPageId(stored) ? stored : "abertura");
  }, []);

  useEffect(() => {
    if (!pageId) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageId]);

  function selectPage(id: PageId) {
    setPageId(id);
    setVideo(false);
    window.sessionStorage.setItem(READER_PAGE_KEY, id);
    setDrawer(false);
  }

  function goToOffset(offset: number) {
    if (!pageId) return;
    const currentIndex = apostilaPages.findIndex((page) => page.id === pageId);
    const next = apostilaPages[currentIndex + offset];
    if (next) selectPage(next.id);
  }

  if (!pageId) {
    return <div className="min-h-[50vh]" aria-busy="true" aria-label="Abrindo a apostila" />;
  }

  const page = pageById(pageId);

  return (
    <div className="flex min-h-[calc(100dvh-11rem)] flex-col lg:min-h-[calc(100dvh-8.5rem)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Kindle do salão</p>
          <h1 className="mt-1 font-serif text-[1.7rem] leading-none text-ink">Apostila</h1>
        </div>
        <button
          type="button"
          onClick={() => setDrawer(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2.5 text-[12px] text-pearl shadow-2xl backdrop-blur-3xl"
          aria-label="Abrir índice da apostila"
        >
          <Menu strokeWidth={1.5} className="h-4 w-4" />
          Índice
        </button>
      </div>

      <div className="reading relative rounded-[28px] bg-pearl px-6 py-9 shadow-card sm:px-8 sm:py-11">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          <Watermark />
        </div>
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {pageId === "abertura" ? <ManifestoPage onWatch={() => setVideo(true)} /> : null}
              {pageId === "oswald" ? <OswaldPage onWatch={() => setVideo(true)} /> : null}
              {pageId === "oxidantes" ? <OxidantsPage onWatch={() => setVideo(true)} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <PageNavigation
        pageId={pageId}
        onPrev={() => goToOffset(-1)}
        onNext={() => goToOffset(1)}
      />

      <ApostilaDrawer open={drawer} pageId={pageId} onClose={() => setDrawer(false)} onSelect={selectPage} />
      <VideoSheet
        open={video}
        title={page.lesson}
        duration={page.duration}
        onClose={() => setVideo(false)}
      />
    </div>
  );
}
