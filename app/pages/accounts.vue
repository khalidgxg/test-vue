<script setup>
useHead({ title: 'Accounts' })

const { data: accounts } = await useApi('/accounts', { key: 'accounts' })

definePageMeta({ title: 'Accounts' })

const summaryIcons = {
  balance: { color: '#FFBB38', bg: '#FFF5D9' },
  income: { color: '#396AFF', bg: '#E7EDFF' },
  expense: { color: '#FF4B4A', bg: '#FFE0EB' },
  saving: { color: '#16DBCC', bg: '#DCFAF8' },
}

const transactionIconMap = {
  subscription: 'mdi-music',
  service: 'mdi-tools',
  user: 'mdi-account-outline',
}

const invoiceIconMap = {
  apple: 'mdi-apple',
  user: 'mdi-account-outline',
  playstation: 'mdi-playstation',
}
</script>

<template>
  <div class="accounts-page">
    <!-- 4 Summary cards -->
    <v-row dense>
      <v-col
        v-for="metric in accounts?.summary_metrics"
        :key="metric.id"
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card class="summary-card" elevation="0" rounded="xl">
          <v-avatar
            :color="summaryIcons[metric.tone]?.bg || '#F5F7FA'"
            size="60"
            rounded="circle"
          >
            <v-icon
              :color="summaryIcons[metric.tone]?.color || '#396AFF'"
              size="28"
            >
              {{
                metric.icon === 'balance' ? 'mdi-wallet-outline' :
                metric.icon === 'income' ? 'mdi-cash-plus' :
                metric.icon === 'expense' ? 'mdi-cash-minus' :
                'mdi-piggy-bank-outline'
              }}
            </v-icon>
          </v-avatar>
          <div class="summary-card__info">
            <span class="summary-card__label">{{ metric.label }}</span>
            <span class="summary-card__value">{{ metric.value }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Last Transaction + My Card -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="7">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Last Transaction</h2>
          <div class="transaction-list">
            <div
              v-for="t in accounts?.transactions"
              :key="t.id"
              class="transaction-row"
            >
              <v-avatar
                :color="summaryIcons[t.tone]?.bg || '#F5F7FA'"
                size="50"
                rounded="circle"
              >
                <v-icon
                  :color="summaryIcons[t.tone]?.color || '#396AFF'"
                  size="22"
                >
                  {{ transactionIconMap[t.icon] || 'mdi-circle' }}
                </v-icon>
              </v-avatar>
              <div class="transaction-row__info">
                <span class="transaction-row__title">{{ t.title }}</span>
                <span class="transaction-row__date">{{ t.date }}</span>
              </div>
              <span class="transaction-row__category">{{ t.category }}</span>
              <span class="transaction-row__card">{{ t.card }}</span>
              <span :class="['transaction-row__status', `transaction-row__status--${t.status.toLowerCase()}`]">
                {{ t.status }}
              </span>
              <span :class="['transaction-row__amount', `transaction-row__amount--${t.type}`]">
                {{ t.type === 'expense' ? '-' : '+' }}${{ t.amount }}
              </span>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="5">
        <div class="my-card-display">
          <div class="my-card-display__header">
            <h2 class="text-h6 font-weight-bold text-grey-darken-4">My Card</h2>
            <NuxtLink to="/credit-cards" class="my-card-display__link">See All</NuxtLink>
          </div>

          <v-card
            v-if="accounts?.card"
            class="my-card-display__card"
            elevation="0"
          >
            <div class="card-display__top-content">
              <div class="card-display">
                <div>
                  <span class="card-display__label">Balance</span>
                  <span class="card-display__amount">${{ accounts.card.balance.toLocaleString() }}</span>
                </div>
                <!-- chip -->
                <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
                  <rect width="34" height="30" rx="5" fill="#E6EFF5" opacity="0.8" />
                  <rect x="4" y="4" width="26" height="22" rx="3" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="17" y1="4" x2="17" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="4" y1="15" x2="30" y2="15" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="10" y1="4" x2="10" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="24" y1="4" x2="24" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                </svg>
              </div>
              <div class="card-display__details">
                <div>
                  <span class="card-display__detail-label">CARD HOLDER</span>
                  <span class="card-display__detail-value">{{ accounts.card.holder }}</span>
                </div>
                <div>
                  <span class="card-display__detail-label">VALID THRU</span>
                  <span class="card-display__detail-value">{{ accounts.card.expiry }}</span>
                </div>
              </div>
            </div>
            <div class="card-display__footer">
              <span class="card-display__number">{{ accounts.card.number }}</span>
              <svg width="44" height="22" viewBox="0 0 44 30" fill="none">
                <circle cx="15" cy="15" r="14" fill="rgba(255,255,255,0.5)" />
                <circle cx="29" cy="15" r="14" fill="rgba(255,255,255,0.3)" />
              </svg>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Debit & Credit Overview + Invoices Sent -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="7">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Debit & Credit Overview</h2>

          <div class="dc-overview__header">
            <div class="dc-overview__text">
              <span class="dc-overview__value">$7,560</span>
              <span class="dc-overview__label">Debited & $5,420 Credited in this Week</span>
            </div>
            <div class="dc-overview__legend">
              <div class="dc-overview__legend-item">
                <span class="dc-overview__legend-dot dc-overview__legend-dot--debit" />
                <span>Debit</span>
              </div>
              <div class="dc-overview__legend-item">
                <span class="dc-overview__legend-dot dc-overview__legend-dot--credit" />
                <span>Credit</span>
              </div>
            </div>
          </div>

          <div class="dc-chart">
            <div
              v-for="(day, idx) in accounts?.chart_days"
              :key="idx"
              class="dc-chart__bar-group"
            >
              <div class="dc-chart__bars">
                <div
                  class="dc-chart__bar dc-chart__bar--debit"
                  :style="{ height: `${day.debit * 2}px` }"
                />
                <div
                  class="dc-chart__bar dc-chart__bar--credit"
                  :style="{ height: `${day.credit * 2}px` }"
                />
              </div>
              <span class="dc-chart__day">{{ day.day }}</span>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="5">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Invoices Sent</h2>
          <div class="invoices-list">
            <div
              v-for="inv in accounts?.invoices"
              :key="inv.id"
              class="invoice-row"
            >
              <v-avatar
                :color="summaryIcons[inv.tone]?.bg || '#F5F7FA'"
                size="50"
                rounded="circle"
              >
                <v-icon
                  :color="summaryIcons[inv.tone]?.color || '#396AFF'"
                  size="22"
                >
                  {{ invoiceIconMap[inv.icon] || 'mdi-receipt-text-outline' }}
                </v-icon>
              </v-avatar>
              <div class="invoice-row__info">
                <span class="invoice-row__name">{{ inv.name }}</span>
                <span class="invoice-row__time">{{ inv.time }}</span>
              </div>
              <span class="invoice-row__amount">${{ inv.amount }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.accounts-page {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-card {
  padding: 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 1rem;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.summary-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-card__label {
  font-size: 0.9375rem;
  color: #718ebf;
  font-weight: 400;
}

.summary-card__value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #343c6a;
}

.data-card {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

/* Last Transaction */
.transaction-list {
  display: flex;
  flex-direction: column;
}

.transaction-row {
  display: grid;
  grid-template-columns: 50px 1.5fr 1fr 1fr 1fr 80px;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e6eff5;
}

.transaction-row:last-child {
  border-bottom: none;
}

.transaction-row__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.transaction-row__title {
  font-weight: 600;
  color: #343c6a;
  font-size: 0.9375rem;
}

.transaction-row__date {
  font-size: 0.75rem;
  color: #b1b1b1;
}

.transaction-row__category,
.transaction-row__card,
.transaction-row__status {
  font-size: 0.875rem;
  color: #343c6a;
}

.transaction-row__status--completed {
  color: #41d4a8;
}

.transaction-row__status--pending {
  color: #ffbb38;
}

.transaction-row__amount {
  font-weight: 600;
  text-align: right;
  font-size: 0.9375rem;
}

.transaction-row__amount--income {
  color: #41d4a8;
}

.transaction-row__amount--expense {
  color: #ff4b4a;
}

/* My Card */
.my-card-display__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.my-card-display__link {
  font-size: 0.9375rem;
  color: #1814f3;
  font-weight: 600;
  text-decoration: none;
}

.my-card-display__card {
  background: linear-gradient(135deg, #4c49ed 0%, #0a06f4 100%) !important;
  color: white;
  border-radius: 1.25rem !important;
  padding: 0 !important;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.card-display {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-display__top-content {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-display__label {
  display: block;
  font-size: 0.75rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.card-display__amount {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.card-display__details {
  display: flex;
  gap: 3rem;
  margin-top: auto;
  margin-bottom: 1.25rem;
}

.card-display__detail-label {
  display: block;
  font-size: 0.625rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.card-display__detail-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 4px;
}

.card-display__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: auto;
}

.card-display__number {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.15em;
}

/* DC Overview */
.dc-overview__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dc-overview__text {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.dc-overview__value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #343c6a;
}

.dc-overview__label {
  font-size: 0.9375rem;
  color: #1814f3;
  font-weight: 500;
}

.dc-overview__legend {
  display: flex;
  gap: 1.5rem;
}

.dc-overview__legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #b1b1b1;
}

.dc-overview__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dc-overview__legend-dot--debit {
  background-color: #1814f3;
}

.dc-overview__legend-dot--credit {
  background-color: #fc7900;
}

.dc-chart {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  height: 200px;
  padding-top: 1rem;
}

.dc-chart__bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
}

.dc-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  flex: 1;
  width: 100%;
  justify-content: center;
  height: 100%;
}

.dc-chart__bar {
  width: 16px;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
}

.dc-chart__bar--debit {
  background-color: #1814f3;
}

.dc-chart__bar--credit {
  background-color: #fc7900;
}

.dc-chart__day {
  font-size: 0.8125rem;
  color: #718ebf;
}

/* Invoices */
.invoices-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.invoice-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.invoice-row__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.invoice-row__name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #343c6a;
}

.invoice-row__time {
  font-size: 0.75rem;
  color: #b1b1b1;
}

.invoice-row__amount {
  font-weight: 600;
  color: #343c6a;
  font-size: 0.9375rem;
}

@media (max-width: 1100px) {
  .transaction-row {
    grid-template-columns: 50px 1.5fr 1fr 80px;
  }

  .transaction-row__category,
  .transaction-row__card {
    display: none;
  }
}
</style>
