<script setup lang="ts">
const props = defineProps<{
  error: { statusCode: number; message: string }
}>()
function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh;">
        <h1 class="text-h1 font-weight-bold text-primary mb-4">
          {{ props.error.statusCode }}
        </h1>
        <p class="text-h6 mb-6">
          {{ props.error.message || 'Something went wrong' }}
        </p>
        <v-btn color="primary" size="large" @click="handleError">
          Go Home
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>
