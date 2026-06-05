import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
  srcDir: 'app/',
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  css: [
    '~/assets/scss/style.scss',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/scss/_tailwind.scss',
    '~/assets/scss/_variable.scss',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          silenceDeprecations: ['import'],
        },
      },
    },
    build: {
      minify: 'esbuild',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  },
  app: {
    head: {
      titleTemplate: '%s | BankDash',
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'ar', file: 'ar.json', language: 'ar', name: 'العربية', dir: 'rtl' },
      { code: 'en', file: 'en.json', language: 'en', name: 'English', dir: 'ltr' },
    ],
    defaultLocale: 'ar',
    strategy: 'no_prefix',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'BankDash',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  generate: {
    fallback: true,
  },
})
