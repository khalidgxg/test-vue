<template>
  <div class="investments-page">
    <!-- Summary Cards -->
    <div class="investments-page__summary">
      <div v-for="stat in summaryStats" :key="stat.id" class="inv-stat-card">
        <div class="inv-stat-card__icon" :style="{ backgroundColor: stat.iconBg }">
          <span v-html="stat.icon"></span>
        </div>
        <div class="inv-stat-card__info">
          <span class="inv-stat-card__label">{{ stat.label }}</span>
          <span class="inv-stat-card__value">{{ stat.value }}</span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="investments-page__charts">
      <!-- Yearly Total Investment (Line Chart) -->
      <div class="chart-card">
        <h2 class="chart-card__title">Yearly Total Investment</h2>
        <div class="chart-card__body">
          <svg :viewBox="`0 0 ${yearlyChart.width} ${yearlyChart.height}`" class="chart-svg">
            <defs>
              <linearGradient id="yearlyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FCAA0B" stop-opacity="0.2" />
                <stop offset="100%" stop-color="#FCAA0B" stop-opacity="0.01" />
              </linearGradient>
            </defs>
            <!-- Grid lines -->
            <line
              v-for="label in yearlyChart.yLabels"
              :key="'yg-' + label.value"
              :x1="yearlyChart.gridLeft"
              :y1="label.y"
              :x2="yearlyChart.width - 10"
              :y2="label.y"
              stroke="#F3F3F5"
              stroke-width="1"
              stroke-dasharray="4 3"
            />
            <!-- Y labels -->
            <text
              v-for="label in yearlyChart.yLabels"
              :key="'yl-' + label.value"
              :x="yearlyChart.gridLeft - 5"
              :y="label.y + 4"
              class="chart-axis-label"
              text-anchor="end"
            >
              {{ label.text }}
            </text>
            <!-- Area -->
            <path :d="yearlyAreaPath" fill="url(#yearlyGrad)" />
            <!-- Line -->
            <path
              :d="yearlyLinePath"
              fill="none"
              stroke="#FCAA0B"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- X labels -->
            <text
              v-for="(label, i) in yearlyChart.xLabels"
              :key="'xl-' + label"
              :x="yearlyChart.gridLeft + i * yearlyChart.xSpacing"
              :y="yearlyChart.height - 5"
              class="chart-axis-label"
              text-anchor="middle"
            >
              {{ label }}
            </text>
          </svg>
        </div>
      </div>

      <!-- Monthly Revenue (Smooth Curve) -->
      <div class="chart-card">
        <h2 class="chart-card__title">Monthly Revenue</h2>
        <div class="chart-card__body">
          <svg :viewBox="`0 0 ${monthlyChart.width} ${monthlyChart.height}`" class="chart-svg">
            <defs>
              <linearGradient id="monthlyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#16DBCC" stop-opacity="0.18" />
                <stop offset="100%" stop-color="#16DBCC" stop-opacity="0.01" />
              </linearGradient>
            </defs>
            <!-- Grid lines -->
            <line
              v-for="label in monthlyChart.yLabels"
              :key="'mg-' + label.value"
              :x1="monthlyChart.gridLeft"
              :y1="label.y"
              :x2="monthlyChart.width - 10"
              :y2="label.y"
              stroke="#F3F3F5"
              stroke-width="1"
              stroke-dasharray="4 3"
            />
            <!-- Y labels -->
            <text
              v-for="label in monthlyChart.yLabels"
              :key="'ml-' + label.value"
              :x="monthlyChart.gridLeft - 5"
              :y="label.y + 4"
              class="chart-axis-label"
              text-anchor="end"
            >
              {{ label.text }}
            </text>
            <!-- Area -->
            <path :d="monthlyAreaPath" fill="url(#monthlyGrad)" />
            <!-- Line -->
            <path
              :d="monthlyLinePath"
              fill="none"
              stroke="#16DBCC"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- X labels -->
            <text
              v-for="(label, i) in monthlyChart.xLabels"
              :key="'mxl-' + label"
              :x="monthlyChart.gridLeft + i * monthlyChart.xSpacing"
              :y="monthlyChart.height - 5"
              class="chart-axis-label"
              text-anchor="middle"
            >
              {{ label }}
            </text>
          </svg>
        </div>
      </div>
    </div>

    <!-- Bottom Row: My Investment + Trending Stock -->
    <div class="investments-page__bottom">
      <!-- My Investment -->
      <div class="my-investment-card">
        <h2 class="section-title">My Investment</h2>
        <div class="my-investment-list">
          <div v-for="inv in myInvestments" :key="inv.id" class="my-investment-item">
            <div class="my-investment-item__icon" :style="{ backgroundColor: inv.iconBg }">
              <span v-html="inv.icon"></span>
            </div>
            <div class="my-investment-item__info">
              <span class="my-investment-item__name">{{ inv.name }}</span>
              <span class="my-investment-item__category">{{ inv.category }}</span>
            </div>
            <div class="my-investment-item__stats">
              <div class="my-investment-item__value-group">
                <span class="my-investment-item__amount">{{ inv.amount }}</span>
                <span class="my-investment-item__amount-label">Envestment Value</span>
              </div>
              <div class="my-investment-item__value-group">
                <span
                  class="my-investment-item__return"
                  :class="inv.returnPositive ? 'text-success' : 'text-danger'"
                  >{{ inv.returnValue }}</span
                >
                <span class="my-investment-item__amount-label">Return Value</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trending Stock -->
      <div class="trending-stock-card">
        <h2 class="section-title">Trending Stock</h2>
        <div class="trending-table-container">
          <table class="trending-table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Name</th>
                <th>Price</th>
                <th class="text-right">Return</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stock in trendingStocks" :key="stock.id">
                <td class="text-muted">{{ stock.slNo }}</td>
                <td>{{ stock.name }}</td>
                <td>{{ stock.price }}</td>
                <td
                  class="text-right font-bold"
                  :class="stock.returnPositive ? 'text-success' : 'text-danger'"
                >
                  {{ stock.returnValue }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  SummaryStatRaw,
  InvestmentRaw,
  StockRaw,
  SummaryStat,
  Investment,
  Stock
} from '#shared/types'

