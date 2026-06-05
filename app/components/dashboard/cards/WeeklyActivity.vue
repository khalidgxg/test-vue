<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const days = computed(() => props.data || [])
const maxValue = computed(() => {
  if (!days.value.length) return 500
  return Math.max(
    ...days.value.flatMap(d => [d.withdraw || 0, d.deposit || 0]),
    100,
  )
})
</script>

<template>
  <v-card class="weekly-activity" elevation="0">
    <h2 class="text-h6 font-weight-bold mb-4">Weekly Activity</h2>

    <div class="weekly-activity__chart">
      <div
        v-for="(day, idx) in days"
        :key="idx"
        class="weekly-activity__bar-group"
      >
        <div class="weekly-activity__bars">
          <div
            class="weekly-activity__bar weekly-activity__bar--withdraw"
            :style="{ height: `${((day.withdraw || 0) / maxValue) * 100}%` }"
          />
          <div
            class="weekly-activity__bar weekly-activity__bar--deposit"
            :style="{ height: `${((day.deposit || 0) / maxValue) * 100}%` }"
          />
        </div>
        <span class="weekly-activity__day">{{ day.day }}</span>
      </div>
    </div>

    <div class="weekly-activity__legend">
      <div class="weekly-activity__legend-item">
        <span class="weekly-activity__legend-dot weekly-activity__legend-dot--withdraw" />
        <span>Withdraw</span>
      </div>
      <div class="weekly-activity__legend-item">
        <span class="weekly-activity__legend-dot weekly-activity__legend-dot--deposit" />
        <span>Deposit</span>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.weekly-activity {
  padding: 1.5rem !important;
  background: transparent !important;
  border: 1px solid rgb(var(--v-theme-grey-100));
}

.weekly-activity__chart {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  height: 200px;
  padding: 1rem 0;
}

.weekly-activity__bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
}

.weekly-activity__bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  flex: 1;
  width: 100%;
  justify-content: center;
}

.weekly-activity__bar {
  width: 14px;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.weekly-activity__bar--withdraw {
  background-color: #343C6A;
}

.weekly-activity__bar--deposit {
  background-color: #16DBCC;
}

.weekly-activity__day {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-grey-300, 177 177 177));
  font-weight: 500;
}

.weekly-activity__legend {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(var(--v-theme-grey-100));
}

.weekly-activity__legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: rgb(var(--v-theme-grey-500));
}

.weekly-activity__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.weekly-activity__legend-dot--withdraw {
  background-color: #343C6A;
}

.weekly-activity__legend-dot--deposit {
  background-color: #16DBCC;
}
</style>
