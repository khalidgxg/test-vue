// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
  srcDir: 'app/',
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  css: ['~/assets/styles/main.css'],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Vue Test App',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
    },
  },
  alias: {
    '#shared': resolve(__dirname, 'shared'),
  },
  app: {
    head: {
      titleTemplate: '%s | Vue Test App',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
})
