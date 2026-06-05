<template>
  <div class="weekly-activity">
    <div class="weekly-activity__header">
      <h2 class="weekly-activity__title">Weekly Activity</h2>
      <div class="weekly-activity__legend">
        <div class="weekly-activity__legend-item">
          <span class="weekly-activity__legend-dot weekly-activity__legend-dot--deposit"></span>
          <span>Diposit</span>
        </div>
        <div class="weekly-activity__legend-item">
          <span class="weekly-activity__legend-dot weekly-activity__legend-dot--withdraw"></span>
          <span>Withdraw</span>
        </div>
      </div>
    </div>

    <div class="weekly-activity__chart">
      <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" class="weekly-activity__svg">
        <!-- Y Axis Labels -->
        <text
          v-for="label in yLabels"
          :key="label.value"
          x="25"
          :y="label.y + 4"
          class="weekly-activity__axis-label"
          text-anchor="end"
        >
          {{ label.value }}
        </text>

        <!-- Horizontal grid lines -->
        <line
          v-for="label in yLabels"
          :key="'grid-' + label.value"
          :x1="gridLeft"
          :y1="label.y"
          :x2="svgWidth - 10"
          :y2="label.y"
          stroke="#F3F3F5"
          stroke-width="1"
          stroke-dasharray="4 3"
        />

        <!-- Bars -->
        <g v-for="(item, index) in chartData" :key="item.day">
          <!-- Deposit bar -->
          <rect
            :x="gridLeft + index * barGroupWidth + barGroupPadding"
            :y="chartTop + chartAreaHeight - item.depositHeight"
            :width="barWidth"
            :height="item.depositHeight"
            :rx="barWidth / 2"
            fill="#1814F3"
            class="weekly-activity__bar"
          />
          <!-- Withdraw bar -->
          <rect
            :x="gridLeft + index * barGroupWidth + barGroupPadding + barWidth + barGap"
            :y="chartTop + chartAreaHeight - item.withdrawHeight"
            :width="barWidth"
            :height="item.withdrawHeight"
            :rx="barWidth / 2"
            fill="#16DBCC"
            class="weekly-activity__bar"
          />
          <!-- Day label -->
          <text
            :x="gridLeft + index * barGroupWidth + barGroupPadding + barWidth + barGap / 2"
            :y="svgHeight - 5"
            text-anchor="middle"
            class="weekly-activity__day-label"
          >
            {{ item.day }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChartDataItem {
  day: string
  deposit: number
  withdraw: number
  depositHeight: number
  withdrawHeight: number
}

import { computed } from 'vue'

const { data } = await useApi<{
  weekly_activity: { day: string; withdraw: number; deposit: number }[]
}>('/dashboard', { key: 'dashboard' })

const rawData = computed(() => data.value?.weekly_activity || [])

const svgWidth = 560
const svgHeight = 260
const chartTop = 15
const chartAreaHeight = 200
const gridLeft = 40
const barWidth = 18
const barGap = 6
const barGroupPadding = 20
const barGroupWidth = computed(() => (svgWidth - gridLeft - 10) / Math.max(rawData.value.length, 1))

const maxValue = 500

const yLabels = [0, 100, 200, 300, 400, 500].reverse().map((value) => ({
  value,
  y: chartTop + chartAreaHeight - (value / maxValue) * chartAreaHeight,
}))

const chartData = computed<ChartDataItem[]>(() => {
  return rawData.value.map((item) => ({
    day: item.day,
    deposit: item.deposit,
    withdraw: item.withdraw,
    depositHeight: Math.max((item.deposit / maxValue) * chartAreaHeight, 2),
    withdrawHeight: Math.max((item.withdraw / maxValue) * chartAreaHeight, 2),
  }))
})
</script>

<style scoped>
.weekly-activity {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.weekly-activity__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.weekly-activity__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.weekly-activity__legend {
  display: flex;
  gap: 1.25rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.weekly-activity__legend-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.weekly-activity__legend-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
}

.weekly-activity__legend-dot--deposit {
  background-color: #16dbcc;
}

.weekly-activity__legend-dot--withdraw {
  background-color: #fe5c73;
}

.weekly-activity__chart {
  overflow-x: auto;
}

.weekly-activity__svg {
  width: 100%;
  height: auto;
  min-width: 400px;
}

.weekly-activity__bar {
  transition: opacity 0.2s ease;
}

.weekly-activity__bar:hover {
  opacity: 0.8;
}

.weekly-activity__axis-label {
  font-size: 10px;
  fill: var(--color-text-muted);
  font-family: var(--font-family);
}

.weekly-activity__day-label {
  font-size: 11px;
  fill: var(--color-text-muted);
  font-family: var(--font-family);
}
</style>
