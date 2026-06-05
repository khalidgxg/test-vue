<template>
  <div class="my-cards">
    <div class="my-cards__header">
      <h2 class="my-cards__title">My Cards</h2>
      <NuxtLink v-if="showAddCard" to="/credit-cards" class="my-cards__link">+ Add Card</NuxtLink>
      <NuxtLink v-else to="/transactions" class="my-cards__link">See All</NuxtLink>
    </div>

    <div class="my-cards__grid">
      <div v-for="card in cards" :key="card.id" :class="['card', `card--${card.theme}`]">
        <div class="card__top">
          <div class="card__balance">
            <span class="card__label">Balance</span>
            <span class="card__amount">${{ formatNumber(card.balance) }}</span>
          </div>
          <div class="card__chip">
            <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
              <rect
                x="2"
                y="6"
                width="32"
                height="24"
                rx="5"
                :fill="card.theme === 'dark' ? '#FFE9A3' : '#DDD'"
              />
              <path
                d="M2 14H34M2 22H34M13 6V30M23 6V30"
                :stroke="card.theme === 'dark' ? '#D9A627' : '#B0B0B0'"
                stroke-width="1.5"
              />
            </svg>
          </div>
        </div>

        <div class="card__bottom">
          <div class="card__details">
            <div class="card__info-group">
              <span class="card__detail-label">CARD HOLDER</span>
              <span class="card__detail-value">{{ card.holder }}</span>
            </div>
            <div class="card__info-group">
              <span class="card__detail-label">VALID THRU</span>
              <span class="card__detail-value">{{ card.expiry }}</span>
            </div>
          </div>
        </div>

        <div class="card__number-row">
          <span class="card__number">{{ card.number }}</span>
          <div class="card__brand">
            <svg width="44" height="30" viewBox="0 0 44 30" fill="none">
              <circle
                cx="15"
                cy="15"
                r="14"
                :fill="card.theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(150,150,150,0.5)'"
              />
              <circle
                cx="29"
                cy="15"
                r="14"
                :fill="card.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(150,150,150,0.3)'"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '#shared/types'

defineProps({
  showAddCard: {
    type: Boolean,
    default: false,
  },
})

const { data } = await useApi<{
  cards: Card[]
}>('/dashboard', { key: 'dashboard' })

const cards = computed(() => data.value?.cards || [])

function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}
</script>

<style scoped>
.my-cards__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.my-cards__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.my-cards__link {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.my-cards__link:hover {
  color: var(--color-primary);
}

.my-cards__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.card {
  border-radius: 1.5rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  min-height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card--dark {
  background: linear-gradient(107deg, #4c49ed 0%, #0a06f4 100%);
  color: white;
}

.card--light {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card__balance {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card__label {
  font-size: 0.6875rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.card__amount {
  font-size: 1.375rem;
  font-weight: 700;
}

.card__bottom {
  margin: 0.5rem 0;
}

.card__details {
  display: flex;
  gap: 3rem;
}

.card__info-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card__detail-label {
  font-size: 0.625rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.card__detail-value {
  font-size: 0.875rem;
  font-weight: 600;
}

.card__number-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.card--light .card__number-row {
  border-top-color: var(--color-border);
}

.card__number {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.15em;
}

@media (max-width: 768px) {
  .my-cards__grid {
    grid-template-columns: 1fr;
  }
}
</style>
