<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const stats = computed(() => props.data || [])
</script>

<template>
  <v-card class="expense-statistics" elevation="0">
    <h2 class="text-h6 font-weight-bold mb-4">Expense Statistics</h2>

    <div class="expense-statistics__chart">
      <div
        v-for="(item, idx) in stats"
        :key="idx"
        class="expense-statistics__item"
      >
        <div
          class="expense-statistics__bar"
          :style="{
            height: `${item.percentage * 1.5}px`,
            backgroundColor: item.color,
          }"
        />
        <span
          v-if="idx === 1 || idx === 2"
          class="expense-statistics__bar-shadow"
          :style="{ backgroundColor: item.color }"
        />
      </div>
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
        <div class="expense-statistics__legend-text">
          <span class="expense-statistics__legend-label">{{ item.label }}</span>
          <span class="expense-statistics__legend-value">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.expense-statistics {
  padding: 1.5rem !important;
  background: transparent !important;
  border: 1px solid rgb(var(--v-theme-grey-100));
  height: 100%;
}

.expense-statistics__chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  height: 130px;
  padding: 1rem 0 0;
  margin-bottom: 1.5rem;
}

.expense-statistics__item {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.expense-statistics__bar {
  width: 100%;
  max-width: 30px;
  border-radius: 12px 12px 0 0;
  transition: height 0.3s ease;
  margin: 0 auto;
}

.expense-statistics__bar-shadow {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  height: 6px;
  border-radius: 50%;
  filter: blur(8px);
  opacity: 0.4;
}

.expense-statistics__legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(var(--v-theme-grey-100));
}

.expense-statistics__legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.expense-statistics__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.expense-statistics__legend-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.expense-statistics__legend-label {
  font-size: 0.6875rem;
  color: rgb(var(--v-theme-grey-500));
}

.expense-statistics__legend-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}
</style>
