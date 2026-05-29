import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // deep ocean-night substrate — biotech laboratory at midnight
        void: {
          950: "#02080e",
          900: "#040f1a",
          800: "#08182a",
          700: "#0e253c",
          600: "#163354",
          500: "#1d4368",
        },
        // vital — JADE / EMERALD: life code, cellular renewal, the DNA strand itself (PRIMARY)
        vital: {
          600: "#1bc586",
          500: "#34dba8",
          400: "#5ee5be",
          300: "#8aedd1",
        },
        // pulse — coral / rose: warning, disease, risk, mortality
        pulse: {
          600: "#e44866",
          500: "#ff6b8a",
          400: "#ff89a4",
          300: "#ffb3c4",
        },
        // neuro — violet / amethyst: consciousness, designer choice, AI generation
        neuro: {
          600: "#6f5dde",
          500: "#9986ff",
          400: "#b3a4ff",
          300: "#d0c5ff",
        },
        // clinical — aurora cyan: data, AI bioinformatics, diagnostics
        clinical: {
          600: "#1ea4d4",
          500: "#5ddcff",
          400: "#88e6ff",
          300: "#b6f0ff",
        },
        // bio — SOVEREIGN GOLD: highlight, intentional design, precision (the gold thread)
        bio: {
          600: "#c69a3a",
          500: "#e8c466",
          400: "#f3d77c",
          300: "#fae4a3",
        },
        // light text on void — cool warm-neutral
        ghost: {
          50: "#f6f3ea",
          100: "#ede7d6",
          200: "#cfc5ab",
          300: "#9a917a",
          500: "#665e4f",
          700: "#3a3528",
        },
      },
      fontFamily: {
        display: ['"Sora"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        zh: ['"Noto Serif SC"', "serif"],
      },
      boxShadow: {
        biocard: "inset 0 1px 0 rgba(243,215,124,0.08), 0 24px 60px -28px rgba(0,0,0,0.94)",
        glow: "0 0 40px -8px rgba(232,196,102,0.55)",
        glowclinical: "0 0 36px -8px rgba(93,220,255,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
