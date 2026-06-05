<template>
  <div class="accounts-page">
    <section class="accounts-page__summary" aria-label="Account summary">
      <article v-for="metric in summaryMetrics" :key="metric.id" class="account-summary-card">
        <div :class="['account-summary-card__icon', `account-summary-card__icon--${metric.tone}`]">
          <svg
            v-if="metric.icon === 'balance'"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path d="M11 9.5H21L19.25 13H12.75L11 9.5Z" fill="currentColor" opacity="0.9" />
            <path
              d="M9.5 16.5C9.5 13.739 12.239 11.5 16 11.5C19.761 11.5 22.5 13.739 22.5 16.5V21.5C22.5 24.261 19.761 26.5 16 26.5C12.239 26.5 9.5 24.261 9.5 21.5V16.5Z"
              fill="currentColor"
            />
            <path
              d="M16 15.5V22.5M18.25 17.25C18.25 16.4216 17.2426 15.75 16 15.75C14.7574 15.75 13.75 16.4216 13.75 17.25C13.75 18.0784 14.7574 18.75 16 18.75C17.2426 18.75 18.25 19.4216 18.25 20.25C18.25 21.0784 17.2426 21.75 16 21.75C14.7574 21.75 13.75 21.0784 13.75 20.25"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>

          <svg
            v-else-if="metric.icon === 'income'"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7.25 22.5L13.5 19.75L17.75 22.25H23.25C25.0449 22.25 26.5 20.7949 26.5 19V18.25H18.5"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M5.5 24.5L9.25 22.5L12.25 27.75L8.75 29.5L5.5 24.5Z" fill="currentColor" />
            <circle cx="18.5" cy="10.5" r="5.5" fill="currentColor" />
            <path
              d="M18.5 7.75V13.25M20.25 9.25C20.25 8.69772 19.4665 8.25 18.5 8.25C17.5335 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.5335 10.25 18.5 10.25C19.4665 10.25 20.25 10.6977 20.25 11.25C20.25 11.8023 19.4665 12.25 18.5 12.25C17.5335 12.25 16.75 11.8023 16.75 11.25"
              stroke="white"
              stroke-width="1.4"
              stroke-linecap="round"
            />
          </svg>

          <svg
            v-else-if="metric.icon === 'expense'"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 6.5H22.5C24.1569 6.5 25.5 7.84315 25.5 9.5V27.5L22.25 25.75L19 27.5L15.75 25.75L12.5 27.5L9 25.75V6.5Z"
              fill="currentColor"
              opacity="0.88"
            />
            <path
              d="M13 12.5H21.5M13 17H18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M16.5 9.5V15.5M13.5 12.5H19.5"
              stroke="white"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <circle cx="23.5" cy="23.5" r="5.5" fill="currentColor" />
            <path
              d="M23.5 20.5V26.5M25.25 22C25.25 21.4477 24.4665 21 23.5 21C22.5335 21 21.75 21.4477 21.75 22C21.75 22.5523 22.5335 23 23.5 23C24.4665 23 25.25 23.4477 25.25 24C25.25 24.5523 24.4665 25 23.5 25C22.5335 25 21.75 24.5523 21.75 24"
              stroke="white"
              stroke-width="1.3"
              stroke-linecap="round"
            />
          </svg>

          <svg v-else width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <path
              d="M8.5 19C8.5 14.8579 12.3056 11.5 17 11.5H21C24.0376 11.5 26.5 13.9624 26.5 17V23.25H23L21.75 27H17.25L16 23.25H11.75L10.5 27H8.5V19Z"
              fill="currentColor"
            />
            <path
              d="M11.25 15.5H7.5"
              stroke="currentColor"
              stroke-width="2.3"
              stroke-linecap="round"
            />
            <circle cx="22.25" cy="16.25" r="1.25" fill="white" />
            <circle cx="17" cy="8.25" r="4.25" fill="currentColor" opacity="0.88" />
            <path
              d="M17 5.75V10.75M18.6 7C18.6 6.55817 17.8837 6.2 17 6.2C16.1163 6.2 15.4 6.55817 15.4 7C15.4 7.44183 16.1163 7.8 17 7.8C17.8837 7.8 18.6 8.15817 18.6 8.6C18.6 9.04183 17.8837 9.4 17 9.4C16.1163 9.4 15.4 9.04183 15.4 8.6"
              stroke="white"
              stroke-width="1.15"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div class="account-summary-card__content">
          <p class="account-summary-card__label">{{ metric.label }}</p>
          <p class="account-summary-card__value">{{ metric.value }}</p>
        </div>
      </article>
    </section>

    <div class="accounts-page__content">
      <section class="accounts-page__main-column">
        <div class="accounts-page__section-heading">
          <h2 class="accounts-page__section-title">Last Transaction</h2>
        </div>

        <div class="last-transactions-card">
          <article
            v-for="transaction in transactions"
            :key="transaction.id"
            class="last-transaction"
          >
            <div :class="['last-transaction__icon', `last-transaction__icon--${transaction.tone}`]">
              <svg
                v-if="transaction.icon === 'subscription'"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M21.2 8.7C19.7 6.9 17.45 5.75 14.95 5.75C10.6 5.75 7.05 9.1 6.75 13.37"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M4.75 11.25L6.85 13.45L9.1 11.35"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 19.3C8.5 21.1 10.75 22.25 13.25 22.25C17.6 22.25 21.15 18.9 21.45 14.63"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M23.45 16.75L21.35 14.55L19.1 16.65"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <svg
                v-else-if="transaction.icon === 'service'"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19.4 5.5L22.5 8.6L18.4 12.7L15.3 9.6L19.4 5.5Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.5 22.5L12.35 15.65"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M8.5 5.5L11 8L8.3 10.7L5.7 8.1"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.75 5.75L22.25 22.25"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>

              <svg v-else width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="10.25" r="4.25" stroke="currentColor" stroke-width="2" />
                <path
                  d="M6.5 23C6.5 19.2721 9.85786 16.25 14 16.25C18.1421 16.25 21.5 19.2721 21.5 23"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="last-transaction__merchant">
              <p class="last-transaction__title">{{ transaction.title }}</p>
              <p class="last-transaction__date">{{ transaction.date }}</p>
            </div>
            <p class="last-transaction__meta">{{ transaction.category }}</p>
            <p class="last-transaction__meta">{{ transaction.card }}</p>
            <p class="last-transaction__meta">{{ transaction.status }}</p>
            <p
              :class="['last-transaction__amount', `last-transaction__amount--${transaction.type}`]"
            >
              {{ transaction.type === 'income' ? '+' : '-' }}${{ formatNumber(transaction.amount) }}
            </p>
          </article>
        </div>

        <div class="accounts-page__section-heading accounts-page__section-heading--chart">
          <h2 class="accounts-page__section-title">Debit &amp; Credit Overview</h2>
        </div>

        <div class="overview-card">
          <div class="overview-card__header">
            <p class="overview-card__caption">
              <strong>$7,560</strong> Debited &amp; <strong>$5,420</strong> Credited in this Week
            </p>
            <div class="overview-card__legend" aria-label="Chart legend">
              <span class="overview-card__legend-item">
                <span class="overview-card__legend-dot overview-card__legend-dot--debit"></span>
                Debit
              </span>
              <span class="overview-card__legend-item">
                <span class="overview-card__legend-dot overview-card__legend-dot--credit"></span>
                Credit
              </span>
            </div>
          </div>

          <div class="overview-chart" aria-label="Debit and credit chart">
            <div v-for="bar in chartBars" :key="bar.day" class="overview-chart__group">
              <div class="overview-chart__bars">
                <span
                  class="overview-chart__bar overview-chart__bar--debit"
                  :style="{ height: `${bar.debitHeight}%` }"
                ></span>
                <span
                  class="overview-chart__bar overview-chart__bar--credit"
                  :style="{ height: `${bar.creditHeight}%` }"
                ></span>
              </div>
              <span class="overview-chart__day">{{ bar.day }}</span>
            </div>
          </div>
        </div>
      </section>

      <aside class="accounts-page__side-column">
        <div class="accounts-page__section-heading accounts-page__section-heading--card">
          <h2 class="accounts-page__section-title">My Card</h2>
          <NuxtLink class="accounts-page__section-link" to="/credit-cards">See All</NuxtLink>
        </div>

        <article class="account-card" aria-label="Card balance">
          <div class="account-card__top">
            <div>
              <p class="account-card__label">Balance</p>
              <p class="account-card__balance">{{ card ? '$' + formatNumber(card.balance) : '$0' }}</p>
            </div>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
              <rect x="5" y="7" width="32" height="28" rx="7" stroke="white" stroke-width="2.2" />
              <path d="M5 17H37M5 25H37M16 7V35M26 7V35" stroke="white" stroke-width="2.2" />
            </svg>
          </div>

          <div class="account-card__details">
            <div>
              <p class="account-card__detail-label">CARD HOLDER</p>
              <p class="account-card__detail-value">{{ card?.holder || 'Eddy Cusuma' }}</p>
            </div>
            <div>
              <p class="account-card__detail-label">VALID THRU</p>
              <p class="account-card__detail-value">{{ card?.expiry || '12/22' }}</p>
            </div>
          </div>

          <div class="account-card__number-row">
            <p class="account-card__number">{{ card?.number || '3778 **** **** 1234' }}</p>
            <div class="account-card__brand" aria-hidden="true">
              <span></span>
              <span></span>
            </div>
          </div>
        </article>

        <div class="accounts-page__section-heading accounts-page__section-heading--invoices">
          <h2 class="accounts-page__section-title">Invoices Sent</h2>
        </div>

        <div class="invoices-card">
          <article v-for="invoice in invoices" :key="invoice.id" class="invoice-item">
            <div :class="['invoice-item__icon', `invoice-item__icon--${invoice.tone}`]">
              <svg
                v-if="invoice.icon === 'apple'"
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20.45 4.4C19.34 5.11 18.41 6.22 18.62 7.57C19.86 7.65 21.17 6.89 21.9 5.9C22.58 4.98 22.89 3.83 22.81 2.72C21.96 2.76 21.07 3.12 20.45 4.4Z"
                  fill="currentColor"
                />
                <path
                  d="M24.07 20.22C23.41 21.7 23.08 22.36 22.21 23.68C21.01 25.5 19.32 27.77 17.21 27.79C15.34 27.81 14.86 26.57 12.31 26.59C9.76 26.6 9.23 27.82 7.36 27.8C5.25 27.78 3.63 25.74 2.43 23.92C-0.93 18.78 -1.28 12.74 0.8 10.2C2.28 8.39 4.62 7.32 6.84 7.32C9.1 7.32 10.52 8.57 12.39 8.57C14.2 8.57 15.31 7.31 17.92 7.31C19.89 7.31 21.98 8.38 23.45 10.23C18.6 12.89 19.39 19.78 24.07 20.22Z"
                  fill="currentColor"
                  transform="translate(3 1)"
                />
              </svg>

              <svg
                v-else-if="invoice.icon === 'playstation'"
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.25 4.5V25.5M12.25 4.5L18.15 6.45C20.24 7.14 21.65 9.1 21.65 11.3V13.6C21.65 15.41 19.77 16.61 18.12 15.86L15.25 14.55V9.6"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.75 20.25C10.1 18.9 12.85 18.74 16.3 19.95C18.08 20.57 19.3 21.23 21.5 20.3C23.28 19.55 23.67 18.54 22.82 17.95C21.83 17.27 19.75 17.59 17.75 18.35"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
                <path
                  d="M6.75 24.3C10.1 22.95 13.85 22.76 17.3 23.97C19.38 24.7 21.93 24.29 24.25 23"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
              </svg>

              <svg v-else width="31" height="31" viewBox="0 0 31 31" fill="none" aria-hidden="true">
                <circle cx="15.5" cy="11.25" r="4.75" stroke="currentColor" stroke-width="2.1" />
                <path
                  d="M7.5 26C7.5 21.8579 11.0817 18.5 15.5 18.5C19.9183 18.5 23.5 21.8579 23.5 26"
                  stroke="currentColor"
                  stroke-width="2.1"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="invoice-item__content">
              <p class="invoice-item__title">{{ invoice.name }}</p>
              <p class="invoice-item__time">{{ invoice.time }}</p>
            </div>
            <p class="invoice-item__amount">${{ formatNumber(invoice.amount) }}</p>
          </article>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Accounts',
})

