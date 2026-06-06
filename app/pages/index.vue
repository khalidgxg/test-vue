<script setup>
useHead({ title: 'Overview' })

const { data: dashboard } = await useApi('/dashboard', { key: 'dashboard' })

definePageMeta({
  title: 'Overview',
})
</script>

<template>
  <div class="dashboard-page">
    <!-- Row 1: My Cards + Recent Transaction -->
    <v-row dense>
      <v-col cols="12" lg="7">
        <DashboardCardsMyCards />
      </v-col>
      <v-col cols="12" lg="5">
        <DashboardCardsRecentTransaction />
      </v-col>
    </v-row>

    <!-- Row 2: Weekly Activity + Expense Statistics (donut) -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="7">
        <DashboardCardsWeeklyActivity :data="dashboard?.weekly_activity" />
      </v-col>
      <v-col cols="12" lg="5">
        <DashboardCardsExpenseStatistics :data="dashboard?.expense_statistics" />
      </v-col>
    </v-row>

    <!-- Row 3: Quick Transfer + Balance History -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="5">
        <DashboardCardsQuickTransfer :contacts="dashboard?.quick_transfer" />
      </v-col>
      <v-col cols="12" lg="7">
        <DashboardCardsBalanceHistory :data="dashboard?.balance_history" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
