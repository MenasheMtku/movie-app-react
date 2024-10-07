/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // text
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        // background
        bkg: "hsl(var(--color-bkg) / <alpha-value>)",
        bkg_alt: "hsl(var(--color-bkg-alt) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
        content_secondary:
          "hsl(var( --color-content-secondary) / <alpha-value>)",
        navColor: "hsl(var(--color-nav) / <alpha-value>)",
        bkgDarker: "hsl(var(--color-bkg-alt) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
