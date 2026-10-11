/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#131313",
        "surface-dim": "#131313",
        "surface-bright": "#3a3939",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#c4c7c8",
        outline: "#8e9192",
        "outline-variant": "#444748",
        secondary: "#c7c6c6",
        primary: "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.25em",
      },
    },
  },
  plugins: [],
}
