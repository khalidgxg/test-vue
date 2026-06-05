<template>
  <div class="credit-cards-page">
    <!-- My Cards Section -->
    <section class="credit-cards-page__section">
      <h2 class="credit-cards-page__section-title">My Cards</h2>
      <div class="cc-cards-grid">
        <div v-for="card in myCards" :key="card.id" :class="['cc-card', `cc-card--${card.theme}`]">
          <div class="cc-card__top">
            <div class="cc-card__balance">
              <span class="cc-card__label">Balance</span>
              <span class="cc-card__amount">${{ formatNumber(card.balance) }}</span>
            </div>
            <div class="cc-card__chip">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <rect
                  x="2"
                  y="6"
                  width="32"
                  height="24"
                  rx="5"
                  :fill="card.theme === 'dark' || card.theme === 'dark2' ? '#FFE9A3' : '#DDD'"
                />
                <path
                  d="M2 14H34M2 22H34M13 6V30M23 6V30"
                  :stroke="card.theme === 'dark' || card.theme === 'dark2' ? '#D9A627' : '#B0B0B0'"
                  stroke-width="1.5"
                />
              </svg>
            </div>
          </div>
          <div class="cc-card__bottom">
            <div class="cc-card__details">
              <div class="cc-card__info-group">
                <span class="cc-card__detail-label">CARD HOLDER</span>
                <span class="cc-card__detail-value">{{ card.holder }}</span>
              </div>
              <div class="cc-card__info-group">
                <span class="cc-card__detail-label">VALID THRU</span>
                <span class="cc-card__detail-value">{{ card.expiry }}</span>
              </div>
            </div>
          </div>
          <div class="cc-card__number-row">
            <span class="cc-card__number">{{ card.number }}</span>
            <div class="cc-card__brand">
              <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
                <circle
                  cx="15"
                  cy="14"
                  r="13"
                  :fill="
                    card.theme === 'dark' || card.theme === 'dark2'
                      ? 'rgba(255,255,255,0.5)'
                      : 'rgba(140,140,140,0.4)'
                  "
                />
                <circle
                  cx="29"
                  cy="14"
                  r="13"
                  :fill="
                    card.theme === 'dark' || card.theme === 'dark2'
                      ? 'rgba(255,255,255,0.3)'
                      : 'rgba(140,140,140,0.25)'
                  "
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Middle Row: Expense Statistics + Card List -->
    <div class="credit-cards-page__middle">
      <!-- Expense Statistics (Donut Chart) -->
      <section class="cc-section-card">
        <h2 class="cc-section-card__title">Card Expense Statistics</h2>
        <div class="donut-chart-wrapper">
          <svg viewBox="-5 -5 210 210" class="donut-svg">
            <g transform="translate(100,100)">
              <path
                v-for="(seg, i) in donutSegments"
                :key="i"
                :d="seg.path"
                :fill="seg.color"
                stroke="#fff"
                stroke-width="4"
                class="donut-segment"
              />
            </g>
          </svg>
          <div class="donut-legend">
            <div v-for="item in donutLegend" :key="item.label" class="donut-legend__item">
              <span class="donut-legend__dot" :style="{ backgroundColor: item.color }"></span>
              <span class="donut-legend__label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Card List -->
      <section class="cc-section-card">
        <h2 class="cc-section-card__title">Card List</h2>
        <div class="card-list">
          <div v-for="cl in cardList" :key="cl.id" class="card-list-item">
            <div class="card-list-item__icon" :style="{ backgroundColor: cl.iconBg }">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect
                  x="2"
                  y="4"
                  width="16"
                  height="12"
                  rx="2"
                  :stroke="cl.iconColor"
                  stroke-width="1.5"
                />
                <path d="M2 8H18" :stroke="cl.iconColor" stroke-width="1.5" />
                <path
                  d="M5 13H8"
                  :stroke="cl.iconColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="card-list-item__col">
              <span class="card-list-item__label">Card Type</span>
              <span class="card-list-item__value">{{ cl.cardType }}</span>
            </div>
            <div class="card-list-item__col">
              <span class="card-list-item__label">Bank</span>
              <span class="card-list-item__value">{{ cl.bank }}</span>
            </div>
            <div class="card-list-item__col">
              <span class="card-list-item__label">Card Number</span>
              <span class="card-list-item__value">{{ cl.number }}</span>
            </div>
            <div class="card-list-item__col">
              <span class="card-list-item__label">Namain Card</span>
              <span class="card-list-item__value">{{ cl.nameOnCard }}</span>
            </div>
            <button class="card-list-item__btn">View Details</button>
          </div>
        </div>
      </section>
    </div>

    <!-- Bottom Row: Add New Card + Card Setting -->
    <div class="credit-cards-page__bottom">
      <!-- Add New Card -->
      <section class="cc-section-card cc-section-card--add">
        <h2 class="cc-section-card__title">Add New Card</h2>
        <p class="cc-add-card__description">
          Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned
          to a Cardholder, with a credit limit, that can be used to purchase goods and services on
          credit or obtain cash advances.
        </p>
        <form class="cc-add-card__form" @submit.prevent="handleAddCard">
          <div class="cc-form-row">
            <div class="cc-form-group">
              <label class="cc-form-label" for="card-type">Card Type</label>
              <input
                id="card-type"
                v-model="newCard.type"
                type="text"
                placeholder="Classic"
                class="cc-form-input"
              />
            </div>
            <div class="cc-form-group">
              <label class="cc-form-label" for="name-on-card">Name On Card</label>
              <input
                id="name-on-card"
                v-model="newCard.name"
                type="text"
                placeholder="My Cards"
                class="cc-form-input"
              />
            </div>
          </div>
          <div class="cc-form-row">
            <div class="cc-form-group">
              <label class="cc-form-label" for="card-number">Card Number</label>
              <input
                id="card-number"
                v-model="newCard.number"
                type="text"
                placeholder="**** **** **** ****"
                class="cc-form-input"
                maxlength="19"
              />
            </div>
            <div class="cc-form-group">
              <label class="cc-form-label" for="expiry-date">Expiration Date</label>
              <input
                id="expiry-date"
                v-model="newCard.expiry"
                type="text"
                placeholder="25 January 2025"
                class="cc-form-input"
              />
            </div>
          </div>
          <button type="submit" class="cc-add-card__submit">Add Card</button>
        </form>
      </section>

      <!-- Card Setting -->
      <section class="cc-section-card cc-section-card--setting">
        <h2 class="cc-section-card__title">Card Setting</h2>
        <div class="card-settings-list">
          <div v-for="setting in cardSettings" :key="setting.id" class="card-setting-item">
            <div class="card-setting-item__icon" :style="{ backgroundColor: setting.iconBg }">
              <span v-html="setting.icon"></span>
            </div>
            <div class="card-setting-item__info">
              <span class="card-setting-item__title">{{ setting.title }}</span>
              <span class="card-setting-item__subtitle">{{ setting.subtitle }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Credit Cards',
})

