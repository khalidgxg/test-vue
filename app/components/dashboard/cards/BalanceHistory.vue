<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const points = computed(() => {
  const data = props.data || []
  if (!data.length) return ''
  const maxVal = Math.max(...data.map(d => d.balance), 100)
  const minVal = 0
  const range = maxVal - minVal
  const width = 100 / (data.length - 1 || 1)

  return data.map((d, i) => {
    const x = i * width
    const y = 100 - ((d.balance - minVal) / range) * 100
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
})
</script>

<template>
  <v-card class="balance-history" elevation="0">
    <div class="balance-history__header">
      <h2 class="text-h6 font-weight-bold">Balance History</h2>
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
          :d="`${points} L 100 100 L 0 100 Z`"
          fill="url(#balanceGradient)"
        />
        <path
          :d="points"
          fill="none"
          stroke="#396AFF"
          stroke-width="0.5"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
  </v-card>
</template>

<style scoped>
.balance-history {
  padding: 1.5rem !important;
  background: transparent !important;
  border: 1px solid rgb(var(--v-theme-grey-100));
  height: 100%;
  display: flex;
  flex-direction: column;
}

.balance-history__header {
  margin-bottom: 1rem;
}

.balance-history__chart {
  flex: 1;
  min-height: 180px;
  position: relative;
}

.balance-history__svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
