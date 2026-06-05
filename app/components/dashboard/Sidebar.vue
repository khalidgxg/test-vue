<script setup>
import { watch } from 'vue'
import { useRoute, useState } from '#app'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

const isSidebarOpen = useState('sidebarOpen', () => true)
const route = useRoute()
const { mdAndUp, mdAndDown } = useDisplay()
const { t } = useI18n()

watch(
  () => route.path,
  () => {
    isSidebarOpen.value = false
  },
)

const navItems = [
  { to: '/', label: 'nav.dashboard', icon: 'mdi-view-dashboard-outline' },
  { to: '/transactions', label: 'nav.transactions', icon: 'mdi-swap-horizontal' },
  { to: '/accounts', label: 'nav.accounts', icon: 'mdi-account-outline' },
  { to: '/investments', label: 'nav.investments', icon: 'mdi-chart-line' },
  { to: '/credit-cards', label: 'nav.credit_cards', icon: 'mdi-credit-card-outline' },
  { to: '/loans', label: 'nav.loans', icon: 'mdi-water-outline' },
  { to: '/services', label: 'nav.services', icon: 'mdi-cog-outline' },
  { to: '/my-privileges', label: 'nav.privileges', icon: 'mdi-check-decagram-outline' },
  { to: '/settings', label: 'nav.settings', icon: 'mdi-cog-outline' },
]
</script>

<template>
  <v-navigation-drawer
    v-model="isSidebarOpen"
    :permanent="mdAndUp"
    :temporary="mdAndDown"
    width="250"
    class="dashboard-sidebar"
    color="surface"
  >
    <div class="sidebar-brand pa-5 d-flex align-center ga-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#396AFF" />
        <path
          d="M10 18C10 18 13 13 18 13C23 13 26 18 26 18"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M10 22C10 22 13 17 18 17C23 17 26 22 26 22"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
        />
      </svg>
      <span class="text-h6 font-weight-bold">BankDash.</span>
    </div>

    <v-list nav density="comfortable" class="px-3">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="t(item.label)"
        rounded="lg"
        color="primary"
        class="sidebar-link mb-1"
        exact
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.dashboard-sidebar :deep(.v-navigation-drawer__border) {
  display: none;
}

.sidebar-brand {
  border-bottom: 1px solid #e6eff5;
  margin-bottom: 0.5rem;
}

.sidebar-link {
  font-weight: 500;
  color: #6b6b6b;
  min-height: 48px;
  border-radius: 0.75rem !important;
}

.sidebar-link :deep(.v-list-item-title) {
  font-size: 0.9375rem;
  font-weight: 500;
}

.sidebar-link.v-list-item--active {
  background-color: rgba(57, 106, 255, 0.08) !important;
  color: #396aff !important;
}

.sidebar-link.v-list-item--active :deep(.v-list-item__prepend > .v-icon) {
  color: #396aff !important;
}
</style>
