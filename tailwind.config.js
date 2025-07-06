/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",  // Enable dark mode via CSS class 'dark'
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add other folders if you use them, e.g. "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
