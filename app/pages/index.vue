<template>
  <div class="page-home">
    <section class="page-home__hero">
      <h1>{{ appName }}</h1>
      <p>A professionally structured Nuxt 4 application</p>
      <div class="page-home__actions">
        <UiButton variant="primary" @click="refreshHealth">Check Health</UiButton>
        <UiButton variant="secondary" @click="counterStore.increment">
          Count: {{ counterStore.count }}
        </UiButton>
      </div>
    </section>

    <section v-if="health" class="page-home__health">
      <h2>Server Health</h2>
      <pre>{{ JSON.stringify(health, null, 2) }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { HealthCheck } from '#shared/types'

const config = useRuntimeConfig()
const appName = computed(() => config.public.appName)
const counterStore = useCounterStore()

const { data: health, refresh: refreshHealth } = await useFetch<HealthCheck>('/api/health')
</script>

<style scoped>
.page-home__hero {
  text-align: center;
  padding: 4rem 0;
}

.page-home__hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-home__hero p {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.page-home__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.page-home__health {
  margin-top: 3rem;
  text-align: left;
}

.page-home__health h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.page-home__health pre {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  overflow-x: auto;
}
</style>