definePageMeta({
  layout: 'dashboard',
  title: 'Investments',
})

useHead({ title: 'Investments - BankDash' })

const { data } = await useApi<{
  summary_stats: SummaryStatRaw[]
  yearly_data: { year: number; value: number }[]
  monthly_data: { month: string; value: number }[]
  my_investments: InvestmentRaw[]
  trending_stocks: StockRaw[]
}>('/investments')

const summaryStats = computed<SummaryStat[]>(() => {
  const stats = data.value?.summary_stats || []
  const bgMap: Record<string, string> = {
    invested: '#DCFAF8',
    number: '#FFE0EB',
    rate: '#E7EDFF'
  }
  const iconMap: Record<string, string> = {
    invested: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="8" stroke="#16DBCC" stroke-width="1.8"/><path d="M14 10V14L17 17" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round"/></svg>',
    number: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="11" cy="11" r="5" stroke="#FF4B4A" stroke-width="1.8"/><circle cx="19" cy="19" r="5" stroke="#FF4B4A" stroke-width="1.8"/></svg>',
    rate: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14C5 14 8 8 14 8C20 8 23 14 23 14C23 14 20 20 14 20C8 20 5 14 5 14Z" stroke="#396AFF" stroke-width="1.8"/><circle cx="14" cy="14" r="3" stroke="#396AFF" stroke-width="1.8"/></svg>'
  }
  return stats.map((s, idx) => ({
    id: idx + 1,
    label: s.label,
    value: s.value,
    iconBg: bgMap[s.icon] || '#DCFAF8',
    icon: iconMap[s.icon] || ''
  }))
})

const yearlyData = computed(() => {
  const raw = data.value?.yearly_data || []
  return raw.map(d => ({ year: String(d.year), value: d.value }))
})

