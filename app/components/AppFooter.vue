<template>
  <footer class="app-footer">
    <p>&copy; {{ year }} {{ appName }}. All rights reserved.</p>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const appName = computed(() => config.public.appName)
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 1rem 2rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.75rem;
}
</style>
