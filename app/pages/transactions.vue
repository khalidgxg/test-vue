<template>
  <div class="transactions-page">
    <!-- Top Row: Cards and Expense Chart -->
    <div class="transactions-page__top">
      <div class="transactions-page__cards-container">
        <DashboardCardsMyCards :show-add-card="true" />
      </div>
      <div class="transactions-page__expense-container">
        <DashboardCardsMyExpense />
      </div>
    </div>

    <!-- Bottom Row: Recent Transactions Table -->
    <div class="transactions-page__bottom">
      <h2 class="transactions-page__section-title">Recent Transactions</h2>

      <!-- Filter Tabs -->
      <div class="transactions-page__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="['tab-btn', { 'tab-btn--active': activeTab === tab.value }]"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Table Container -->
      <div class="transactions-table-card">
        <div class="transactions-table-container">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Card</th>
                <th>Date</th>
                <th>Amount</th>
                <th class="text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tx in filteredTransactions" :key="tx.id">
                <td>
                  <div class="transaction-desc">
                    <div class="transaction-icon">
                      <!-- Up arrow for expense, Down arrow for income -->
                      <svg
                        v-if="tx.isIncome"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                      >
                        <path
                          d="M12 5v14M12 19l-7-7M12 19l7-7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <svg
                        v-else
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                      >
                        <path
                          d="M12 19V5M12 5L5 12M12 5L19 12"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span class="transaction-name">{{ tx.description }}</span>
                  </div>
                </td>
                <td class="text-muted">{{ tx.transactionId }}</td>
                <td class="text-muted">{{ tx.type }}</td>
                <td class="text-muted">{{ tx.card }}</td>
                <td class="text-muted">{{ tx.date }}</td>
                <td
                  :class="[
                    'transaction-amount',
                    tx.isIncome ? 'transaction-amount--income' : 'transaction-amount--expense',
                  ]"
                >
                  {{ tx.isIncome ? '+' : '-' }}${{ formatNumber(tx.amount) }}
                </td>
                <td class="text-right">
                  <button class="download-btn" @click="handleDownload(tx.transactionId)">
                    Download
                  </button>
                </td>
              </tr>
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="7" class="text-center text-muted py-5">No transactions found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button class="pagination-btn" aria-label="Previous page">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Previous</span>
          </button>

          <button class="pagination-page pagination-page--active">1</button>
          <button class="pagination-page">2</button>
          <button class="pagination-page">3</button>
          <button class="pagination-page">4</button>

          <button class="pagination-btn" aria-label="Next page">
            <span>Next</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification (Premium UI Feedback instead of browser alert) -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast-notification">
        <div class="toast-content">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="toast-icon"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PageTransaction } from '#shared/types'

definePageMeta({
  layout: 'dashboard',
  title: 'Transactions',
})

useHead({
  title: 'Transactions - BankDash',
})

const tabs = [
  { label: 'All Transactions', value: 'all' },
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
]

const activeTab = ref('all')

const { data } = await useApi<{
  transactions: PageTransaction[]
}>('/transactions', { key: 'transactions' })

const transactions = computed(() => data.value?.transactions || [])

const filteredTransactions = computed(() => {
  if (activeTab.value === 'all') return transactions.value
  if (activeTab.value === 'income') return transactions.value.filter((t) => t.isIncome)
  if (activeTab.value === 'expense') return transactions.value.filter((t) => !t.isIncome)
  return transactions.value
})

function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

// Toast state for premium notification
const toast = ref({
  show: false,
  message: '',
})

let toastTimeout: NodeJS.Timeout

function handleDownload(txId: string) {
  // Clear any existing timeout
  if (toastTimeout) clearTimeout(toastTimeout)

  toast.value.message = `Receipt for transaction ${txId} downloaded successfully.`
  toast.value.show = true

  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, 3000)
}
</script>

<style scoped>
.transactions-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.transactions-page__top {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.25rem;
}

.transactions-page__bottom {
  display: flex;
  flex-direction: column;
}

.transactions-page__section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.transactions-page__tabs {
  display: flex;
  gap: 2.5rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.25rem;
}

.tab-btn {
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-light);
  padding: 0.625rem 0.25rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  font-family: var(--font-family);
}

.tab-btn:hover {
  color: var(--color-primary);
}

.tab-btn--active {
  color: var(--color-primary);
  font-weight: 600;
}

.tab-btn--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 3px 3px 0 0;
}

.transactions-table-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.transactions-table-container {
  width: 100%;
  overflow-x: auto;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.transactions-table th {
  padding: 0.75rem 1rem 1rem 1rem;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-light);
  border-bottom: 1px solid var(--color-border);
}

.transactions-table td {
  padding: 1.125rem 1rem;
  font-size: 14px;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.transactions-table tr:last-child td {
  border-bottom: none;
}

.transaction-desc {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.transaction-icon {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-text-light);
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transaction-name {
  font-weight: 500;
}

.transaction-amount {
  font-weight: 600;
}

.transaction-amount--income {
  color: var(--color-success);
}

.transaction-amount--expense {
  color: var(--color-danger);
}

.download-btn {
  background: none;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 0.375rem 1rem;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-family);
}

.download-btn:hover {
  background-color: var(--color-primary);
  color: white;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-muted {
  color: var(--color-text-light) !important;
}

.py-5 {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

/* Pagination Styling */
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1.5rem;
}

.pagination-btn {
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  font-family: var(--font-family);
}

.pagination-btn:hover {
  background-color: var(--color-background);
}

.pagination-page {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: var(--font-family);
}

.pagination-page:hover {
  background-color: var(--color-background);
}

.pagination-page--active {
  background-color: #1814f3;
  color: white !important;
}

/* Toast Animation and Styling */
.toast-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #1a1b2f;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 14px;
  font-weight: 500;
}

.toast-icon {
  color: var(--color-success);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 1100px) {
  .transactions-page__top {
    grid-template-columns: 1fr;
  }
}
</style>
