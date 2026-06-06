<template>
  <v-app>
    <DashboardSidebar />

    <v-main class="dashboard-main">
      <DashboardTopbar />
      <v-container fluid class="dashboard-content pa-6">
        <slot />
      </v-container>
    </v-main>

    <BaseSharedAlert />
  </v-app>
</template>

<style>
.dashboard-main {
  background-color: #ffffff;
  min-height: 100vh;
  padding-inline-start: 250px !important;
}

.dashboard-content {
  background-color: #f5f7fa;
  min-height: calc(100vh - 90px);
}

@media (max-width: 960px) {
  .dashboard-main {
    padding-inline-start: 0 !important;
  }
}
</style>
