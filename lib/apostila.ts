/**
 * lib/apostila.ts
 * Chave de sessionStorage + mapeamento legado (LessonsPanel → número de página).
 * O conteúdo completo das 33 páginas vive em lib/apostila-content.ts.
 */

export const READER_PAGE_KEY = "glpro.reader.page";

// ─── Legado: IDs das trilhas (usados pelo LessonsPanel) ───────────────────

/** IDs legados das trilhas — mantidos para compatibilidade com LessonsPanel */
export const apostilaPages = [
  {
    id: "abertura",
    index: "T1",
    title: "Arquitetura do Fio e Fundo de Clareamento",
    menu: "Fundo de Clareamento",
    lesson: "A matemática da descoloração",
    duration: "12 min",
  },
  {
    id: "oswald",
    index: "T2",
    title: "A Estrela de Oswald: A Bússola da Neutralização",
    menu: "Estrela de Oswald",
    lesson: "A engenharia dos opostos",
    duration: "18 min",
  },
  {
    id: "oxidantes",
    index: "T3",
    title: "Química da Fixação e Oxidantes",
    menu: "Oxidantes",
    lesson: "Volumagem como ciência",
    duration: "14 min",
  },
] as const;

export type PageId = (typeof apostilaPages)[number]["id"];

/** Mapeia PageId legado para a primeira página do capítulo correspondente (1-33) */
export const LESSON_ENTRY_PAGE: Record<PageId, number> = {
  abertura: 1,   // Capítulo 1 · Tricologia e Estrutura do Fio
  oswald: 17,    // Capítulo 3 · Estrela de Oswald e Neutralização
  oxidantes: 25, // Capítulo 4 · Matemática da Fixação
};

/** @deprecated Use LESSON_ENTRY_PAGE + READER_PAGE_KEY com número de página */
export function isPageId(value: string | null): value is PageId {
  return apostilaPages.some((page) => page.id === value);
}

/** @deprecated Use getPage() de lib/apostila-content.ts */
export function pageById(id: PageId) {
  return apostilaPages.find((page) => page.id === id) ?? apostilaPages[0];
}
