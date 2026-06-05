<script setup lang="ts">
import { useLocale } from 'vuetify'

const { locale } = useI18n()
const { current } = useLocale()
const globalStore = useGlobalStore()

if (import.meta.client) {
  // Lazy fetch global settings on client
  void globalStore
}

watch(locale, (newLocale) => {
  useHead({
    htmlAttrs: {
      lang: newLocale,
      dir: newLocale === 'en' ? 'ltr' : 'rtl',
    },
  })
  current.value = newLocale as 'ar' | 'en'
})

onMounted(() => {
  useHead({
    htmlAttrs: {
      lang: locale.value,
      dir: locale.value === 'en' ? 'ltr' : 'rtl',
    },
  })
  current.value = locale.value as 'ar' | 'en'
})
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
