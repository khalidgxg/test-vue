<template>
  <div class="services-page">
    <!-- Featured Services Row -->
    <div class="services-page__featured">
      <div v-for="feature in featuredServices" :key="feature.id" class="featured-card">
        <div class="featured-card__icon" :style="{ backgroundColor: feature.iconBg }">
          <span v-html="feature.icon"></span>
        </div>
        <div class="featured-card__info">
          <span class="featured-card__title">{{ feature.title }}</span>
          <span class="featured-card__subtitle">{{ feature.subtitle }}</span>
        </div>
      </div>
    </div>

    <!-- Bank Services List -->
    <div class="services-page__list-section">
      <h2 class="services-page__section-title">Bank Services List</h2>
      <div class="services-list">
        <div v-for="service in bankServices" :key="service.id" class="service-row">
          <!-- Icon -->
          <div class="service-row__icon" :style="{ backgroundColor: service.iconBg }">
            <span v-html="service.icon"></span>
          </div>

          <!-- Name & description -->
          <div class="service-row__main">
            <span class="service-row__name">{{ service.name }}</span>
            <span class="service-row__desc">{{ service.description }}</span>
          </div>

          <!-- Extra columns -->
          <div class="service-row__col">
            <span class="service-row__col-label">Lorem Ipsum</span>
            <span class="service-row__col-value">Many publishing</span>
          </div>
          <div class="service-row__col">
            <span class="service-row__col-label">Lorem Ipsum</span>
            <span class="service-row__col-value">Many publishing</span>
          </div>
          <div class="service-row__col">
            <span class="service-row__col-label">Lorem Ipsum</span>
            <span class="service-row__col-value">Many publishing</span>
          </div>

          <!-- Action -->
          <button class="service-row__btn">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

definePageMeta({
  
  title: 'Services',
})

useHead({ title: 'Services - BankDash' })

const { data } = await useApi('/services')

const featuredServices = computed(() => data.value?.featured_services || [])
const bankServices = computed(() => data.value?.bank_services || [])
</script>

<style scoped>
.services-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Featured row ─────────────────────────────── */
.services-page__featured {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.featured-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: box-shadow 0.2s ease;
}

.featured-card:hover {
  box-shadow: var(--shadow-md);
}

.featured-card__icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.featured-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.featured-card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
}

.featured-card__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

/* ── Section title ────────────────────────────── */
.services-page__section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

/* ── Service list ─────────────────────────────── */
.services-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.service-row {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: box-shadow 0.2s ease;
}

.service-row:hover {
  box-shadow: var(--shadow-sm);
}

.service-row__icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-row__main {
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.service-row__name {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.service-row__desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.service-row__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.service-row__col-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
}

.service-row__col-value {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}

.service-row__btn {
  border: 1.5px solid var(--color-border);
  background: none;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.service-row__btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 1100px) {
  .services-page__featured {
    grid-template-columns: 1fr;
  }

  .service-row__col {
    display: none;
  }
}

@media (max-width: 768px) {
  .service-row__main {
    min-width: 0;
    flex: 1;
  }
}
</style>
