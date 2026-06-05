<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useHead({ title: 'Register - BankDash' })
const { t } = useI18n()
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-card class="pa-6" max-width="440" width="100%" elevation="2">
      <h1 class="text-h5 font-weight-bold mb-6">
        {{ t('auth.register') }}
      </h1>
      <v-form>
        <v-text-field label="Name" class="mb-3" />
        <v-text-field label="Email" type="email" class="mb-3" />
        <v-text-field label="Password" type="password" class="mb-3" />
        <v-btn color="primary" block size="large">
          {{ t('auth.register') }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
