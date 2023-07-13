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
        secondary: "#000",
        borderColor: "#3e3e3e",
        bgColor: "#FFF",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
}