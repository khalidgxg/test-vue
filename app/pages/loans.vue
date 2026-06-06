<script setup>
useHead({ title: 'Loans' })
definePageMeta({ title: 'Loans' })

const { data: loans } = await useApi('/loans', { key: 'loans' })

const loanTypeIcons = [
  { icon: 'mdi-account-outline', color: '#396AFF', bg: '#E7EDFF' },
  { icon: 'mdi-briefcase-outline', color: '#FFBB38', bg: '#FFF5D9' },
  { icon: 'mdi-chart-bar', color: '#FF4B4A', bg: '#FFE0EB' },
  { icon: 'mdi-tools', color: '#16DBCC', bg: '#DCFAF8' },
]

const activeLoans = computed(() => loans.value?.active_loans || [])
const totalMoney = computed(() => activeLoans.value.reduce((sum, l) => sum + l.amount, 0))
const totalLeft = computed(() => activeLoans.value.reduce((sum, l) => sum + l.leftToPay, 0))
const totalMonthly = computed(() => activeLoans.value.reduce((sum, l) => sum + l.repayAmount, 0))
</script>

<template>
  <div class="loans-page">
    <!-- 4 Summary cards -->
    <v-row dense>
      <v-col
        v-for="(loan, idx) in loans?.loan_types"
        :key="loan.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="summary-card" elevation="0" rounded="xl">
          <v-avatar :color="loanTypeIcons[idx]?.bg" size="55" rounded="circle">
            <v-icon :color="loanTypeIcons[idx]?.color" size="26">
              {{ loanTypeIcons[idx]?.icon }}
            </v-icon>
          </v-avatar>
          <div class="summary-card__info">
            <span class="summary-card__label">{{ loan.label }}</span>
            <span class="summary-card__value">{{ loan.value }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Active Loans Overview -->
    <h2 class="text-h6 font-weight-bold text-grey-darken-4 mt-6 mb-3">Active Loans Overview</h2>

    <v-card class="data-card" elevation="0" rounded="xl">
      <v-table density="comfortable" class="loans-table">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Loan Money</th>
            <th>Left to repay</th>
            <th>Duration</th>
            <th>Interest rate</th>
            <th>Installment</th>
            <th>Repay</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(loan, idx) in activeLoans" :key="loan.id">
            <td class="text-grey">{{ String(idx + 1).padStart(2, '0') }}.</td>
            <td><strong>${{ loan.amount.toLocaleString() }}</strong></td>
            <td>${{ loan.leftToPay.toLocaleString() }}</td>
            <td>{{ loan.duration }}</td>
            <td>{{ loan.interestRate }}%</td>
            <td>${{ loan.repayAmount.toLocaleString() }} / month</td>
            <td>
              <v-btn
                variant="outlined"
                color="primary"
                rounded="pill"
                size="small"
                class="text-none"
              >
                Repay
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-error"><strong>Total</strong></td>
            <td class="text-error"><strong>${{ totalMoney.toLocaleString() }}</strong></td>
            <td class="text-error"><strong>${{ totalLeft.toLocaleString() }}</strong></td>
            <td></td>
            <td></td>
            <td class="text-error"><strong>${{ totalMonthly.toLocaleString() }} / month</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </v-table>
    </v-card>
  </div>
</template>

<style scoped>
.loans-page {
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

.loans-table {
  background: transparent !important;
}

.loans-table :deep(th) {
  color: #b1b1b1 !important;
  font-weight: 500 !important;
  font-size: 0.875rem !important;
  border-bottom: 1px solid #e6eff5 !important;
}

.loans-table :deep(td) {
  border-bottom: 1px solid #e6eff5 !important;
  color: #343c6a;
}

.loans-table :deep(tfoot td) {
  border-top: 2px solid #e6eff5;
  border-bottom: none;
  padding-top: 1rem;
}
</style>
