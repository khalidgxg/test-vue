<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <v-container fluid class="d-flex align-center pa-4">
    <NuxtLink :to="localePath('/')" class="text-decoration-none">
      <span class="text-h6 font-weight-bold text-primary">BankDash</span>
    </NuxtLink>
    <v-spacer />
    <BaseChangeLocale />
    <v-btn
      variant="text"
      color="primary"
      :to="localePath('/auth/login')"
    >
      {{ t('auth.login') }}
    </v-btn>
  </v-container>
</template>
