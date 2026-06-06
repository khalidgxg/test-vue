<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const data = computed(() => props.data || [])

const chartPaths = computed(() => {
  const points = data.value
  if (!points.length) return { line: '', area: '' }

  const maxVal = Math.max(...points.map(d => d.balance), 100)
  const minVal = 0
  const range = maxVal - minVal
  const width = 100
  const height = 100
  const stepX = width / (points.length - 1 || 1)

  // Create smooth curve using cubic bezier
  const coordinates = points.map((d, i) => ({
    x: i * stepX,
    y: height - ((d.balance - minVal) / range) * height,
  }))

  // Build smooth path with cubic bezier
  let linePath = `M ${coordinates[0].x} ${coordinates[0].y}`
  for (let i = 0; i < coordinates.length - 1; i++) {
    const current = coordinates[i]
    const next = coordinates[i + 1]
    const cp1x = current.x + (next.x - current.x) * 0.5
    const cp1y = current.y
    const cp2x = current.x + (next.x - current.x) * 0.5
    const cp2y = next.y
    linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
  }

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`

  return { line: linePath, area: areaPath }
})

const yLabels = computed(() => {
  const maxVal = Math.max(...data.value.map(d => d.balance), 100)
  const max = Math.ceil(maxVal / 200) * 200
  return [0, 0.25, 0.5, 0.75, 1].map(r => Math.round(max * r).toString())
})
</script>

<template>
  <v-card class="balance-history" elevation="0" rounded="xl">
    <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Balance History</h2>

    <div class="balance-history__chart-wrapper">
      <!-- Y axis -->
      <div class="balance-history__y-axis">
        <span v-for="(label, idx) in yLabels" :key="idx">{{ label }}</span>
      </div>

      <div class="balance-history__chart">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class="balance-history__svg"
        >
          <defs>
            <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#396AFF" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#396AFF" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path
            :d="chartPaths.area"
            fill="url(#balanceGradient)"
          />
          <path
            :d="chartPaths.line"
            fill="none"
            stroke="#396AFF"
            stroke-width="0.8"
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="balance-history__x-axis">
      <span v-for="(point, idx) in data" :key="idx">{{ point.month }}</span>
    </div>
  </v-card>
</template>

<style scoped>
.balance-history {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border-radius: 25px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.balance-history__chart-wrapper {
  display: flex;
  gap: 0.75rem;
  flex: 1;
  min-height: 220px;
}

.balance-history__y-axis {
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

.balance-history__chart {
  flex: 1;
  height: 200px;
}

.balance-history__svg {
  width: 100%;
  height: 100%;
  display: block;
}

.balance-history__x-axis {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-inline-start: 40px;
  font-size: 0.8125rem;
  color: #718ebf;
}
</style>
