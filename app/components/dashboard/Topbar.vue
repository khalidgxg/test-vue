<script setup>
import { computed } from 'vue'
import { useRoute, useState } from '#app'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const isSidebarOpen = useState('sidebarOpen', () => false)
const { t } = useI18n()
const { mdAndDown } = useDisplay()
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
    height="90"
    color="white"
    class="dashboard-topbar"
  >
    <v-app-bar-nav-icon
      v-if="mdAndDown"
      @click="isSidebarOpen = !isSidebarOpen"
    />

    <v-app-bar-title class="text-h5 font-weight-bold text-grey-darken-4">
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
      bg-color="#F5F7FA"
      rounded="full"
      class="topbar-search d-none d-md-flex"
    />

    <v-btn
      icon
      variant="flat"
      color="#F5F7FA"
      aria-label="settings"
      class="ml-2 topbar-btn"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#718EBF" stroke-width="1.5" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          stroke="#718EBF"
          stroke-width="1.5"
        />
      </svg>
    </v-btn>

    <v-btn
      icon
      variant="flat"
      color="#F5F7FA"
      aria-label="notifications"
      class="ml-1 topbar-btn"
    >
      <v-badge color="#FF4B4A" content="3" offset-x="2" offset-y="2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            stroke="#718EBF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke="#718EBF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </v-badge>
    </v-btn>

    <v-menu offset="8" location="bottom end">
      <template #activator="{ props: menuProps }">
        <v-btn v-bind="menuProps" class="ml-2 px-1" variant="text">
          <v-avatar size="50" class="topbar-avatar">
            <img
              src="https://i.pravatar.cc/120?img=47"
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
.dashboard-topbar {
  border-bottom: 1px solid #e6eff5;
}

.dashboard-topbar :deep(.v-toolbar__content) {
  gap: 0.25rem;
}

.topbar-search {
  max-width: 260px;
}

.topbar-btn {
  width: 50px !important;
  height: 50px !important;
  min-width: 0 !important;
  border-radius: 50% !important;
}

.topbar-avatar {
  border: 1px solid #e6eff5;
}
</style>
