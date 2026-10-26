import type { Config } from "tailwindcss";

/**
 * GL PRO — Design System tokens.
 * Paleta de luxo (nomes de negócio = aliases técnicos):
 *   Pérola     → #FDFBF7  (fundos globais)
 *   Verde Mate → #6B705C  (ações secundárias / contrastes suaves)
 *   Marrom     → #4A3B32  (tipografia primária / botões de alta conversão)
 */
const perola = "#FDFBF7";
const verdeMate = "#6B705C";
const marrom = "#4A3B32";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        // Tokens oficiais (nomenclatura de negócio)
        perola: perola,
        "verde-mate": verdeMate,
        marrom: marrom,

        // Aliases técnicos usados no código existente
        pearl: perola,
        "pearl-deep": "#F3EEE6",
        paper: perola,
        sage: { DEFAULT: verdeMate, deep: "#525746" },
        ink: { DEFAULT: marrom, soft: marrom },
        graphite: marrom,
        line: "rgb(74 59 50 / 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Segoe UI", "sans-serif"],
        serif: ["var(--font-cormorant)", "Palatino Linotype", "Palatino", "serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      borderColor: {
        // Sem bordas duras: qualquer `border` nasce suave por padrão.
        DEFAULT: "rgb(74 59 50 / 0.08)",
      },
      backdropBlur: {
        // Desfoque cinematográfico para modais/menus.
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        card: "0 28px 70px -28px rgb(74 59 50 / 0.40), 0 4px 16px -4px rgb(74 59 50 / 0.14)",
        float: "0 20px 56px -16px rgb(74 59 50 / 0.55), 0 2px 8px -2px rgb(74 59 50 / 0.18)",
      },
    },
  },
};

export default config;
