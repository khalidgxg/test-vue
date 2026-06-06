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
  { to: '/', label: 'nav.dashboard', icon: 'mdi-home' },
  { to: '/transactions', label: 'nav.transactions', icon: 'mdi-swap-horizontal' },
  { to: '/accounts', label: 'nav.accounts', icon: 'mdi-account-outline' },
  { to: '/investments', label: 'nav.investments', icon: 'mdi-chart-line' },
  { to: '/credit-cards', label: 'nav.credit_cards', icon: 'mdi-credit-card-outline' },
  { to: '/loans', label: 'nav.loans', icon: 'mdi-water-outline' },
  { to: '/services', label: 'nav.services', icon: 'mdi-toolbox-outline' },
  { to: '/my-privileges', label: 'nav.privileges', icon: 'mdi-gift-outline' },
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
    color="white"
    elevation="0"
  >
    <!-- Logo / Brand -->
    <div class="sidebar-brand pa-6 d-flex align-center ga-3">
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
      <span class="text-h6 font-weight-bold text-grey-darken-4">BankDash.</span>
    </div>

    <!-- Nav items -->
    <v-list density="comfortable" class="py-2 sidebar-nav">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="t(item.label)"
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
  min-height: 90px;
}

.sidebar-link {
  position: relative;
  font-weight: 500;
  color: #b1b1b1;
  min-height: 50px;
  border-radius: 0 !important;
  padding-inline-start: 2rem !important;
  padding-inline-end: 1.5rem !important;
  transition: all 0.2s ease;
}

.sidebar-link::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 6px;
  background-color: transparent;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.2s ease;
}

html[dir="rtl"] .sidebar-link::before {
  left: auto;
  right: 0;
  border-radius: 4px 0 0 4px;
}

.sidebar-link :deep(.v-list-item-title) {
  font-size: 0.9375rem;
  font-weight: 500;
}

.sidebar-link :deep(.v-list-item__prepend > .v-icon) {
  color: #b1b1b1;
  font-size: 1.25rem;
  margin-inline-end: 1rem;
}

.sidebar-link.v-list-item--active::before {
  background-color: #396aff;
}

.sidebar-link.v-list-item--active {
  background-color: transparent !important;
  color: #396aff !important;
}

.sidebar-link.v-list-item--active :deep(.v-list-item__prepend > .v-icon) {
  color: #396aff !important;
}

.sidebar-link:hover:not(.v-list-item--active) {
  background-color: rgba(57, 106, 255, 0.04) !important;
  color: #396aff !important;
}

.sidebar-link:hover:not(.v-list-item--active) :deep(.v-list-item__prepend > .v-icon) {
  color: #396aff !important;
}
</style>
