import { createVuetify } from 'vuetify'
import { ar, en } from 'vuetify/locale'

import '~/assets/scss/settings.scss'

function getCssVariable(name) {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export default defineNuxtPlugin((nuxtApp) => {
  const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'grey']
  const themeColors = Object.fromEntries(
    colors.flatMap((color) =>
      Array.from({ length: 10 }, (_, i) => {
        const value = i === 0 ? 50 : i * 100
        return [`${color}-${value}`, getCssVariable(`--${color}-${value}`)]
      }),
    ),
  )

  const vuetify = createVuetify({
    ssr: false,
    defaults: {
      VBtn: {
        rounded: 'lg',
        variant: 'flat',
        class: 'text-none',
      },
      VCard: {
        rounded: 'lg',
        variant: 'flat',
      },
      VForm: {
        validateOn: 'blur',
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
      },
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    display: {
      mobileBreakpoint: 'sm',
      thresholds: {
        xs: 0,
        sm: 460,
        md: 740,
        lg: 960,
        xl: 1280,
        xxl: 1400,
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            ...themeColors,
            header: getCssVariable('--text-header'),
            body: getCssVariable('--text-body'),
            disabled: getCssVariable('--text-disabled'),
            overlay: getCssVariable('--overlay'),
            'in-progress': getCssVariable('--in-progress'),
          },
        },
      },
    },
    icons: {
      // No custom iconset - use MDI Font (CSS class-based) via @mdi/font
      defaultSet: 'mdi',
    },
    locale: {
      locale: 'ar',
      fallback: 'ar',
      messages: { ar, en },
      rtl: { ar: true, en: false },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
