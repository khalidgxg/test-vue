<template>
  <header class="app-header">
    <nav class="app-header__nav">
      <NuxtLink to="/" class="app-header__logo">{{ appName }}</NuxtLink>
      <div class="app-header__links">
        <NuxtLink to="/">Home</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
const config = useRuntimeConfig()
const appName = computed(() => config.public.appName)
</script>

<style scoped>
.app-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 0 2rem;
}

.app-header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
}

.app-header__logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary);
  text-decoration: none;
}

.app-header__links {
  display: flex;
  gap: 1.5rem;
}

.app-header__links a {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  transition: color 0.2s;
}

.app-header__links a:hover,
.app-header__links a.router-link-active {
  color: var(--color-primary);
}
</style>
