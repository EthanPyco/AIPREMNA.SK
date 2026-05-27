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
          primary: '#8175fb', // New Primary Purple
          secondary: '#3d72e5', // New Secondary Blue
          accent: '#7dbcf9', // New Accent Light Blue
          background: '#f8f2f2', // New Off-white Background
          dark: '#140c0b', // New Deep Font Color
        }
      },
      fontFamily: {
        heading: ['Krona One', 'sans-serif'],
        sans: ['Ubuntu', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
