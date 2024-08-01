/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
