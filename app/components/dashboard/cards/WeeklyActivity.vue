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
  const max = Math.max(
    ...days.value.flatMap(d => [d.withdraw || 0, d.deposit || 0]),
    100,
  )
  return Math.ceil(max / 100) * 100
})

const yAxisLabels = computed(() => {
  const max = maxValue.value
  return [0, max * 0.25, max * 0.5, max * 0.75, max].map(v =>
    Math.round(v).toLocaleString('en-US'),
  )
})
</script>

<template>
  <v-card class="weekly-activity" elevation="0" rounded="xl">
    <div class="weekly-activity__header">
      <h2 class="text-h6 font-weight-bold text-grey-darken-4">Weekly Activity</h2>
      <div class="weekly-activity__legend">
        <div class="weekly-activity__legend-item">
          <span class="weekly-activity__legend-dot weekly-activity__legend-dot--deposit" />
          <span>Deposit</span>
        </div>
        <div class="weekly-activity__legend-item">
          <span class="weekly-activity__legend-dot weekly-activity__legend-dot--withdraw" />
          <span>Withdraw</span>
        </div>
      </div>
    </div>

    <div class="weekly-activity__chart-wrapper">
      <!-- Y axis labels -->
      <div class="weekly-activity__y-axis">
        <span v-for="(label, idx) in yAxisLabels" :key="idx">{{ label }}</span>
      </div>

      <div class="weekly-activity__chart">
        <div
          v-for="(day, idx) in days"
          :key="idx"
          class="weekly-activity__bar-group"
        >
          <div class="weekly-activity__bars">
            <div
              class="weekly-activity__bar weekly-activity__bar--withdraw"
              :style="{ height: `${(day.withdraw / maxValue) * 100}%` }"
            />
            <div
              class="weekly-activity__bar weekly-activity__bar--deposit"
              :style="{ height: `${(day.deposit / maxValue) * 100}%` }"
            />
          </div>
          <span class="weekly-activity__day">{{ day.day }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.weekly-activity {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border-radius: 25px !important;
}

.weekly-activity__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.weekly-activity__chart-wrapper {
  display: flex;
  gap: 0.75rem;
}

.weekly-activity__y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.75rem;
  color: #b1b1b1;
  text-align: right;
  min-width: 32px;
  height: 200px;
}

.weekly-activity__y-axis span {
  display: block;
  transform: translateY(-50%);
}

.weekly-activity__y-axis span:first-child {
  transform: translateY(0);
}

.weekly-activity__y-axis span:last-child {
  transform: translateY(0);
}

.weekly-activity__chart {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  flex: 1;
  height: 200px;
  border-bottom: 1px solid #e6eff5;
  padding-bottom: 0.5rem;
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
  gap: 6px;
  flex: 1;
  width: 100%;
  justify-content: center;
  height: 100%;
}

.weekly-activity__bar {
  width: 16px;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.weekly-activity__bar--withdraw {
  background-color: #1814f3;
}

.weekly-activity__bar--deposit {
  background-color: #16dbcc;
}

.weekly-activity__day {
  font-size: 0.8125rem;
  color: #718ebf;
  font-weight: 400;
}

.weekly-activity__legend {
  display: flex;
  gap: 1.5rem;
}

.weekly-activity__legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #b1b1b1;
}

.weekly-activity__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.weekly-activity__legend-dot--withdraw {
  background-color: #1814f3;
}

.weekly-activity__legend-dot--deposit {
  background-color: #16dbcc;
}
</style>
