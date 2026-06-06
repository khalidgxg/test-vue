<script setup>
useHead({ title: 'My Privileges' })
definePageMeta({ title: 'My Privileges' })

const { data: privileges } = await useApi('/my-privileges', { key: 'my-privileges' })

const items = computed(() => privileges.value?.privileges || [])

const privilegeIcons = {
  lounge: 'mdi-sofa-outline',
  cashback: 'mdi-cash-refund',
  concierge: 'mdi-headset',
}

const iconTone = {
  1: { bg: '#E7EDFF', color: '#396AFF' },
  2: { bg: '#FFF5D9', color: '#FFBB38' },
  3: { bg: '#DCFAF8', color: '#16DBCC' },
}
</script>

<template>
  <div class="privileges-page">
    <v-row dense>
      <v-col
        v-for="(item, idx) in items"
        :key="item.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="privilege-card" elevation="0" rounded="xl">
          <v-avatar
            :color="iconTone[idx + 1]?.bg"
            size="60"
            rounded="circle"
          >
            <v-icon :color="iconTone[idx + 1]?.color" size="28">
              {{ privilegeIcons[item.icon] }}
            </v-icon>
          </v-avatar>
          <div class="privilege-card__info">
            <span class="privilege-card__title">{{ item.title }}</span>
            <span class="privilege-card__description">{{ item.description }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mt-3">
      <v-col cols="12">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Points Earned</h2>
          <div class="points-list">
            <div
              v-for="(point, idx) in privileges?.point_stats"
              :key="idx"
              class="points-item"
            >
              <span class="points-item__month">{{ point.month }}</span>
              <span class="points-item__count">{{ point.points.toLocaleString() }} pts</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.privileges-page {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.privilege-card {
  padding: 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 1rem;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.privilege-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.privilege-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #343c6a;
}

.privilege-card__description {
  font-size: 0.875rem;
  color: #718ebf;
  line-height: 1.4;
}

.data-card {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.points-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.points-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 0.75rem;
}

.points-item__month {
  font-size: 0.875rem;
  color: #718ebf;
  font-weight: 500;
}

.points-item__count {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1814f3;
}
</style>
