/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        silver: {
          "100": "#c1bdbd",
          "200": "#c0bdbd",
        },
        gainsboro: {
          "100": "#dedede",
          "200": "#ddd",
        },
        black: "#000",
        dimgray: "#676767",
        lightgray: "#cdcdcd",
        whitesmoke: {
          "100": "#f4f4f4",
          "200": "#f3f3f3",
        },
        gray: {
          "100": "#797979",
          "200": "#080808",
        },
        blueviolet: "#4b36cd",
        darkslateblue: "#0054a1",
        mediumslateblue: "#735cf2",
        darkgray: "#999",
        darkslategray: "#2d2d2d",
        slateblue: "#4534ac",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        barlow: "Barlow",
      },
    },
   
    screens: {
      mq625: {
        raw: "screen and (max-width: 625px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

module.exports = config;
