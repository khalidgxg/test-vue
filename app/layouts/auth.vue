<template>
  <v-app>
    <v-app-bar
      class="header-transparent border-b"
      color="transparent"
      height="80"
      flat
    >
      <AuthHeader />
    </v-app-bar>
    <BaseSharedAlert />
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<style>
.header-transparent {
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(8px);
}
</style>
