/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        earth: "#3A2821",
        sand: "#F5DEB3",
        accent: "#7FFFD4",
        highlight: "#007D4D"
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        cursive: ["Alex Brush", "cursive"]
      }
    }
  },
  plugins: []
};