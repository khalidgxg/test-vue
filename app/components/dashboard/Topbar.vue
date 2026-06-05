<script setup>
import { computed } from 'vue'
import { useRoute, useState } from '#app'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const isSidebarOpen = useState('sidebarOpen', () => false)
const { t, locale } = useI18n()
const { mdAndDown, mdAndUp } = useDisplay()
const authStore = useAuthStore()
const localePath = useLocalePath()

const title = computed(() => {
  const metaTitle = route.meta.title
  if (typeof metaTitle === 'string') return t(metaTitle)
  return t('nav.dashboard')
})

function onLogout() {
  authStore.logout()
}
</script>

<template>
  <v-app-bar
    flat
    height="70"
    color="surface"
    class="dashboard-topbar"
  >
    <v-app-bar-nav-icon
      v-if="mdAndDown"
      @click="isSidebarOpen = !isSidebarOpen"
    />

    <v-app-bar-title class="text-h6 font-weight-bold">
      {{ title }}
    </v-app-bar-title>

    <v-spacer />

    <v-text-field
      density="compact"
      variant="solo-filled"
      flat
      hide-details
      :placeholder="t('shared.search')"
      prepend-inner-icon="mdi-magnify"
      bg-color="grey-50"
      rounded="full"
      class="topbar-search d-none d-md-flex"
    />

    <BaseChangeLocale />

    <v-btn icon variant="text" aria-label="settings" color="grey-700">
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

    <v-btn icon variant="text" aria-label="notifications" color="grey-700">
      <v-badge color="error" content="3" offset-x="2" offset-y="2">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-menu offset="8">
      <template #activator="{ props: menuProps }">
        <v-btn v-bind="menuProps" icon class="ml-1">
          <v-avatar size="36">
            <img
              src="https://i.pravatar.cc/80?img=47"
              alt="User avatar"
              cover
            >
          </v-avatar>
        </v-btn>
      </template>
      <v-list density="compact" min-width="200">
        <v-list-item
          :to="localePath('/settings')"
          :title="t('nav.settings')"
          prepend-icon="mdi-account-circle-outline"
        />
        <v-divider />
        <v-list-item
          color="error"
          prepend-icon="mdi-logout"
          :title="t('auth.logout')"
          @click="onLogout"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.dashboard-topbar :deep(.v-toolbar__content) {
  gap: 0.5rem;
}

.topbar-search {
  max-width: 260px;
  margin-right: 0.5rem;
}
</style>
