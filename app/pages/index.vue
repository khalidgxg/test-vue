<template>
  <div class="page-dashboard">
    <div class="page-dashboard__top">
      <DashboardCardsMyCards class="page-dashboard__cards" />
      <DashboardCardsRecentTransaction class="page-dashboard__transactions" />
    </div>

    <div class="page-dashboard__middle">
      <DashboardCardsWeeklyActivity class="page-dashboard__activity" />
      <DashboardCardsExpenseStatistics class="page-dashboard__expenses" />
    </div>

    <div class="page-dashboard__bottom">
      <DashboardCardsQuickTransfer class="page-dashboard__transfer" />
      <DashboardCardsBalanceHistory class="page-dashboard__balance" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Dashboard',
})
</script>

<style scoped>
.page-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.page-dashboard__top {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.25rem;
}

.page-dashboard__middle {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.25rem;
}

.page-dashboard__bottom {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 1.25rem;
}

@media (max-width: 1100px) {
  .page-dashboard__top,
  .page-dashboard__middle,
  .page-dashboard__bottom {
    grid-template-columns: 1fr;
  }
}
</style>
