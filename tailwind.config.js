/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#727272",
        secondary: "#ED4C42",
        borderColor: "#3e3e3e",
        bgColor: "#111",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
}