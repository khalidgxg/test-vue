<template>
  <v-app>
    <DashboardSidebar />

    <v-main>
      <DashboardTopbar />
      <v-container fluid class="dashboard-content pa-6">
        <slot />
      </v-container>
    </v-main>

    <BaseSharedAlert />
  </v-app>
</template>

<style scoped>
.dashboard-content {
  background-color: var(--color-background);
  min-height: 100vh;
}
</style>
