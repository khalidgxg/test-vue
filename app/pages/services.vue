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

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  title: 'Services',
})

useHead({ title: 'Services - BankDash' })

interface FeaturedService {
  id: number
  title: string
  subtitle: string
  iconBg: string
  icon: string
}

interface BankService {
  id: number
  name: string
  description: string
  iconBg: string
  icon: string
}

const featuredServices: FeaturedService[] = [
  {
    id: 1,
    title: 'Life Insurance',
    subtitle: 'Unlimited protection',
    iconBg: '#E7EDFF',
    icon: '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M15 4C10 4 6 8 6 13C6 19 15 27 15 27C15 27 24 19 24 13C24 8 20 4 15 4Z" stroke="#396AFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 10V16M12 13H18" stroke="#396AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
  },
  {
    id: 2,
    title: 'Shopping',
    subtitle: 'Buy. Think. Grow.',
    iconBg: '#FFF5D9',
    icon: '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M6 7H8L10 19H22L24 11H10" stroke="#FFBB38" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="22" r="1.5" fill="#FFBB38"/><circle cx="20" cy="22" r="1.5" fill="#FFBB38"/></svg>',
  },
  {
    id: 3,
    title: 'Safety',
    subtitle: 'We are your allies',
    iconBg: '#DCFAF8',
    icon: '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M15 4L6 8V15C6 20 10 24.5 15 26C20 24.5 24 20 24 15V8L15 4Z" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 15L13.5 17.5L19 12" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
]

const bankServices: BankService[] = [
  {
    id: 1,
    name: 'Business loans',
    description: 'It is a long established',
    iconBg: '#FFE0EB',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="#FF4B4A" stroke-width="1.5"/><path d="M4 19C4 16 7 14 11 14C15 14 18 16 18 19" stroke="#FF4B4A" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    id: 2,
    name: 'Checking accounts',
    description: 'It is a long established',
    iconBg: '#FFF5D9',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="12" rx="2" stroke="#FFBB38" stroke-width="1.5"/><path d="M3 9H19" stroke="#FFBB38" stroke-width="1.5"/><path d="M7 13H10" stroke="#FFBB38" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    id: 3,
    name: 'Savings accounts',
    description: 'It is a long established',
    iconBg: '#FFE0EB',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 18V8L11 4L18 8V18H4Z" stroke="#FF4B4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="13" width="6" height="5" stroke="#FF4B4A" stroke-width="1.5"/></svg>',
  },
  {
    id: 4,
    name: 'Debit and credit cards',
    description: 'It is a long established',
    iconBg: '#E7EDFF',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="7" stroke="#396AFF" stroke-width="1.5"/><path d="M11 8V14M8 11H14" stroke="#396AFF" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    id: 5,
    name: 'Life Insurance',
    description: 'It is a long established',
    iconBg: '#DCFAF8',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C7 3 4 6 4 10C4 14 11 20 11 20C11 20 18 14 18 10C18 6 15 3 11 3Z" stroke="#16DBCC" stroke-width="1.5" stroke-linecap="round"/><path d="M11 7V13M8 10H14" stroke="#16DBCC" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    id: 6,
    name: 'Business loans',
    description: 'It is a long established',
    iconBg: '#FFE0EB',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="#FF4B4A" stroke-width="1.5"/><path d="M4 19C4 16 7 14 11 14C15 14 18 16 18 19" stroke="#FF4B4A" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
]
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
