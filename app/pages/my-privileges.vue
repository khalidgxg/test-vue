<template>
  <div class="privileges-page">
    <!-- Hero Banner -->
    <div class="privileges-hero">
      <div class="privileges-hero__text">
        <h2 class="privileges-hero__title">Your Privileges</h2>
        <p class="privileges-hero__subtitle">Exclusive benefits and rewards available with your BankDash account</p>
      </div>
      <div class="privileges-hero__badge">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.15)" />
          <path
d="M24 10L27.5 20H38L29.5 26L33 36L24 30L15 36L18.5 26L10 20H20.5L24 10Z"
            fill="white" stroke="white" stroke-width="1" stroke-linejoin="round" />
        </svg>
        <span class="privileges-hero__tier">Gold Member</span>
      </div>
    </div>

    <!-- Privilege Cards -->
    <div class="privileges-grid">
      <div v-for="priv in privileges" :key="priv.id" class="priv-card">
        <div class="priv-card__icon" :style="{ backgroundColor: priv.iconBg }">
          <span v-html="priv.icon"></span>
        </div>
        <div class="priv-card__body">
          <h3 class="priv-card__title">{{ priv.title }}</h3>
          <p class="priv-card__desc">{{ priv.description }}</p>
        </div>
        <span class="priv-card__tag" :class="`priv-card__tag--${priv.status}`">{{ priv.statusLabel }}</span>
      </div>
    </div>

    <!-- Points Summary -->
    <div class="points-summary">
      <div class="points-summary__main">
        <span class="points-summary__label">Total Reward Points</span>
        <span class="points-summary__value">{{ totalPoints.toLocaleString('en-US') }} pts</span>
        <div class="points-bar">
          <div class="points-bar__fill" :style="{ width: pointsProgressPct + '%' }"></div>
        </div>
        <span class="points-summary__sub">{{ untilPlatinum.toLocaleString('en-US') }} pts until Platinum tier</span>
      </div>
      <div class="points-summary__stats">
        <div v-for="stat in pointStats" :key="stat.label" class="points-stat">
          <span class="points-stat__value">{{ stat.value }}</span>
          <span class="points-stat__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Privilege, PrivilegeRaw, PointStatRaw } from '#shared/types'

definePageMeta({
  layout: 'dashboard',
  title: 'My Privileges',
})

useHead({ title: 'My Privileges - BankDash' })

const { data } = await useApi<{
  privileges: PrivilegeRaw[]
  point_stats: PointStatRaw[]
}>('/my-privileges')

const privileges = computed<Privilege[]>(() => {
  const raws = data.value?.privileges || []
  const iconMap: Record<string, string> = {
    cashback: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="9" stroke="#16DBCC" stroke-width="1.8"/><path d="M14 10V14L17 16" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round"/></svg>',
    lounge: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="8" width="20" height="14" rx="3" stroke="#FFBB38" stroke-width="1.8"/><path d="M9 8V6C9 5 10 4 14 4C18 4 19 5 19 6V8" stroke="#FFBB38" stroke-width="1.8"/></svg>',
    concierge: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="4" stroke="#396AFF" stroke-width="1.8"/><path d="M6 23C6 19.5 9.5 17 14 17C18.5 17 22 19.5 22 23" stroke="#396AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
  }
  const defaultStatus: Record<number, 'active' | 'locked' | 'new'> = {
    1: 'active',
    2: 'active',
    3: 'active',
  }
  const defaultStatusLabel: Record<number, string> = {
    1: 'Active',
    2: 'Active',
    3: 'Active',
  }
  return raws.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    iconBg: p.iconBg,
    icon: iconMap[p.icon] || '',
    status: defaultStatus[p.id] || 'active',
    statusLabel: defaultStatusLabel[p.id] || 'Active'
  }))
})

const pointStats = computed(() => {
  const stats = data.value?.point_stats || []
  const labels: Record<string, string> = {
    Jan: 'Total Points',
    Feb: 'This Month',
    Mar: 'Until Platinum',
  }
  return stats.map(s => ({
    value: s.points.toLocaleString('en-US'),
    label: labels[s.month] || s.month,
  }))
})

const totalPoints = computed(() => {
  const stats = data.value?.point_stats || []
  return stats.find(s => s.month === 'Jan')?.points || 12450
})

const untilPlatinum = computed(() => {
  const stats = data.value?.point_stats || []
  return stats.find(s => s.month === 'Mar')?.points || 6230
})

const pointsProgressPct = computed(() => {
  const total = totalPoints.value
  const target = total + untilPlatinum.value
  return target > 0 ? (total / target) * 100 : 0
})
</script>

<style scoped>
.privileges-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Hero ─────────────────────────────────────── */
.privileges-hero {
  background: linear-gradient(135deg, #396aff 0%, #1814f3 100%);
  border-radius: var(--radius-2xl);
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.privileges-hero__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.privileges-hero__subtitle {
  font-size: var(--font-size-sm);
  opacity: 0.85;
  max-width: 400px;
  line-height: 1.6;
}

.privileges-hero__badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.privileges-hero__tier {
  font-size: var(--font-size-sm);
  font-weight: 600;
  opacity: 0.9;
}

/* ── Privileges Grid ──────────────────────────── */
.privileges-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.priv-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: box-shadow 0.2s ease;
}

.priv-card:hover {
  box-shadow: var(--shadow-md);
}

.priv-card__icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.priv-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
}

.priv-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.priv-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.6;
}

.priv-card__tag {
  display: inline-block;
  padding: 0.25rem 0.875rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  align-self: flex-start;
}

.priv-card__tag--active {
  background-color: rgba(65, 212, 168, 0.12);
  color: #41d4a8;
}

.priv-card__tag--locked {
  background-color: rgba(177, 177, 177, 0.12);
  color: var(--color-text-muted);
}

.priv-card__tag--new {
  background-color: rgba(57, 106, 255, 0.1);
  color: var(--color-primary);
}

/* ── Points Summary ───────────────────────────── */
.points-summary {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.75rem 2rem;
  display: flex;
  gap: 3rem;
  align-items: center;
}

.points-summary__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.points-summary__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.points-summary__value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
}

.points-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.points-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, #396aff, #16dbcc);
  border-radius: var(--radius-full);
}

.points-summary__sub {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.points-summary__stats {
  display: flex;
  gap: 2rem;
}

.points-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: center;
}

.points-stat__value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.points-stat__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}

@media (max-width: 1100px) {
  .privileges-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .points-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .privileges-grid {
    grid-template-columns: 1fr;
  }
}
</style>
