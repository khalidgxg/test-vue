<template>
  <div class="expense-statistics">
    <div class="expense-statistics__header">
      <h2 class="expense-statistics__title">Expense Statistics</h2>
    </div>

    <div class="expense-statistics__chart">
      <svg viewBox="0 0 260 260" class="expense-statistics__svg">
        <g transform="translate(130, 130)">
          <path
            v-for="(segment, index) in segments"
            :key="index"
            :d="segment.path"
            :fill="segment.color"
            stroke="#FFFFFF"
            stroke-width="3"
            stroke-linejoin="round"
            class="expense-statistics__segment"
          />
          <!-- Labels on segments -->
          <g v-for="(segment, index) in segments" :key="'label-' + index">
            <text
              :x="segment.labelX"
              :y="segment.labelY - 6"
              text-anchor="middle"
              class="expense-statistics__segment-percent"
              fill="white"
              font-weight="700"
              font-size="14"
            >
              {{ segment.percentage }}%
            </text>
            <text
              :x="segment.labelX"
              :y="segment.labelY + 10"
              text-anchor="middle"
              class="expense-statistics__segment-name"
              fill="white"
              font-weight="500"
              font-size="9"
            >
              {{ segment.name }}
            </text>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Expense {
  category: string
  percentage: number
  color: string
  radius: number
}

// Order goes clockwise starting from the top (-90deg), matching the Figma layout.
// Each slice has its own radius to recreate the signature "exploded" pie look.
const expenses: Expense[] = [
  { category: 'Entertainment', percentage: 30, color: '#343C6A', radius: 92 },
  { category: 'Bill Expense', percentage: 15, color: '#FC7900', radius: 112 },
  { category: 'Others', percentage: 35, color: '#396AFF', radius: 100 },
  { category: 'Investment', percentage: 20, color: '#FA00FF', radius: 118 },
]

interface Segment {
  path: string
  color: string
  percentage: number
  name: string
  labelX: number
  labelY: number
}

const segments: Segment[] = []
const gapAngle = 2 // small white gap between slices
let currentAngle = -90

for (const expense of expenses) {
  const angle = (expense.percentage / 100) * 360
  const startAngle = currentAngle + gapAngle / 2
  const endAngle = currentAngle + angle - gapAngle / 2
  const midAngle = currentAngle + angle / 2
  const radius = expense.radius

  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180
  const midRad = (midAngle * Math.PI) / 180

  const x1 = radius * Math.cos(startRad)
  const y1 = radius * Math.sin(startRad)
  const x2 = radius * Math.cos(endRad)
  const y2 = radius * Math.sin(endRad)

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

  // Label position (around 62% of this slice's radius from center)
  const labelRadius = radius * 0.62
  const labelX = labelRadius * Math.cos(midRad)
  const labelY = labelRadius * Math.sin(midRad)

  segments.push({
    path,
    color: expense.color,
    percentage: expense.percentage,
    name: expense.category,
    labelX,
    labelY,
  })
  currentAngle += angle
}
</script>

<style scoped>
.expense-statistics {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.expense-statistics__header {
  margin-bottom: 1rem;
}

.expense-statistics__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.expense-statistics__chart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expense-statistics__svg {
  width: 240px;
  height: 240px;
  max-width: 100%;
}

.expense-statistics__segment {
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.expense-statistics__segment:hover {
  opacity: 0.85;
}

.expense-statistics__segment-percent {
  font-family: var(--font-family);
  pointer-events: none;
}

.expense-statistics__segment-name {
  font-family: var(--font-family);
  pointer-events: none;
}
</style>