useHead({
  title: 'Accounts - BankDash',
})

const { data } = await useApi('/accounts')

const summaryMetrics = computed(() => data.value?.summary_metrics || [])
const transactions = computed(() => data.value?.transactions || [])
const chartDays = computed(() => data.value?.chart_days || [])
const invoices = computed(() => data.value?.invoices || [])
const card = computed(() => data.value?.card)

const maxChartValue = 90

const chartBars = computed(() => {
  const days = chartDays.value || []
  return days.map((day) => ({
    ...day,
    debitHeight: Math.max((day.debit / maxChartValue) * 100, 4),
    creditHeight: Math.max((day.credit / maxChartValue) * 100, 4),
  }))
})

function formatNumber(value) {
  return value.toLocaleString('en-US')
}
</script>

<style scoped>
.accounts-page {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.accounts-page__summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.account-summary-card {
  min-height: 120px;
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  box-shadow: var(--shadow-sm);
}

.account-summary-card__icon {
  width: 70px;
  height: 70px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.account-summary-card__icon--balance {
  color: #ffb62e;
  background-color: #fff2cf;
}

.account-summary-card__icon--income {
  color: #396aff;
  background-color: #e7edff;
}

.account-summary-card__icon--expense {
  color: #ff6fa4;
  background-color: #ffdcec;
}

.account-summary-card__icon--saving {
  color: #16dbcc;
  background-color: #dcfaf8;
}

.account-summary-card__content {
  min-width: 0;
}

.account-summary-card__label {
  color: #718ebf;
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.35;
  margin-bottom: 0.25rem;
}

.account-summary-card__value {
  color: #232323;
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 0;
}

.accounts-page__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 1.75rem;
  align-items: start;
}

.accounts-page__main-column,
.accounts-page__side-column {
  min-width: 0;
}

.accounts-page__section-heading {
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.accounts-page__section-heading--chart,
.accounts-page__section-heading--invoices {
  margin-top: 1.75rem;
}

.accounts-page__section-heading--card {
  margin-bottom: 1rem;
}

.accounts-page__section-title {
  color: var(--color-text);
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.2;
}

.accounts-page__section-link {
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.accounts-page__section-link:hover {
  color: var(--color-primary);
}

.last-transactions-card,
.overview-card,
.invoices-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
}

.last-transactions-card {
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.last-transaction {
  display: grid;
  grid-template-columns:
    72px minmax(210px, 1.5fr) minmax(100px, 0.75fr) minmax(100px, 0.65fr) minmax(110px, 0.65fr)
    minmax(80px, auto);
  align-items: center;
  gap: 0.9rem;
}

.last-transaction__icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.last-transaction__icon--cyan {
  color: #16dbcc;
  background-color: #dcfaf8;
}

.last-transaction__icon--blue {
  color: #396aff;
  background-color: #e7edff;
}

.last-transaction__icon--pink {
  color: #ff6fa4;
  background-color: #ffdcec;
}

.last-transaction__merchant {
  min-width: 0;
}

.last-transaction__title {
  color: #232323;
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 0.3rem;
}

.last-transaction__date,
.last-transaction__meta {
  color: #718ebf;
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.3;
}

.last-transaction__amount {
  font-size: var(--font-size-lg);
  font-weight: 600;
  justify-self: end;
  white-space: nowrap;
}

.last-transaction__amount--income {
  color: var(--color-success);
}

.last-transaction__amount--expense {
  color: #ff4b73;
}

.overview-card {
  padding: 2rem 2.25rem 1.4rem;
}

.overview-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.3rem;
}

.overview-card__caption {
  color: #718ebf;
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.4;
}

.overview-card__caption strong {
  color: var(--color-text);
  font-weight: 600;
}

.overview-card__legend {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #718ebf;
  font-size: var(--font-size-base);
  font-weight: 500;
  white-space: nowrap;
}

.overview-card__legend-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.overview-card__legend-dot {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  display: inline-flex;
}

.overview-card__legend-dot--debit {
  background-color: #396aff;
}

.overview-card__legend-dot--credit {
  background-color: #e84c91;
}

.overview-chart {
  height: 275px;
  display: grid;
  grid-template-columns: repeat(7, minmax(54px, 1fr));
  align-items: end;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 0 0.25rem;
}

.overview-chart__group {
  min-width: 54px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.85rem;
}

.overview-chart__bars {
  height: 230px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.55rem;
}

.overview-chart__bar {
  width: clamp(20px, 38%, 34px);
  border-radius: 999px;
  display: block;
  transition:
    height 0.3s ease,
    opacity 0.2s ease;
}

.overview-chart__bar:hover {
  opacity: 0.85;
}

.overview-chart__bar--debit {
  background-color: #1814f3;
}

.overview-chart__bar--credit {
  background-color: #ffaa0b;
}

.overview-chart__day {
  color: #718ebf;
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.account-card {
  min-height: 270px;
  border-radius: var(--radius-2xl);
  background: linear-gradient(115deg, #2f58ff 0%, #4d94ff 100%);
  color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}

.account-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem 2rem 1.35rem;
}

.account-card__label,
.account-card__detail-label {
  font-size: var(--font-size-xs);
  font-weight: 500;
  line-height: 1.3;
  opacity: 0.78;
}

.account-card__balance {
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.1;
  margin-top: 0.25rem;
}

.account-card__details {
  display: flex;
  gap: 4.25rem;
  padding: 0 2rem 1.8rem;
}

.account-card__detail-value {
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1.3;
  margin-top: 0.35rem;
}

.account-card__number-row {
  margin-top: auto;
  min-height: 72px;
  background-color: rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 2rem;
}

.account-card__number {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 0;
  white-space: nowrap;
}

.account-card__brand {
  position: relative;
  width: 54px;
  height: 36px;
  flex-shrink: 0;
}

.account-card__brand span {
  position: absolute;
  top: 50%;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.45);
}

.account-card__brand span:first-child {
  left: 0;
}

.account-card__brand span:last-child {
  right: 0;
  background-color: rgba(255, 255, 255, 0.3);
}

.invoices-card {
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.invoice-item {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
}

.invoice-item__icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.invoice-item__icon--cyan {
  color: #16dbcc;
  background-color: #dcfaf8;
}

.invoice-item__icon--yellow {
  color: #ffb62e;
  background-color: #fff2cf;
}

.invoice-item__icon--blue {
  color: #396aff;
  background-color: #e7edff;
}

.invoice-item__icon--pink {
  color: #ff6fa4;
  background-color: #ffdcec;
}

.invoice-item__title {
  color: #b1b1b1;
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 0.45rem;
}

.invoice-item__time,
.invoice-item__amount {
  color: #718ebf;
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.25;
}

.invoice-item__amount {
  justify-self: end;
  white-space: nowrap;
}

@media (max-width: 1360px) {
  .accounts-page__content {
    grid-template-columns: minmax(0, 1fr) 370px;
  }

  .last-transaction {
    grid-template-columns:
      64px minmax(190px, 1.5fr) minmax(92px, 0.75fr) minmax(92px, 0.65fr) minmax(100px, 0.65fr)
      minmax(74px, auto);
  }

  .account-card__details {
    gap: 3rem;
  }
}

@media (max-width: 1180px) {
  .accounts-page__content {
    grid-template-columns: 1fr;
  }

  .accounts-page__side-column {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.85fr);
    gap: 1.75rem;
    align-items: start;
  }

  .accounts-page__section-heading--card,
  .account-card {
    grid-column: 1;
  }

  .accounts-page__section-heading--invoices,
  .invoices-card {
    grid-column: 2;
  }

  .accounts-page__section-heading--invoices {
    margin-top: 0;
  }
}

@media (max-width: 980px) {
  .accounts-page__summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .last-transactions-card {
    overflow-x: auto;
  }

  .last-transaction {
    min-width: 850px;
  }

  .overview-card__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .accounts-page__side-column {
    grid-template-columns: 1fr;
  }

  .accounts-page__section-heading--card,
  .account-card,
  .accounts-page__section-heading--invoices,
  .invoices-card {
    grid-column: 1;
  }

  .accounts-page__section-heading--invoices {
    margin-top: 0;
  }
}

@media (max-width: 640px) {
  .accounts-page {
    gap: 1.25rem;
  }

  .accounts-page__summary {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .account-summary-card,
  .last-transactions-card,
  .overview-card,
  .invoices-card {
    border-radius: var(--radius-xl);
  }

  .account-summary-card {
    min-height: 104px;
    padding: 1.1rem;
  }

  .account-summary-card__icon {
    width: 60px;
    height: 60px;
  }

  .account-summary-card__value {
    font-size: 1.45rem;
  }

  .last-transactions-card,
  .overview-card,
  .invoices-card {
    padding: 1.25rem;
  }

  .accounts-page__section-title {
    font-size: 1.2rem;
  }

  .overview-chart {
    height: 230px;
  }

  .overview-chart__bars {
    height: 185px;
  }

  .account-card {
    min-height: 245px;
  }

  .account-card__top,
  .account-card__details,
  .account-card__number-row {
    padding-left: 1.35rem;
    padding-right: 1.35rem;
  }

  .account-card__details {
    gap: 2rem;
  }

  .account-card__number {
    font-size: 1.1rem;
    white-space: normal;
  }

  .invoice-item {
    grid-template-columns: 58px minmax(0, 1fr) auto;
    gap: 0.85rem;
  }

  .invoice-item__icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
  }
}
</style>
