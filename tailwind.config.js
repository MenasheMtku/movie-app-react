/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c2f33",
        secondary: "#e5e5e5",
      },
    },
  },

  plugins: [],
};

// import withMT from "@material-tailwind/react/utils/withMT";
// /** @type {import('tailwindcss').Config} */
// export default withMT({
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     className: "dark",
//     // darkMode: "selector",

//     extend: {},
//   },

//   plugins: [],
// });
