import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#1a1a1a",
          800: "#262626",
          700: "#404040",
          500: "#737373",
          200: "#e5e7eb",
        },
        ember: {
          500: "#2f7a3d",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(47,122,61,.22), 0 14px 40px rgba(17,24,39,.12)",
        soft: "0 14px 30px rgba(17,24,39,.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-20%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: ".65" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up .5s ease-out both",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config
