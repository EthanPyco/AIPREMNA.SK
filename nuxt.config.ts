// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-27',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'sk',
    locales: [
      { code: 'sk', language: 'sk-SK', name: 'Slovenčina', file: 'sk.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: false,
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  ssr: true,

  devServer: {
    port: 3030,
    host: '127.0.0.1',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'sk' },
      title: 'AIPREMNA.SK',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Vzdelávacia roadmapa AI pre slovenských učiteľov' },
      ],
    },
  },

  googleFonts: {
    families: {
      'Krona One': true,
      'Ubuntu': [400, 500, 700],
    },
    display: 'swap',
    download: true,
    inject: true,
  },

  typescript: {
    strict: true,
  },
})
