import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Soft green accent per UI spec
        accent: {
          DEFAULT: "#34d399",
          dark: "#10b981",
        },
        surface: {
          light: "#f3f4f6",
          dark: "#1f2937",
        },
      },
      minHeight: {
        // Minimum touch target per non-negotiable requirements
        touch: "44px",
      },
    },
  },
  plugins: [],
} satisfies Config;
