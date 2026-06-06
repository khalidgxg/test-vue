<script setup>
useHead({ title: 'Investments' })
definePageMeta({ title: 'Investments' })

const { data: inv } = await useApi('/investments', { key: 'investments' })

const summaryIcons = [
  { icon: 'mdi-safe', color: '#16DBCC', bg: '#DCFAF8' },
  { icon: 'mdi-finance', color: '#FF4B4A', bg: '#FFE0EB' },
  { icon: 'mdi-sync', color: '#396AFF', bg: '#E7EDFF' },
]

const myInvestments = [
  { id: 1, name: 'Apple Store', category: 'E-commerce, Marketplace', amount: 54000, returnValue: '+16%', tone: 'pink', icon: 'mdi-apple' },
  { id: 2, name: 'Samsung Mobile', category: 'E-commerce, Marketplace', amount: 25300, returnValue: '-4%', tone: 'blue', icon: 'mdi-google' },
  { id: 3, name: 'Tesla Motors', category: 'Electric Vehicles', amount: 8200, returnValue: '+25%', tone: 'yellow', icon: 'mdi-car-outline' },
]

const trendingStocks = [
  { id: 1, name: 'Trivago', price: '$520', returnValue: '+5%', returnType: 'up' },
  { id: 2, name: 'Canon', price: '$480', returnValue: '+10%', returnType: 'up' },
  { id: 3, name: 'Uber Food', price: '$350', returnValue: '-3%', returnType: 'down' },
  { id: 4, name: 'Nokia', price: '$940', returnValue: '+2%', returnType: 'up' },
  { id: 5, name: 'Tiktok', price: '$670', returnValue: '-12%', returnType: 'down' },
]

const toneMap = {
  yellow: { bg: '#FFF5D9', color: '#FFBB38' },
  blue: { bg: '#E7EDFF', color: '#396AFF' },
  pink: { bg: '#FFE0EB', color: '#FF4B4A' },
}

// Build Yearly chart (line)
const yearlyChart = computed(() => {
  const data = inv.value?.yearly_data || []
  if (!data.length) return { line: '', area: '', yLabels: [] }
  const maxVal = Math.max(...data.map(d => d.value), 100)
  const minVal = 0
  const range = maxVal - minVal || 1
  const width = 100
  const height = 100
  const stepX = width / (data.length - 1 || 1)

  const points = data.map((d, i) => ({
    x: i * stepX,
    y: height - ((d.value - minVal) / range) * height,
  }))

  let linePath = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const cp1x = current.x + (next.x - current.x) * 0.5
    linePath += ` L ${cp1x} ${current.y} L ${cp1x} ${next.y}`
  }
  linePath += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`

  const maxRounded = Math.ceil(maxVal / 10000) * 10000
  const yLabels = [0, 0.25, 0.5, 0.75, 1].map(r => `$${Math.round(maxRounded * r).toLocaleString()}`)

  return { line: linePath, area: areaPath, yLabels, data, points }
})

// Build Monthly chart (smooth wave)
const monthlyChart = computed(() => {
  const data = inv.value?.monthly_data || []
  if (!data.length) return { line: '', area: '', yLabels: [] }
  const maxVal = Math.max(...data.map(d => d.value), 100)
  const minVal = 0
  const range = maxVal - minVal || 1
  const width = 100
  const height = 100
  const stepX = width / (data.length - 1 || 1)

  const points = data.map((d, i) => ({
    x: i * stepX,
    y: height - ((d.value - minVal) / range) * height,
  }))

  let linePath = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const cp1x = current.x + (next.x - current.x) * 0.5
    const cp1y = current.y
    const cp2x = current.x + (next.x - current.x) * 0.5
    const cp2y = next.y
    linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
  }

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`

  const maxRounded = Math.ceil(maxVal / 10000) * 10000
  const yLabels = [0, 0.25, 0.5, 0.75, 1].map(r => `$${Math.round(maxRounded * r).toLocaleString()}`)

  return { line: linePath, area: areaPath, yLabels, data, points }
})
</script>

