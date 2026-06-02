<template>
  <div class="balance-history">
    <div class="balance-history__header">
      <h2 class="balance-history__title">Balance History</h2>
    </div>

    <div class="balance-history__chart">
      <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" class="balance-history__svg">
        <defs>
          <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2D60FF" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#2D60FF" stop-opacity="0.02" />
          </linearGradient>
        </defs>

        <!-- Y Axis Labels -->
        <text v-for="label in yLabels" :key="label.value" x="25" :y="label.y + 4" class="balance-history__axis-label" text-anchor="end">
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

        <!-- Area fill -->
        <path :d="areaPath" fill="url(#balanceGradient)" />

        <!-- Line -->
        <path :d="linePath" fill="none" stroke="#1814F3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Month labels -->
        <text
          v-for="(label, index) in monthLabels"
          :key="label"
          :x="gridLeft + index * monthSpacing"
          :y="svgHeight - 5"
          class="balance-history__month-label"
          text-anchor="middle"
        >
          {{ label }}
        </text>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DataPoint {
  month: string
  balance: number
}

const data: DataPoint[] = [
  { month: 'Jul', balance: 120 },
  { month: 'Aug', balance: 350 },
  { month: 'Sep', balance: 250 },
  { month: 'Oct', balance: 480 },
  { month: 'Nov', balance: 150 },
  { month: 'Dec', balance: 620 },
  { month: 'Jan', balance: 600 },
]

const svgWidth = 520
const svgHeight = 230
const gridLeft = 40
const chartTop = 15
const chartAreaHeight = 175
const maxValue = 800

const monthLabels = data.map((d) => d.month)
const monthSpacing = (svgWidth - gridLeft - 20) / (data.length - 1)

const yLabels = [0, 200, 400, 600, 800].reverse().map((value) => ({
  value,
  y: chartTop + chartAreaHeight - (value / maxValue) * chartAreaHeight,
}))

interface Point {
  x: number
  y: number
}

const points: Point[] = data.map((item, index) => ({
  x: gridLeft + index * monthSpacing,
  y: chartTop + chartAreaHeight - (item.balance / maxValue) * chartAreaHeight,
}))

// Create smooth bezier curve
const linePath = points
  .map((point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    }
    const prevPoint = points[index - 1]
    if (!prevPoint) return ''
    const tension = 0.35
    const cpx1 = prevPoint.x + (point.x - prevPoint.x) * tension
    const cpx2 = point.x - (point.x - prevPoint.x) * tension
    return `C ${cpx1} ${prevPoint.y} ${cpx2} ${point.y} ${point.x} ${point.y}`
  })
  .join(' ')

const lastPoint = points[points.length - 1]
const firstPoint = points[0]
const areaPath =
  lastPoint && firstPoint
    ? `${linePath} L ${lastPoint.x} ${chartTop + chartAreaHeight} L ${firstPoint.x} ${chartTop + chartAreaHeight} Z`
    : ''
</script>

<style scoped>
.balance-history {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.balance-history__header {
  margin-bottom: 1rem;
}

.balance-history__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.balance-history__chart {
  overflow-x: auto;
}

.balance-history__svg {
  width: 100%;
  height: auto;
  min-width: 400px;
}

.balance-history__axis-label {
  font-size: 10px;
  fill: var(--color-text-muted);
  font-family: var(--font-family);
}

.balance-history__month-label {
  font-size: 11px;
  fill: var(--color-text-muted);
  font-family: var(--font-family);
}
</style>