useHead({ title: 'Credit Cards - BankDash' })

const { data } = await useApi('/credit-cards')

const myCards = computed(() => data.value?.my_cards || [])

function formatNumber(num) {
  return num.toLocaleString('en-US')
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
const donutData = computed(() => data.value?.donut_data || [])

const donutLegend = computed(() => {
  const dataList = donutData.value
  return [...dataList].sort((a, b) => b.value - a.value)
})

const donutSegments = computed(() => {
  const segments = []
  let currentAngle = -90
  const outerR = 90
  const innerR = 43
  const gap = 3

  for (const item of donutData.value) {
    const angle = (item.value / 100) * 360
    const start = currentAngle + gap / 2
    const end = currentAngle + angle - gap / 2

    const toRad = (deg) => (deg * Math.PI) / 180
    const x1 = outerR * Math.cos(toRad(start))
    const y1 = outerR * Math.sin(toRad(start))
    const x2 = outerR * Math.cos(toRad(end))
    const y2 = outerR * Math.sin(toRad(end))
    const ix1 = innerR * Math.cos(toRad(end))
    const iy1 = innerR * Math.sin(toRad(end))
    const ix2 = innerR * Math.cos(toRad(start))
    const iy2 = innerR * Math.sin(toRad(start))
    const large = end - start > 180 ? 1 : 0

    const path = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`
    segments.push({ path, color: item.color })
    currentAngle += angle
  }
  return segments
})

// ── Card List ─────────────────────────────────────────────────────────────────
const cardList = computed(() => {
  const cards = myCards.value
  const bgMap = {
    Visa: '#E7EDFF',
    Mastercard: '#FFE0EB',
  }
  const colorMap = {
    Visa: '#396AFF',
    Mastercard: '#FF4B4A',
  }
  return cards.map(c => ({
    id: c.id,
    cardType: 'Secondary',
    bank: c.cardType === 'Visa' ? 'DBL Bank' : 'BRC Bank',
    number: '**** **** ' + c.number.slice(-4),
    nameOnCard: c.holder.split(' ')[0] || c.holder,
    iconBg: bgMap[c.cardType] || '#FFF5D9',
    iconColor: colorMap[c.cardType] || '#FFBB38'
  }))
})

// ── Add New Card Form ─────────────────────────────────────────────────────────
const newCard = ref({ type: '', name: '', number: '', expiry: '' })

function handleAddCard() {
  console.log('Adding card:', newCard.value)
  newCard.value = { type: '', name: '', number: '', expiry: '' }
}

// ── Card Settings ─────────────────────────────────────────────────────────────
const cardSettings = [
  {
    id: 1,
    title: 'Block Card',
    subtitle: 'Instantly block your card',
    iconBg: '#FFF5D9',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="12" rx="2" stroke="#FFBB38" stroke-width="1.5"/><path d="M3 9H19" stroke="#FFBB38" stroke-width="1.5"/></svg>',
  },
  {
    id: 2,
    title: 'Change Pin Code',
    subtitle: 'Choose another pin code',
    iconBg: '#E7EDFF',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="7" y="3" width="8" height="10" rx="2" stroke="#396AFF" stroke-width="1.5"/><path d="M5 11H17V19H5V11Z" stroke="#396AFF" stroke-width="1.5"/><circle cx="11" cy="15" r="1.5" fill="#396AFF"/></svg>',
  },
  {
    id: 3,
    title: 'Add to Google Pay',
    subtitle: 'Withdraw without any card',
    iconBg: '#FFE0EB',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="#FF4B4A" stroke-width="1.5"/><path d="M8 11H14M11 8V14" stroke="#FF4B4A" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    id: 4,
    title: 'Add to Apple Pay',
    subtitle: 'Withdraw without any card',
    iconBg: '#DCFAF8',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 4C8 4 6 6.5 6 9C6 13 9 18 11 21C13 18 16 13 16 9C16 6.5 14 4 11 4Z" stroke="#16DBCC" stroke-width="1.5"/><circle cx="11" cy="9" r="2" fill="#16DBCC"/></svg>',
  },
  {
    id: 5,
    title: 'Add to Apple Store',
    subtitle: 'Withdraw without any card',
    iconBg: '#DCFAF8',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 4C8 4 6 6.5 6 9C6 13 9 18 11 21C13 18 16 13 16 9C16 6.5 14 4 11 4Z" stroke="#16DBCC" stroke-width="1.5"/><circle cx="11" cy="9" r="2" fill="#16DBCC"/></svg>',
  },
]
</script>

<style scoped>
.credit-cards-page {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* ── Section title (page-level) ─────────────────── */
.credit-cards-page__section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

/* ── My Cards Grid ───────────────────────────────── */
.cc-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Card */
.cc-card {
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
}

.cc-card--dark {
  background: linear-gradient(107deg, #4c49ed 0%, #0a06f4 100%);
  color: white;
}

.cc-card--dark2 {
  background: linear-gradient(107deg, #2d2bcc 0%, #1a18c0 100%);
  color: white;
}

.cc-card--light {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.cc-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cc-card__balance {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cc-card__label {
  font-size: 0.6875rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.cc-card__amount {
  font-size: 1.375rem;
  font-weight: 700;
}

.cc-card__bottom {
  margin: 0.5rem 0;
}

.cc-card__details {
  display: flex;
  gap: 3rem;
}

.cc-card__info-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cc-card__detail-label {
  font-size: 0.625rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.cc-card__detail-value {
  font-size: 0.875rem;
  font-weight: 600;
}

.cc-card__number-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.cc-card--light .cc-card__number-row {
  border-top-color: var(--color-border);
}

.cc-card__number {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.12em;
}

/* ── Middle Row ─────────────────────────────────── */
.credit-cards-page__middle {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* ── Section card (shared container) ───────────── */
.cc-section-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.cc-section-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

/* ── Donut chart ────────────────────────────────── */
.donut-chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

.donut-svg {
  /* viewBox is 220x220 so width matches that */
  width: 210px;
  height: 210px;
  overflow: visible;
}

.donut-segment {
  transition:
    opacity 0.2s ease,
    filter 0.2s ease;
  cursor: pointer;
}

.donut-segment:hover {
  opacity: 0.88;
  filter: brightness(1.05);
}

.donut-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem 2rem;
  width: 100%;
  padding: 0 0.25rem;
}

.donut-legend__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.donut-legend__dot {
  width: 13px;
  height: 13px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.donut-legend__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 500;
}

/* ── Card List ──────────────────────────────────── */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.card-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: box-shadow 0.2s ease;
}

.card-list-item:hover {
  box-shadow: var(--shadow-sm);
}

.card-list-item__icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-list-item__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-list-item__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}

.card-list-item__value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
}

.card-list-item__btn {
  background: none;
  border: none;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  white-space: nowrap;
  padding: 0.25rem 0;
  transition: opacity 0.2s ease;
}

.card-list-item__btn:hover {
  opacity: 0.75;
}

/* ── Bottom Row ─────────────────────────────────── */
.credit-cards-page__bottom {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
  align-items: start;
}

/* ── Add New Card Form ──────────────────────────── */
.cc-add-card__description {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.cc-add-card__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cc-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.cc-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cc-form-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
}

.cc-form-input {
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: var(--color-surface);
  outline: none;
  transition: border-color 0.2s ease;
}

.cc-form-input::placeholder {
  color: var(--color-text-muted);
}

.cc-form-input:focus {
  border-color: var(--color-primary);
}

.cc-add-card__submit {
  align-self: flex-start;
  background-color: #1814f3;
  color: white;
  border: none;
  padding: 0.85rem 2.5rem;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.cc-add-card__submit:hover {
  background-color: var(--color-primary);
}

.cc-add-card__submit:active {
  transform: scale(0.98);
}

/* ── Card Settings ──────────────────────────────── */
.card-settings-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.card-setting-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.2s ease;
  cursor: pointer;
}

.card-setting-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.card-setting-item:hover {
  opacity: 0.8;
}

.card-setting-item__icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-setting-item__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-setting-item__title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.card-setting-item__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

@media (max-width: 1200px) {
  .cc-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .credit-cards-page__bottom {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .credit-cards-page__middle {
    grid-template-columns: 1fr;
  }

  .cc-cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .cc-form-row {
    grid-template-columns: 1fr;
  }
}
</style>