const yearlyChart = computed(() => {
  const width = 420
  const height = 220
  const gridLeft = 55
  const chartTop = 15
  const areaH = 170
  const maxVal = 40000
  const yData = yearlyData.value
  const xSpacing = (width - gridLeft - 10) / Math.max(yData.length - 1, 1)
  const yLabels = [0, 10000, 20000, 30000, 40000].reverse().map((v) => ({
    value: v,
    y: chartTop + areaH - (v / maxVal) * areaH,
    text: `$${v === 0 ? '0' : v / 1000 + ',000'}`,
  }))
  return {
    width,
    height,
    gridLeft,
    chartTop,
    areaH,
    maxVal,
    xSpacing,
    yLabels,
    xLabels: yData.map((d) => d.year),
  }
})

const yearlyPoints = computed(() => {
  const yData = yearlyData.value
  const chart = yearlyChart.value
  return yData.map((d, i) => ({
    x: chart.gridLeft + i * chart.xSpacing,
    y: chart.chartTop + chart.areaH - (d.value / chart.maxVal) * chart.areaH,
  }))
})

const yearlyLinePath = computed(() => {
  const pts = yearlyPoints.value
  return pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = pts[i - 1]!
      const t = 0.35
      return `C ${prev.x + (p.x - prev.x) * t} ${prev.y} ${p.x - (p.x - prev.x) * t} ${p.y} ${p.x} ${p.y}`
    })
    .join(' ')
})

const yearlyAreaPath = computed(() => {
  const pts = yearlyPoints.value
  const chart = yearlyChart.value
  if (pts.length === 0) return ''
  const first = pts[0]!
  const last = pts[pts.length - 1]!
  return `${yearlyLinePath.value} L ${last.x} ${chart.chartTop + chart.areaH} L ${first.x} ${chart.chartTop + chart.areaH} Z`
})

const monthlyData = computed(() => {
  const raw = data.value?.monthly_data || []
  return raw.map(d => ({ year: d.month, value: d.value }))
})

const monthlyChart = computed(() => {
  const width = 420
  const height = 220
  const gridLeft = 55
  const chartTop = 15
  const areaH = 170
  const maxVal = 40000
  const mData = monthlyData.value
  const xSpacing = (width - gridLeft - 10) / Math.max(mData.length - 1, 1)
  const yLabels = [0, 10000, 20000, 30000, 40000].reverse().map((v) => ({
    value: v,
    y: chartTop + areaH - (v / maxVal) * areaH,
    text: `$${v === 0 ? '0' : v / 1000 + ',000'}`,
  }))
  return {
    width,
    height,
    gridLeft,
    chartTop,
    areaH,
    maxVal,
    xSpacing,
    yLabels,
    xLabels: mData.map((d) => d.year),
  }
})

const monthlyPoints = computed(() => {
  const mData = monthlyData.value
  const chart = monthlyChart.value
  return mData.map((d, i) => ({
    x: chart.gridLeft + i * chart.xSpacing,
    y: chart.chartTop + chart.areaH - (d.value / chart.maxVal) * chart.areaH,
  }))
})

const monthlyLinePath = computed(() => {
  const pts = monthlyPoints.value
  return pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = pts[i - 1]!
      const t = 0.4
      return `C ${prev.x + (p.x - prev.x) * t} ${prev.y} ${p.x - (p.x - prev.x) * t} ${p.y} ${p.x} ${p.y}`
    })
    .join(' ')
})

const monthlyAreaPath = computed(() => {
  const pts = monthlyPoints.value
  const chart = monthlyChart.value
  if (pts.length === 0) return ''
  const first = pts[0]!
  const last = pts[pts.length - 1]!
  return `${monthlyLinePath.value} L ${last.x} ${chart.chartTop + chart.areaH} L ${first.x} ${chart.chartTop + chart.areaH} Z`
})

