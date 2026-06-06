<script setup>
const { locale, locales, setLocale } = useI18n()

defineProps({
  variant: {
    type: String,
    default: 'text'
  },
  color: {
    type: String,
    default: 'transparent'
  },
  iconColor: {
    type: String,
    default: 'primary'
  }
})

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
        :variant="variant"
        :color="color"
        :aria-label="currentLocale"
      >
        <v-icon :color="iconColor">mdi-translate</v-icon>
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
