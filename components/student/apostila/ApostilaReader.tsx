"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { VideoSheet } from "@/components/student/apostila/VideoSheet";
import { Watermark } from "@/components/student/apostila/Watermark";
import { WatchLessonButton } from "@/components/student/apostila/WatchLessonButton";
import { ApostilaPageRenderer } from "@/components/student/apostila/ApostilaPageRenderer";
import { ApostilaDrawer } from "@/components/student/apostila/ApostilaDrawer";
import { ChapterDivider } from "@/components/student/apostila/ChapterDivider";
import {
  chapters,
  getPage,
  getChapterByPage,
  TOTAL_PAGES,
} from "@/lib/apostila-content";
import { READER_PAGE_KEY } from "@/lib/apostila";
import { cn } from "@/lib/cn";

const CHAPTER_START_PAGES = new Set(
  chapters.filter((c) => c.chapterNumber > 1).map((c) => c.startPage),
);

function ChapterSidebar({
  currentPage,
  onJump,
}: {
  currentPage: number;
  onJump: (page: number) => void;
}) {
  const activeChapter = getChapterByPage(currentPage);

  return (
    <nav
      aria-label="Capítulos da apostila"
      className="sticky top-6 hidden w-56 shrink-0 self-start rounded-[28px] border border-white/10 bg-zinc-950/80 p-4 text-pearl shadow-2xl backdrop-blur-3xl lg:block xl:w-64"
      data-glass-surface=""
    >
      <p className="px-4 text-[10px] uppercase tracking-[0.22em] text-pearl-muted">Conteúdo</p>
      <ul className="mt-4 space-y-1.5">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeChapter?.id;
          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => onJump(chapter.startPage)}
                className={cn(
                  "group w-full rounded-2xl px-4 py-3 text-left transition-all duration-200",
                  isActive ? "bg-white/10" : "hover:bg-white/5",
                )}
              >
                <p
                  className={cn(
                    "text-[10px] uppercase tracking-[0.16em]",
                    isActive ? "text-pearl" : "text-pearl-muted group-hover:text-pearl",
                  )}
                >
                  Capítulo {chapter.chapterNumber} · Pág {chapter.startPage}–{chapter.endPage}
                </p>
                <p
                  className={cn(
                    "mt-0.5 font-serif text-[1rem] leading-snug",
                    isActive ? "text-pearl" : "text-pearl-muted group-hover:text-pearl",
                  )}
                >
                  {chapter.title}
                </p>
                {isActive && (
                  <p className="mt-1 text-[10px] leading-4 text-pearl-muted">{chapter.subtitle}</p>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 px-4">
        <div className="flex justify-between text-[10px] text-pearl-muted">
          <span>Progresso</span>
          <span>{currentPage}/{TOTAL_PAGES}</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-pearl transition-all duration-500"
            style={{ width: `${Math.round((currentPage / TOTAL_PAGES) * 100)}%` }}
          />
        </div>
      </div>
    </nav>
  );
}

function PageNavigation({
  currentPage,
  onPrev,
  onNext,
}: {
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < TOTAL_PAGES;
  const chapter = getChapterByPage(currentPage);

  return (
    <div className="sticky bottom-[calc(7.5rem+env(safe-area-inset-bottom))] z-30 mt-auto pt-6 lg:bottom-6">
      <div
        className="flex items-center justify-between gap-2 rounded-[28px] border border-white/10 bg-zinc-950/80 px-3 py-3 text-pearl shadow-2xl backdrop-blur-3xl sm:gap-3 sm:px-4"
        data-glass-surface=""
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[12px] transition-all sm:px-5",
            hasPrev
              ? "text-pearl hover:bg-white/10 active:scale-95"
              : "cursor-not-allowed text-pearl-muted",
          )}
          aria-label="Página anterior"
        >
          <ChevronLeft strokeWidth={1.5} className="h-4 w-4" />
          <span className="hidden sm:inline">Pág {String(currentPage - 1).padStart(2, "0")}</span>
          <span className="sm:hidden">Anterior</span>
        </button>

        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] text-pearl-muted">
            {chapter ? `Cap. ${chapter.chapterNumber}` : ""}
          </p>
          <p className="font-serif text-lg leading-none text-pearl">
            {String(currentPage).padStart(2, "0")}
            <span className="text-pearl-muted">/{TOTAL_PAGES}</span>
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
              : "cursor-not-allowed text-pearl-muted",
          )}
          aria-label="Próxima página"
        >
          <span className="hidden sm:inline">Pág {String(currentPage + 1).padStart(2, "0")}</span>
          <span className="sm:hidden">Próxima</span>
          <ChevronRight strokeWidth={1.5} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ApostilaReader({ portrait: _portrait }: { portrait: string }) {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(READER_PAGE_KEY);
    const parsed = stored ? parseInt(stored, 10) : NaN;
    const initial =
      !isNaN(parsed) && parsed >= 1 && parsed <= TOTAL_PAGES ? parsed : 1;
    setCurrentPage(initial);
  }, []);

  useEffect(() => {
    if (currentPage === null) return;
    window.sessionStorage.setItem(READER_PAGE_KEY, String(currentPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVideoOpen(false);
  }, [currentPage]);

  function goTo(page: number) {
    const clamped = Math.max(1, Math.min(TOTAL_PAGES, page));
    setCurrentPage(clamped);
    setDrawerOpen(false);
  }

  if (currentPage === null) {
    return (
      <div className="min-h-[50vh]" aria-busy="true" aria-label="Abrindo a apostila" />
    );
  }

  const page = getPage(currentPage);
  const chapter = getChapterByPage(currentPage);
  const isChapterStart = CHAPTER_START_PAGES.has(currentPage);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-sage">
            Acervo Técnico · Colorimetria Magistral
          </p>
          <h1 className="mt-1 font-serif text-[1.75rem] leading-none text-ink">Apostila Digital</h1>
        </div>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2.5 text-[12px] text-pearl shadow-2xl backdrop-blur-3xl lg:hidden"
          aria-label="Abrir índice de capítulos"
        >
          <Menu strokeWidth={1.5} className="h-4 w-4" />
          Capítulos
        </button>
      </div>

      <div className="flex items-start gap-6">
        <ChapterSidebar currentPage={currentPage} onJump={goTo} />

        <div className="flex min-h-[calc(100dvh-11rem)] min-w-0 flex-1 flex-col lg:min-h-[calc(100dvh-8.5rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {isChapterStart && chapter ? <ChapterDivider chapter={chapter} /> : null}

              <div className="relative rounded-[28px] bg-pearl px-6 py-9 shadow-card sm:px-9 sm:py-11">
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                  <Watermark />
                </div>

                <div className="relative z-10">
                  <article className="reading">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-sage">
                      {chapter
                        ? `Cap. ${chapter.chapterNumber} · Pág ${String(currentPage).padStart(2, "0")} de ${TOTAL_PAGES}`
                        : `Pág ${currentPage}`}
                    </p>

                    <h2 className="mt-2 max-w-[22ch] font-serif text-[2rem] leading-[0.98] text-ink">
                      {page?.title ?? "—"}
                    </h2>

                    {page?.hasVideo && chapter ? (
                      <div className="mt-5">
                        <WatchLessonButton onClick={() => setVideoOpen(true)} />
                      </div>
                    ) : null}

                    {page ? (
                      <div className="mt-7">
                        <ApostilaPageRenderer blocks={page.content} />
                      </div>
                    ) : null}
                  </article>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <PageNavigation
            currentPage={currentPage}
            onPrev={() => goTo(currentPage - 1)}
            onNext={() => goTo(currentPage + 1)}
          />
        </div>
      </div>

      <ApostilaDrawer
        open={drawerOpen}
        currentPage={currentPage}
        onClose={() => setDrawerOpen(false)}
        onJump={goTo}
      />

      {chapter ? (
        <VideoSheet
          open={videoOpen}
          title={chapter.videoTitle}
          duration={chapter.videoDuration}
          onClose={() => setVideoOpen(false)}
        />
      ) : null}
    </div>
  );
}
