import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        paper: "#F7F8FA",
        ink: "#0B1220",
        navy: "#0E2A47",
        "navy-deep": "#081B30",
        emerald: "#0F766E",
        "emerald-light": "#5EEAD4",
        "emerald-soft": "#E6F4F1",
        amber: "#D97706",
        line: "#E4E8EE",
        muted: "#5C6675",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: { page: "1240px" },
    },
  },
  plugins: [],
};

export default config;
