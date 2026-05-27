import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.ts',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8175fb',
        secondary: '#3d72e5',
        accent: '#7dbcf9',
        bg: '#f8f2f2',
        ink: '#140c0b',
      },
      fontFamily: {
        heading: ['"Krona One"', 'sans-serif'],
        body: ['Ubuntu', 'sans-serif'],
      },
    },
  },
}
