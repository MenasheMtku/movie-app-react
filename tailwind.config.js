/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "hsl(var(--accent-1) / <alpha-value>)",
          2: "hsl(var(--accent-2) / <alpha-value>)",
        },
        bkg: "hsl(var(--color-bkg) / <alpha-value>)",
        bkgDarker: "hsl(var(--color-bkg-alt) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
        contentDarker: "hsl(var(--color-content-darker) / <alpha-value>)",
        navColor: "hsl(var(--color-nav) / <alpha-value>)",
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
