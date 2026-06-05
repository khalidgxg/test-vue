<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useState } from '#app'

const isSidebarOpen = useState<boolean>('sidebarOpen', () => false)
const route = useRoute()

watch(
  () => route.path,
  () => {
    isSidebarOpen.value = false
  },
)
</script>

<template>
  <div class="dashboard-layout">
    <DashboardSidebar />

    <div class="dashboard-layout__main">
      <DashboardTopbar />
      <main class="dashboard-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100dvh;
  background-color: var(--color-background);
}

.dashboard-layout__main {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.dashboard-layout__content {
  flex: 1;
  padding: 1.5rem 3rem;
  padding-top: calc(var(--topbar-height) + 1.5rem);
}

@media (max-width: 1024px) {
  .dashboard-layout__main {
    margin-left: 0;
  }

  .dashboard-layout__content {
    padding: 1.25rem;
    padding-top: calc(var(--topbar-height) + 1.25rem);
  }
}
</style>
