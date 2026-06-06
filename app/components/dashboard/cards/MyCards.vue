<script setup>
import { computed } from 'vue'

defineProps({
  showAddCard: {
    type: Boolean,
    default: false,
  },
})

const { data } = await useApi('/dashboard', { key: 'dashboard' })

const cards = computed(() => data.value?.cards || [])

function formatNumber(num) {
  return num.toLocaleString('en-US')
}
</script>

<template>
  <v-card class="my-cards" elevation="0" rounded="xl">
    <div class="my-cards__header">
      <h2 class="text-h6 font-weight-bold text-grey-darken-4">My Cards</h2>
      <NuxtLink v-if="showAddCard" to="/credit-cards" class="my-cards__link">+ Add Card</NuxtLink>
      <NuxtLink v-else to="/transactions" class="my-cards__link">See All</NuxtLink>
    </div>

    <div class="my-cards__grid">
      <v-card
        v-for="card in cards"
        :key="card.id"
        :class="['my-cards__card', `my-cards__card--${card.theme}`]"
        elevation="0"
      >
        <div class="card__top-content">
          <div class="card__balance-row">
            <div class="card__balance">
              <span class="card__label">Balance</span>
              <span class="card__amount">${{ formatNumber(card.balance) }}</span>
            </div>
            <div class="card__chip">
              <!-- Realistic metallic credit card chip -->
              <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
                <rect width="34" height="30" rx="5" :fill="card.theme === 'dark' ? '#E6EFF5' : '#c6c6c6'" opacity="0.8" />
                <rect x="4" y="4" width="26" height="22" rx="3" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="17" y1="4" x2="17" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="4" y1="15" x2="30" y2="15" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="10" y1="4" x2="10" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="24" y1="4" x2="24" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
              </svg>
            </div>
          </div>

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
          <svg width="44" height="22" viewBox="0 0 44 30" fill="none">
            <circle cx="15" cy="15" r="14" :fill="card.theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(150,150,150,0.5)'" />
            <circle cx="29" cy="15" r="14" :fill="card.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(150,150,150,0.3)'" />
          </svg>
        </div>
      </v-card>
    </div>
  </v-card>
</template>

<style scoped>
.my-cards {
  padding: 1.5rem !important;
  background: transparent !important;
}

.my-cards__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.my-cards__link {
  font-size: 0.9375rem;
  color: #1814f3;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.my-cards__link:hover {
  opacity: 0.7;
}

.my-cards__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.my-cards__card {
  border-radius: 1.25rem !important;
  padding: 0 !important;
  min-height: 220px;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.my-cards__card--dark {
  background: linear-gradient(135deg, #4c49ed 0%, #0a06f4 100%) !important;
  color: white;
}

.my-cards__card--light {
  background: #ffffff !important;
  color: #343c6a;
  border: 1px solid #e6eff5;
}

.card__top-content {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card__balance-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.card__balance {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card__label {
  font-size: 0.75rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.my-cards__card--light .card__label {
  color: #718ebf;
}

.card__amount {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.card__chip {
  flex-shrink: 0;
}

.card__details {
  display: flex;
  gap: 3rem;
  margin-top: auto;
  margin-bottom: 1.25rem;
}

.card__info-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card__detail-label {
  font-size: 0.625rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.my-cards__card--light .card__detail-label {
  color: #718ebf;
}

.card__detail-value {
  font-size: 0.875rem;
  font-weight: 600;
}

.card__number-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: auto;
}

.my-cards__card--dark .card__number-row {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.my-cards__card--light .card__number-row {
  border-top: 1px solid #e6eff5;
  background: transparent;
}

.card__number {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.15em;
}

@media (max-width: 600px) {
  .my-cards__grid {
    grid-template-columns: 1fr;
  }

  .card__details {
    gap: 1.5rem;
  }
}
</style>