const myInvestments = computed<Investment[]>(() => {
  const raw = data.value?.my_investments || []
  const bgMap: Record<string, string> = {
    apple: '#FFE0EB',
    google: '#E7EDFF',
    tesla: '#FFF5D9',
  }
  const iconMap: Record<string, string> = {
    apple: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4C9 4 7 6.5 7 9C7 13 10 17 12 20C14 17 17 13 17 9C17 6.5 15 4 12 4Z" stroke="#FF4B4A" stroke-width="1.5"/><circle cx="12" cy="9" r="2" fill="#FF4B4A"/></svg>',
    google: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="2" stroke="#396AFF" stroke-width="1.5"/><circle cx="12" cy="18" r="1" fill="#396AFF"/></svg>',
    tesla: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 10H19M7 10C7 7 9 4 12 4C15 4 17 7 17 10" stroke="#FFBB38" stroke-width="1.5"/><path d="M12 10V20" stroke="#FFBB38" stroke-width="1.5" stroke-linecap="round"/><path d="M9 20H15" stroke="#FFBB38" stroke-width="1.5" stroke-linecap="round"/></svg>',
  }
  return raw.map(inv => ({
    id: inv.id,
    name: inv.name,
    category: inv.category,
    amount: '$' + inv.amount.toLocaleString('en-US'),
    returnValue: (inv.returnRate > 0 ? '+' : '') + inv.returnRate + '%',
    returnPositive: inv.returnType === 'up',
    iconBg: bgMap[inv.icon] || '#FFE0EB',
    icon: iconMap[inv.icon] || '',
  }))
})

const trendingStocks = computed<Stock[]>(() => {
  const raw = data.value?.trending_stocks || []
  return raw.map((stock, index) => ({
    id: stock.id,
    slNo: `0${index + 1}.`,
    name: stock.name,
    price: '$' + stock.price.toLocaleString('en-US'),
    returnValue: (stock.returnRate > 0 ? '+' : '') + stock.returnRate + '%',
    returnPositive: stock.returnType === 'up',
  }))
})
</script>

<style scoped>
.investments-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Summary cards ─────────────────────────────── */
.investments-page__summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.inv-stat-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: box-shadow 0.2s ease;
}

.inv-stat-card:hover {
  box-shadow: var(--shadow-md);
}

.inv-stat-card__icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.inv-stat-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.inv-stat-card__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.inv-stat-card__value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

/* ── Charts row ────────────────────────────────── */
.investments-page__charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.chart-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.chart-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.chart-card__body {
  overflow-x: auto;
}

.chart-svg {
  width: 100%;
  height: auto;
  min-width: 300px;
}

.chart-axis-label {
  font-size: 10px;
  fill: var(--color-text-muted);
  font-family: var(--font-family);
}

/* ── Bottom row ────────────────────────────────── */
.investments-page__bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

/* My Investments */
.my-investment-card,
.trending-stock-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.my-investment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.my-investment-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
}

.my-investment-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.my-investment-item__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.my-investment-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.my-investment-item__name {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.my-investment-item__category {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}

.my-investment-item__stats {
  display: flex;
  gap: 1.25rem;
}

.my-investment-item__value-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: right;
}

.my-investment-item__amount {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.my-investment-item__return {
  font-size: var(--font-size-base);
  font-weight: 700;
}

.my-investment-item__amount-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}

/* Trending Stock Table */
.trending-table-container {
  overflow-x: auto;
}

.trending-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.trending-table th {
  padding: 0.625rem 0.75rem 0.875rem;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-primary);
  border-bottom: 1px solid var(--color-border);
}

.trending-table td {
  padding: 0.875rem 0.75rem;
  font-size: 14px;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
}

.trending-table tr:last-child td {
  border-bottom: none;
}

.text-right {
  text-align: right;
}

.text-muted {
  color: var(--color-text-light) !important;
}

.text-success {
  color: var(--color-success) !important;
}

.text-danger {
  color: var(--color-danger) !important;
}

.font-bold {
  font-weight: 700;
}

@media (max-width: 1100px) {
  .investments-page__charts,
  .investments-page__bottom {
    grid-template-columns: 1fr;
  }

  .investments-page__summary {
    grid-template-columns: 1fr;
  }
}
</style>
