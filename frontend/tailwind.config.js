/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'audeo-orange': '#FF6600',
        'audeo-orange-hover': '#e55a00',
        'audeo-gray': '#3E424B',
        'audeo-gray-light': '#4a4f59',
        'audeo-gray-dark': '#2c3037',
      }
    },
  },
  plugins: [],
};