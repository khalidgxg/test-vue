<template>
  <div class="loans-page">
    <!-- Loan Type Summary Cards -->
    <div class="loans-page__summary">
      <div v-for="loan in loanTypes" :key="loan.id" class="loan-summary-card">
        <div class="loan-summary-card__icon" :style="{ backgroundColor: loan.iconBg }">
          <span v-html="loan.icon"></span>
        </div>
        <div class="loan-summary-card__info">
          <span class="loan-summary-card__type">{{ loan.type }}</span>
          <span class="loan-summary-card__amount">{{ loan.amount }}</span>
        </div>
      </div>
    </div>

    <!-- Active Loans Table -->
    <div class="loans-page__table-section">
      <h2 class="loans-page__section-title">Active Loans Overview</h2>
      <div class="loans-table-card">
        <div class="loans-table-container">
          <table class="loans-table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Loan Money</th>
                <th>Left to repay</th>
                <th>Duration</th>
                <th>Interest rate</th>
                <th>Installment</th>
                <th class="text-right">Repay</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="loan in activeLoans" :key="loan.id">
                <td class="text-muted">{{ loan.slNo }}</td>
                <td>{{ loan.loanMoney }}</td>
                <td>{{ loan.leftToRepay }}</td>
                <td>{{ loan.duration }}</td>
                <td>{{ loan.interestRate }}</td>
                <td>{{ loan.installment }}</td>
                <td class="text-right">
                  <button
                    :class="['repay-btn', { 'repay-btn--active': loan.highlighted }]"
                    @click="handleRepay(loan.id)"
                  >
                    Repay
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="loans-table__total-row">
                <td class="loans-table__total-label">Total</td>
                <td class="loans-table__total-value">{{ totalLoanMoney }}</td>
                <td class="loans-table__total-value">{{ totalLeftToRepay }}</td>
                <td></td>
                <td></td>
                <td class="loans-table__total-value">{{ totalInstallment }}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

definePageMeta({
  
  title: 'Loans',
})

useHead({ title: 'Loans - BankDash' })

const { data } = await useApi('/loans')

const loanTypes = computed(() => {
  const types = data.value?.loan_types || []
  const iconMap = {
    personal: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="5" stroke="#396AFF" stroke-width="1.8"/><path d="M5 24C5 20 9 18 14 18C19 18 23 20 23 24" stroke="#396AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
    corporate: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="7" width="20" height="14" rx="2" stroke="#FFBB38" stroke-width="1.8"/><path d="M4 12H24" stroke="#FFBB38" stroke-width="1.8"/><path d="M9 17H13" stroke="#FFBB38" stroke-width="1.8" stroke-linecap="round"/></svg>',
    business: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 23V10L14 5L23 10V23H5Z" stroke="#FF4B4A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="10" y="16" width="8" height="7" stroke="#FF4B4A" stroke-width="1.8"/></svg>',
    equity: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 20L14 14L20 20" stroke="#16DBCC" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 14L12 10L16 14L20 8" stroke="#16DBCC" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  }
  const bgMap = {
    personal: '#E7EDFF',
    corporate: '#FFF5D9',
    business: '#FFE0EB',
    equity: '#DCFAF8',
  }
  return types.map(t => ({
    id: t.id === 'personal' ? 1 : t.id === 'corporate' ? 2 : t.id === 'business' ? 3 : 4,
    type: t.label,
    amount: t.value,
    iconBg: bgMap[t.id] || '#E7EDFF',
    icon: iconMap[t.id] || '',
  }))
})

const activeLoansRaw = computed(() => data.value?.active_loans || [])

const activeLoans = computed(() => {
  return activeLoansRaw.value.map((l, index) => ({
    id: l.id,
    slNo: `0${index + 1}.`,
    loanMoney: '$' + l.amount.toLocaleString('en-US'),
    leftToRepay: '$' + l.leftToPay.toLocaleString('en-US'),
    duration: l.duration,
    interestRate: l.interestRate + '%',
    installment: '$' + l.repayAmount.toLocaleString('en-US') + ' / month',
    highlighted: index === 0,
  }))
})

const totalLoanMoney = computed(() => {
  const total = activeLoansRaw.value.reduce((acc, l) => acc + l.amount, 0)
  return '$' + total.toLocaleString('en-US')
})

const totalLeftToRepay = computed(() => {
  const total = activeLoansRaw.value.reduce((acc, l) => acc + l.leftToPay, 0)
  return '$' + total.toLocaleString('en-US')
})

const totalInstallment = computed(() => {
  const total = activeLoansRaw.value.reduce((acc, l) => acc + l.repayAmount, 0)
  return '$' + total.toLocaleString('en-US') + ' / month'
})

function handleRepay(id) {
  console.log('Repay loan ID:', id)
}
</script>

<style scoped>
.loans-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Summary cards ─────────────────────────────── */
.loans-page__summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.loan-summary-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: box-shadow 0.2s ease;
}

.loan-summary-card:hover {
  box-shadow: var(--shadow-md);
}

.loan-summary-card__icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.loan-summary-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.loan-summary-card__type {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.loan-summary-card__amount {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text);
}

/* ── Section title ─────────────────────────────── */
.loans-page__section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

/* ── Table ─────────────────────────────────────── */
.loans-table-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.loans-table-container {
  overflow-x: auto;
}

.loans-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.loans-table th {
  padding: 0.75rem 1rem 1rem;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  border-bottom: 1px solid var(--color-border);
}

.loans-table td {
  padding: 1.125rem 1rem;
  font-size: 14px;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.loans-table tr:last-child td {
  border-bottom: none;
}

.text-muted {
  color: var(--color-text-light) !important;
}

.text-right {
  text-align: right;
}

.repay-btn {
  border: 1.5px solid var(--color-border);
  background: none;
  padding: 0.4rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.repay-btn--active {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.repay-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: rgba(57, 106, 255, 0.04);
}

/* ── Total footer row ──────────────────────────── */
.loans-table__total-row td {
  border-top: 1px solid var(--color-border);
  border-bottom: none !important;
  padding-top: 1rem;
}

.loans-table__total-label {
  font-weight: 700;
  color: var(--color-danger) !important;
}

.loans-table__total-value {
  font-weight: 700;
  color: var(--color-danger) !important;
}

@media (max-width: 1100px) {
  .loans-page__summary {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .loans-page__summary {
    grid-template-columns: 1fr;
  }
}
</style>
