export const apostilaPages = [
  {
    id: "abertura",
    index: "P0",
    title: "Abertura",
    menu: "Manifesto",
    lesson: "A engenharia da cor",
    duration: "8 min",
  },
  {
    id: "oswald",
    index: "P1",
    title: "Estrela de Oswald",
    menu: "Neutralização",
    lesson: "Opostos que se anulam",
    duration: "14 min",
  },
  {
    id: "oxidantes",
    index: "P2",
    title: "Fórmulas e oxidantes",
    menu: "Bancada",
    lesson: "Escolhendo a volumagem",
    duration: "11 min",
  },
] as const;

export type PageId = (typeof apostilaPages)[number]["id"];

export const READER_PAGE_KEY = "glpro.reader.page";

export function isPageId(value: string | null): value is PageId {
  return apostilaPages.some((page) => page.id === value);
}

export function pageById(id: PageId) {
  return apostilaPages.find((page) => page.id === id) ?? apostilaPages[0];
}
