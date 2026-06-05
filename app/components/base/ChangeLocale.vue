<script setup>
const { locale, locales, setLocale } = useI18n()

const currentLocale = computed(() => locale.value)

const availableLocales = computed(() => locales.value)

function changeLocale(code) {
  setLocale(code)
}
</script>

<template>
  <v-menu>
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="menuProps"
        icon
        variant="text"
        :aria-label="currentLocale"
      >
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="loc in availableLocales"
        :key="loc.code"
        :active="loc.code === currentLocale"
        @click="changeLocale(loc.code)"
      >
        <v-list-item-title>{{ loc.name || loc.code }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
