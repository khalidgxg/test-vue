<script setup lang="ts">
const globalStore = useGlobalStore()
const authStore = useAuthStore()
const route = useRoute()
const { t } = useI18n()

const title = computed(() => {
  return (route.meta.title as string) || t('nav.dashboard')
})

function onLogout() {
  authStore.logout()
}
</script>

<template>
  <v-container fluid class="d-flex align-center pa-4">
    <v-app-bar-title class="text-h6 font-weight-bold">
      {{ title }}
    </v-app-bar-title>
    <v-spacer />
    <BaseChangeLocale />
    <v-btn
      v-if="authStore.isAuthenticated"
      icon
      variant="text"
      aria-label="logout"
      @click="onLogout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <v-avatar v-if="authStore.isAuthenticated" size="40" class="ml-2">
      <v-icon>mdi-account-circle</v-icon>
    </v-avatar>
    <span v-else class="text-caption">{{ globalStore.alert.message }}</span>
  </v-container>
</template>
