/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        brand: "#0500FF",
        default: "#FFF",
        base: "#000",
        second_0: "#DDDDDD",
      },
      boxShadow: {
        base_25: "0 0 40px rgba(0, 0, 0, 0.25)",
      },
      transitionProperty: {
        size: "min-height, max-height, min-width, max-width",
      },
    },
  },
  plugins: [],
};
