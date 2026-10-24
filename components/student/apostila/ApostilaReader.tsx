"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { ApostilaDrawer } from "@/components/student/apostila/ApostilaDrawer";
import { VideoSheet } from "@/components/student/apostila/VideoSheet";
import { Watermark } from "@/components/student/apostila/Watermark";
import { ManifestoPage } from "@/components/student/apostila/pages/ManifestoPage";
import { OswaldPage } from "@/components/student/apostila/pages/OswaldPage";
import { OxidantsPage } from "@/components/student/apostila/pages/OxidantsPage";
import { READER_PAGE_KEY, isPageId, pageById, type PageId } from "@/lib/apostila";

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
    window.scrollTo(0, 0);
  }, [pageId]);

  function selectPage(id: PageId) {
    setPageId(id);
    setVideo(false);
    window.sessionStorage.setItem(READER_PAGE_KEY, id);
    setDrawer(false);
    if (id === pageId) window.setTimeout(() => window.scrollTo(0, 0), 0);
  }

  if (!pageId) {
    return <div className="min-h-[50vh]" aria-busy="true" aria-label="Abrindo a apostila" />;
  }

  const page = pageById(pageId);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-sage">Kindle do salão</p>
          <h1 className="mt-1 font-serif text-[1.7rem] leading-none text-ink">Apostila</h1>
        </div>
        <button
          type="button"
          onClick={() => setDrawer(true)}
          className="inline-flex items-center gap-2 rounded-full bg-pearl px-5 py-2.5 text-[12px] text-ink shadow-card"
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

      <p className="mt-4 text-center text-[11px] tracking-[0.16em] text-ink-soft">
        {page.index} · {page.menu}
      </p>

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
