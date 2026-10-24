/** @type {import('tailwindcss').Config} */
const pearl = "#FDFBF7";
const sage = "#6B705C";
const ink = "#4A3B32";

const config = {
  theme: {
    extend: {
      colors: {
        pearl,
        "pearl-deep": "#F3EEE6",
        paper: pearl,
        sage: { DEFAULT: sage, deep: "#525746" },
        ink: { DEFAULT: ink, soft: ink },
        graphite: ink,
        line: "rgb(74 59 50 / 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Segoe UI", "sans-serif"],
        serif: ["var(--font-cormorant)", "Palatino Linotype", "Palatino", "serif"],
      },
      boxShadow: {
        card: "0 24px 60px -36px rgb(74 59 50 / 0.28)",
        float: "0 16px 40px -24px rgb(107 112 92 / 0.45)",
      },
    },
  },
};

export default config;
