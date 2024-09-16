/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "var(--primary-color)",
        // secondary: "var(--secondary-color)",
        accent: {
          1: "hsl(var(--accent-1) / <alpha-value>)",
          2: "hsl(var(--accent-2) / <alpha-value>)",
        },
        bkg: "hsl(var(--color-bkg) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
    },
  },

  plugins: [],
};
