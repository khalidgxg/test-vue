<script setup>
import { computed } from 'vue'

const { data } = await useApi('/dashboard', { key: 'dashboard' })

const iconMap = {
  card: 'mdi-credit-card-outline',
  paypal: 'mdi-paypal',
  user: 'mdi-account-circle-outline',
}

const toneColorMap = {
  yellow: { bg: '#FFF5D9', color: '#FFBB38' },
  blue: { bg: '#E7EDFF', color: '#396AFF' },
  cyan: { bg: '#DCFAF8', color: '#16DBCC' },
  pink: { bg: '#FFE0EB', color: '#FF4B4A' },
  teal: { bg: '#DCFAF8', color: '#16DBCC' },
}

const transactions = computed(() => {
  const raws = data.value?.recent_transactions || []
  return raws.map(t => ({
    id: t.id,
    name: t.title,
    amount: Math.abs(t.amount),
    date: t.date,
    type: t.amount < 0 ? 'expense' : 'income',
    tone: t.tone,
    icon: iconMap[t.type] || 'mdi-help-circle-outline',
  }))
})

function formatNumber(num) {
  return num.toLocaleString('en-US')
}
</script>

<template>
  <v-card class="recent-transaction" elevation="0">
    <h2 class="text-h6 font-weight-bold mb-3">Recent Transaction</h2>

    <div class="recent-transaction__list">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <v-avatar
          :color="toneColorMap[transaction.tone]?.bg || '#F5F7FA'"
          size="48"
        >
          <v-icon
            :color="toneColorMap[transaction.tone]?.color || '#B1B1B1'"
            size="22"
          >
            {{ transaction.icon }}
          </v-icon>
        </v-avatar>

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
  </v-card>
</template>

<style scoped>
.recent-transaction {
  padding: 1.5rem !important;
  background: transparent !important;
  border: 1px solid rgb(var(--v-theme-grey-100));
  height: 100%;
}

.recent-transaction__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.transaction-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.transaction-item__name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text);
}

.transaction-item__date {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-grey-300, 177 177 177));
}

.transaction-item__amount {
  font-size: 0.9375rem;
  font-weight: 600;
}

.transaction-item__amount--income {
  color: rgb(var(--v-theme-success));
}

.transaction-item__amount--expense {
  color: rgb(var(--v-theme-error));
}
</style>
