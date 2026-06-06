<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const stats = computed(() => props.data || [])

// Build donut chart paths using SVG
const donutSegments = computed(() => {
  const total = stats.value.reduce((acc, item) => acc + item.percentage, 0) || 100
  const radius = 80
  const center = 100
  let cumulativePercentage = 0

  return stats.value.map((item) => {
    const percentage = (item.percentage / total) * 100
    const startAngle = (cumulativePercentage / 100) * 360 - 90
    cumulativePercentage += percentage
    const endAngle = (cumulativePercentage / 100) * 360 - 90

    const startX = center + radius * Math.cos((startAngle * Math.PI) / 180)
    const startY = center + radius * Math.sin((startAngle * Math.PI) / 180)
    const endX = center + radius * Math.cos((endAngle * Math.PI) / 180)
    const endY = center + radius * Math.sin((endAngle * Math.PI) / 180)

    const largeArc = percentage > 50 ? 1 : 0

    return {
      path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
      color: item.color,
      label: item.label,
      percentage: item.percentage,
    }
  })
})
</script>

<template>
  <v-card class="expense-statistics" elevation="0" rounded="xl">
    <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Expense Statistics</h2>

    <div class="expense-statistics__chart">
      <svg viewBox="0 0 200 200" class="expense-statistics__svg">
        <g fill="none" stroke-width="28">
          <path
            v-for="(segment, idx) in donutSegments"
            :key="idx"
            :d="segment.path"
            :stroke="segment.color"
          />
        </g>
      </svg>
    </div>

    <div class="expense-statistics__legend">
      <div
        v-for="(item, idx) in stats"
        :key="idx"
        class="expense-statistics__legend-item"
      >
        <span
          class="expense-statistics__legend-dot"
          :style="{ backgroundColor: item.color }"
        />
        <span class="expense-statistics__legend-label">{{ item.label }}</span>
        <span class="expense-statistics__legend-value">{{ item.percentage }}%</span>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.expense-statistics {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border-radius: 25px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.expense-statistics__chart {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  min-height: 220px;
}

.expense-statistics__svg {
  width: 200px;
  height: 200px;
}

.expense-statistics__legend {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
}

.expense-statistics__legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.expense-statistics__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.expense-statistics__legend-label {
  flex: 1;
  color: #b1b1b1;
  font-size: 0.8125rem;
}

.expense-statistics__legend-value {
  font-weight: 700;
  color: #343c6a;
  font-size: 0.9375rem;
}
</style>
