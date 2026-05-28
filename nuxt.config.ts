// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      'Krona One': true,
      'Ubuntu': [300, 400, 500, 700]
    }
  },
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },
  app: {
    head: {
      title: 'AIPREMNA.SK - AI Roadmap pre učiteľov',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Interaktívna cesta k umelej inteligencii pre slovenských učiteľov.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      failOnError: false
    }
  }
})
