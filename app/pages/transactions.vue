<script setup>
useHead({ title: 'Transactions' })
definePageMeta({ title: 'Transactions' })

const { data: tx } = await useApi('/transactions', { key: 'transactions' })

const activeTab = ref('all')
const currentPage = ref(1)

const filteredTransactions = computed(() => {
  const list = tx.value?.transactions || []
  if (activeTab.value === 'income') return list.filter(t => t.isIncome)
  if (activeTab.value === 'expense') return list.filter(t => !t.isIncome)
  return list
})

const myExpenseMax = computed(() => {
  const list = tx.value?.my_expense || []
  return Math.max(...list.map(m => m.percentage), 100)
})

const tabs = [
  { value: 'all', label: 'All Transactions' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
]
</script>

<template>
  <div class="transactions-page">
    <!-- My Cards + My Expense -->
    <div class="transactions-page__header">
      <h2 class="text-h6 font-weight-bold text-grey-darken-4">My Cards</h2>
      <span class="transactions-page__add">+ Add Card</span>
    </div>

    <v-row dense>
      <v-col cols="12" lg="8">
        <div class="mini-cards">
          <v-card
            v-for="(card, idx) in [
              { balance: 5756, theme: 'dark', holder: 'Eddy Cusuma', expiry: '12/22', number: '3778 **** **** 1234' },
              { balance: 5756, theme: 'light', holder: 'Eddy Cusuma', expiry: '12/22', number: '3778 **** **** 1234' },
            ]"
            :key="idx"
            :class="['mini-card', `mini-card--${card.theme}`]"
            elevation="0"
          >
            <div class="mini-card__top-content">
              <div class="mini-card__top">
                <div>
                  <span class="mini-card__label">Balance</span>
                  <span class="mini-card__amount">${{ card.balance.toLocaleString() }}</span>
                </div>
                <!-- chip -->
                <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
                  <rect width="34" height="30" rx="5" :fill="card.theme === 'dark' ? '#E6EFF5' : '#c6c6c6'" opacity="0.8" />
                  <rect x="4" y="4" width="26" height="22" rx="3" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="17" y1="4" x2="17" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="4" y1="15" x2="30" y2="15" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="10" y1="4" x2="10" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                  <line x1="24" y1="4" x2="24" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                </svg>
              </div>
              <div class="mini-card__bottom">
                <div>
                  <span class="mini-card__detail-label">CARD HOLDER</span>
                  <span class="mini-card__detail-value">{{ card.holder }}</span>
                </div>
                <div>
                  <span class="mini-card__detail-label">VALID THRU</span>
                  <span class="mini-card__detail-value">{{ card.expiry }}</span>
                </div>
              </div>
            </div>
            <div class="mini-card__footer">
              <span>{{ card.number }}</span>
              <svg width="44" height="22" viewBox="0 0 44 30" fill="none">
                <circle cx="15" cy="15" r="14" :fill="card.theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(150,150,150,0.5)'" />
                <circle cx="29" cy="15" r="14" :fill="card.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(150,150,150,0.3)'" />
              </svg>
            </div>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">My Expense</h2>
          <div class="my-expense">
            <div
              v-for="(item, idx) in tx?.my_expense"
              :key="idx"
              class="my-expense__bar-group"
            >
              <div
                :class="['my-expense__bar', { 'my-expense__bar--active': item.active }]"
                :style="{ height: `${(item.percentage / myExpenseMax) * 100}%` }"
              >
                <span v-if="item.active" class="my-expense__label">${{ item.valueLabel }}</span>
              </div>
              <span class="my-expense__month">{{ item.month }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Transactions -->
    <h2 class="text-h6 font-weight-bold text-grey-darken-4 mt-6 mb-3">Recent Transactions</h2>

    <v-card class="data-card" elevation="0" rounded="xl">
      <v-tabs v-model="activeTab" color="primary" class="transactions-tabs">
        <v-tab
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          class="text-none"
        >
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <v-table class="transactions-table" density="comfortable">
        <thead>
          <tr>
            <th class="text-left">Description</th>
            <th class="text-left">Transaction ID</th>
            <th class="text-left">Type</th>
            <th class="text-left">Card</th>
            <th class="text-left">Date</th>
            <th class="text-left">Amount</th>
            <th class="text-left">Receipt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in filteredTransactions" :key="t.id">
            <td>
              <div class="d-flex align-center ga-2">
                <v-icon
                  size="22"
                  :color="t.isIncome ? '#41d4a8' : '#ff4b4a'"
                >
                  {{ t.isIncome ? 'mdi-arrow-down-circle-outline' : 'mdi-arrow-up-circle-outline' }}
                </v-icon>
                <span>{{ t.description }}</span>
              </div>
            </td>
            <td class="text-primary">{{ t.transactionId }}</td>
            <td>{{ t.type }}</td>
            <td>{{ t.card }}</td>
            <td>{{ t.date }}</td>
            <td :class="t.isIncome ? 'text-success' : 'text-error'">
              <strong>{{ t.isIncome ? '+' : '-' }}${{ t.amount.toLocaleString() }}</strong>
            </td>
            <td>
              <v-btn
                variant="outlined"
                color="primary"
                rounded="pill"
                size="small"
                class="text-none"
              >
                Download
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <div class="transactions-pagination">
        <v-btn
          variant="text"
          color="primary"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <v-icon>mdi-chevron-left</v-icon>
          Previous
        </v-btn>

        <v-pagination
          v-model="currentPage"
          :length="4"
          :total-visible="4"
          color="primary"
          active-color="white"
        />

        <v-btn
          variant="text"
          color="primary"
          @click="currentPage++"
        >
          Next
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.transactions-page {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transactions-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transactions-page__add {
  color: #1814f3;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
}

.data-card {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

/* Mini cards */
.mini-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.mini-card {
  border-radius: 1.25rem !important;
  padding: 0 !important;
  min-height: 220px;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.mini-card--dark {
  background: linear-gradient(135deg, #4c49ed 0%, #0a06f4 100%) !important;
  color: white;
}

.mini-card--light {
  background: #ffffff !important;
  color: #343c6a;
  border: 1px solid #e6eff5;
}

.mini-card__top-content {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.mini-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.mini-card__label {
  display: block;
  font-size: 0.75rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.mini-card--light .mini-card__label {
  color: #718ebf;
}

.mini-card__amount {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.mini-card__bottom {
  display: flex;
  gap: 3rem;
  margin-top: auto;
  margin-bottom: 1.25rem;
}

.mini-card__detail-label {
  display: block;
  font-size: 0.625rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.mini-card--light .mini-card__detail-label {
  color: #718ebf;
}

.mini-card__detail-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 4px;
}

.mini-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  margin-top: auto;
}

.mini-card--dark .mini-card__footer {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.mini-card--light .mini-card__footer {
  border-top-color: rgba(52, 60, 106, 0.1);
  color: #343c6a;
}

/* My Expense */
.my-expense {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  height: 180px;
  padding-top: 1rem;
}

.my-expense__bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  position: relative;
}

.my-expense__bar {
  width: 100%;
  max-width: 30px;
  min-height: 4px;
  border-radius: 8px 8px 0 0;
  background-color: #e6eff5;
  transition: height 0.3s ease;
}

.my-expense__bar--active {
  background-color: #16dbcc;
  position: relative;
}

.my-expense__label {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: #343c6a;
  white-space: nowrap;
}

.my-expense__month {
  font-size: 0.8125rem;
  color: #718ebf;
}

/* Tabs */
.transactions-tabs {
  margin-bottom: 1rem;
  border-bottom: 1px solid #e6eff5;
}

.transactions-tabs :deep(.v-tab) {
  font-weight: 500;
  color: #b1b1b1;
}

.transactions-tabs :deep(.v-tab--selected) {
  color: #1814f3;
  font-weight: 600;
}

.transactions-table {
  background: transparent !important;
}

.transactions-table :deep(th) {
  color: #b1b1b1 !important;
  font-weight: 500 !important;
  font-size: 0.875rem !important;
  border-bottom: 1px solid #e6eff5 !important;
}

.transactions-table :deep(td) {
  border-bottom: 1px solid #e6eff5 !important;
  color: #343c6a;
}

.transactions-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.transactions-pagination :deep(.v-pagination__item--active) {
  background-color: #1814f3 !important;
  color: white !important;
}

@media (max-width: 600px) {
  .mini-cards {
    grid-template-columns: 1fr;
  }
}
</style>
