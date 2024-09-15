/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        accent: {
          1: "hsl(var(--accent-1) / <alpha-value>)",
          2: "hsl(var(--accent-2) / <alpha-value>)",
        },
        bkg: "hsl(var(--color-bkg) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
        primary: "#2c2f33",
        secondary: "#e5e5e5",
      },
    },
  },

  plugins: [],
};