<template>
  <div class="investments-page">
    <!-- 3 Summary cards -->
    <v-row dense>
      <v-col
        v-for="(metric, idx) in inv?.summary_stats"
        :key="metric.id"
        cols="12"
        md="4"
      >
        <v-card class="summary-card" elevation="0" rounded="xl">
          <v-avatar :color="summaryIcons[idx]?.bg" size="60" rounded="circle">
            <v-icon :color="summaryIcons[idx]?.color" size="28">
              {{ summaryIcons[idx]?.icon }}
            </v-icon>
          </v-avatar>
          <div class="summary-card__info">
            <span class="summary-card__label">{{ metric.label }}</span>
            <span class="summary-card__value">{{ metric.value }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Yearly + Monthly Charts -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="6">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Yearly Total Investment</h2>
          <div class="chart-wrapper">
            <div class="chart-y-axis">
              <span v-for="(label, idx) in yearlyChart.yLabels" :key="idx">{{ label }}</span>
            </div>
            <div class="chart-canvas">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="chart-svg">
                <defs>
                  <linearGradient id="yearlyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#FC7900" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#FC7900" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path :d="yearlyChart.area" fill="url(#yearlyGradient)" />
                <path
                  :d="yearlyChart.line"
                  fill="none"
                  stroke="#FC7900"
                  stroke-width="0.8"
                  vector-effect="non-scaling-stroke"
                />
                <circle
                  v-for="(point, idx) in yearlyChart.points"
                  :key="idx"
                  :cx="point.x"
                  :cy="point.y"
                  r="1"
                  fill="white"
                  stroke="#FC7900"
                  stroke-width="0.6"
                  vector-effect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
          <div class="chart-x-axis">
            <span v-for="(point, idx) in yearlyChart.data" :key="idx">{{ point.year }}</span>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Monthly Revenue</h2>
          <div class="chart-wrapper">
            <div class="chart-y-axis">
              <span v-for="(label, idx) in monthlyChart.yLabels" :key="idx">{{ label }}</span>
            </div>
            <div class="chart-canvas">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="chart-svg">
                <defs>
                  <linearGradient id="monthlyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#16DBCC" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#16DBCC" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path :d="monthlyChart.area" fill="url(#monthlyGradient)" />
                <path
                  :d="monthlyChart.line"
                  fill="none"
                  stroke="#16DBCC"
                  stroke-width="0.8"
                  vector-effect="non-scaling-stroke"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="chart-x-axis">
            <span v-for="(point, idx) in monthlyChart.data" :key="idx">{{ point.year }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- My Investment + Trending Stock -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="6">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">My Investment</h2>
          <div class="investment-list">
            <div
              v-for="item in myInvestments"
              :key="item.id"
              class="investment-item"
            >
              <v-avatar :color="toneMap[item.tone]?.bg" size="50" rounded="circle">
                <v-icon :color="toneMap[item.tone]?.color" size="24">{{ item.icon }}</v-icon>
              </v-avatar>
              <div class="investment-item__info">
                <span class="investment-item__name">{{ item.name }}</span>
                <span class="investment-item__category">{{ item.category }}</span>
              </div>
              <div class="investment-item__col">
                <span class="investment-item__amount">${{ item.amount.toLocaleString() }}</span>
                <span class="investment-item__subtitle">Investment Value</span>
              </div>
              <div class="investment-item__col">
                <span :class="['investment-item__return', `investment-item__return--${item.returnValue.startsWith('+') ? 'up' : 'down'}`]">
                  {{ item.returnValue }}
                </span>
                <span class="investment-item__subtitle">Return Value</span>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Trending Stock</h2>
          <div class="stock-table">
            <div class="stock-table__header">
              <span>SL No</span>
              <span>Name</span>
              <span>Price</span>
              <span>Return</span>
            </div>
            <div
              v-for="(stock, idx) in trendingStocks"
              :key="stock.id"
              class="stock-table__row"
            >
              <span class="stock-table__idx">{{ String(idx + 1).padStart(2, '0') }}.</span>
              <span class="stock-table__name">{{ stock.name }}</span>
              <span class="stock-table__price">{{ stock.price }}</span>
              <span :class="['stock-table__return', `stock-table__return--${stock.returnType}`]">
                {{ stock.returnValue }}
              </span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.investments-page {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-card {
  padding: 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 1rem;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.summary-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-card__label {
  font-size: 0.9375rem;
  color: #718ebf;
}

.summary-card__value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #343c6a;
}

.data-card {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

/* Chart */
.chart-wrapper {
  display: flex;
  gap: 0.75rem;
  min-height: 200px;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.75rem;
  color: #b1b1b1;
  text-align: right;
  min-width: 48px;
  height: 200px;
}

.chart-canvas {
  flex: 1;
  height: 200px;
}

.chart-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.chart-x-axis {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-inline-start: 56px;
  font-size: 0.8125rem;
  color: #718ebf;
}

/* Investment List */
.investment-list {
  display: flex;
  flex-direction: column;
}

.investment-item {
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e6eff5;
}

.investment-item:last-child {
  border-bottom: none;
}

.investment-item__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.investment-item__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #343c6a;
}

.investment-item__category {
  font-size: 0.75rem;
  color: #b1b1b1;
}

.investment-item__col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.investment-item__amount {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #343c6a;
}

.investment-item__subtitle {
  font-size: 0.75rem;
  color: #b1b1b1;
}

.investment-item__return {
  font-size: 0.9375rem;
  font-weight: 600;
}

.investment-item__return--up {
  color: #41d4a8;
}

.investment-item__return--down {
  color: #ff4b4a;
}

/* Stock Table */
.stock-table {
  display: flex;
  flex-direction: column;
}

.stock-table__header {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
  padding: 0.75rem 0;
  font-size: 0.875rem;
  color: #b1b1b1;
  font-weight: 500;
  border-bottom: 1px solid #e6eff5;
}

.stock-table__row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e6eff5;
  font-size: 0.9375rem;
}

.stock-table__row:last-child {
  border-bottom: none;
}

.stock-table__idx {
  color: #b1b1b1;
}

.stock-table__name {
  font-weight: 500;
  color: #343c6a;
}

.stock-table__price {
  color: #343c6a;
}

.stock-table__return--up {
  color: #41d4a8;
  font-weight: 600;
}

.stock-table__return--down {
  color: #ff4b4a;
  font-weight: 600;
}
</style>
