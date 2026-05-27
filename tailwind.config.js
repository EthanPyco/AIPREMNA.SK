/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#EF4444', // Red as per design standard "thicker red lines"
          secondary: '#3B82F6', // Blue as per "blue connection line"
          dark: '#1F2937',
          light: '#F3F4F6',
        }
      }
    },
  },
  plugins: [],
}
