<template>
  <div class="recent-transaction">
    <div class="recent-transaction__header">
      <h2 class="recent-transaction__title">Recent Transaction</h2>
    </div>

    <div class="recent-transaction__list">
      <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
        <div
          :class="['transaction-item__icon', `transaction-item__icon--${transaction.iconColor}`]"
        >
          <span class="transaction-item__icon-inner" v-html="transaction.icon"></span>
        </div>

        <div class="transaction-item__info">
          <span class="transaction-item__name">{{ transaction.name }}</span>
          <span class="transaction-item__date">{{ transaction.date }}</span>
        </div>

        <span
          :class="['transaction-item__amount', `transaction-item__amount--${transaction.type}`]"
        >
          {{ transaction.type === 'expense' ? '-' : '+' }}${{ formatNumber(transaction.amount) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction, TransactionRaw } from '#shared/types'

const { data } = await useApi<{
  recent_transactions: TransactionRaw[]
}>('/dashboard', { key: 'dashboard' })

const transactions = computed<Transaction[]>(() => {
  const raws = data.value?.recent_transactions || []
  
  const iconMap: Record<string, string> = {
    card: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8H17" stroke="currentColor" stroke-width="1.5"/></svg>',
    paypal: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 16H4C3.44772 16 3 15.5523 3 15V5C3 4.44772 3.44772 4 4 4H12C13.6569 4 15 5.34315 15 7V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 12H16C16.5523 12 17 12.4477 17 13V15C17 15.5523 16.5523 16 16 16H8C7.44772 16 7 15.5523 7 15V13C7 12.4477 7.44772 12 8 12Z" stroke="currentColor" stroke-width="1.5"/></svg>',
    user: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 7V13M7 10H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  }
  
  return raws.map(t => ({
    id: t.id,
    name: t.title,
    amount: Math.abs(t.amount),
    date: t.date,
    type: t.amount < 0 ? 'expense' : 'income',
    iconColor: t.tone === 'teal' ? 'cyan' : t.tone,
    icon: iconMap[t.type] || ''
  }))
})

function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}
</script>

<style scoped>
.recent-transaction {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.recent-transaction__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.recent-transaction__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.recent-transaction__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.375rem 0;
}

.transaction-item__icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transaction-item__icon--yellow {
  background-color: #fff5d9;
  color: #ffbb38;
}

.transaction-item__icon--blue {
  background-color: #e7edff;
  color: #396aff;
}

.transaction-item__icon--cyan {
  background-color: #dcfaf8;
  color: #16dbcc;
}

.transaction-item__icon-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.transaction-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.transaction-item__name {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text);
}

.transaction-item__date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.transaction-item__amount {
  font-size: var(--font-size-base);
  font-weight: 600;
}

.transaction-item__amount--income {
  color: var(--color-success);
}

.transaction-item__amount--expense {
  color: var(--color-danger);
}
</style>
