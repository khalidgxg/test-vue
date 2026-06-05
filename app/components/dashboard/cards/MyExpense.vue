<template>
  <div class="my-expense">
    <div class="my-expense__header">
      <h2 class="my-expense__title">My Expense</h2>
    </div>

    <div class="my-expense__chart">
      <div v-for="bar in expenseData" :key="bar.month" class="expense-bar-group">
        <div class="expense-bar-container" :style="{ '--bar-height': bar.percentage + '%' }">
          <!-- Dec (active bar) has a label above it -->
          <div v-if="bar.valueLabel" class="expense-bar-badge">
            {{ bar.valueLabel }}
          </div>
          <div
            :class="['expense-bar', { 'expense-bar--active': bar.active }]"
            :style="{ height: bar.percentage + '%' }"
          ></div>
        </div>
        <span class="expense-bar-month">{{ bar.month }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ExpenseBar } from '#shared/types'

const { data } = await useApi<{
  my_expense: ExpenseBar[]
}>('/transactions', { key: 'transactions' })

const expenseData = computed(() => data.value?.my_expense || [])
</script>

<style scoped>
.my-expense {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.my-expense__header {
  margin-bottom: 1.25rem;
}

.my-expense__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.my-expense__chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 175px;
  padding: 1.5rem 0.5rem 0;
  gap: 0.75rem;
}

.expense-bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
}

.expense-bar-container {
  width: 100%;
  height: calc(100% - 25px); /* Leave space for month labels */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

.expense-bar {
  width: 30px;
  max-width: 80%;
  background-color: #f5f7fa;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.expense-bar--active {
  background-color: #16dbcc;
}

.expense-bar-badge {
  position: absolute;
  bottom: calc(var(--bar-height) + 8px);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  animation: fadeIn 0.4s ease;
}

.expense-bar-month {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
