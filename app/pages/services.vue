<script setup>
useHead({ title: 'Services' })
definePageMeta({ title: 'Services' })

const { data: services } = await useApi('/services', { key: 'services' })

const featured = computed(() => services.value?.featured_services || [])
const bankServices = computed(() => services.value?.bank_services || [])

const featuredToneMap = {
  blue: { bg: '#E7EDFF', color: '#396AFF' },
  yellow: { bg: '#FFF5D9', color: '#FFBB38' },
  teal: { bg: '#DCFAF8', color: '#16DBCC' },
}
</script>

<template>
  <div class="services-page">
    <!-- 3 Featured Services -->
    <v-row dense>
      <v-col
        v-for="(service, idx) in featured"
        :key="service.id"
        cols="12"
        md="4"
      >
        <v-card class="featured-card" elevation="0" rounded="xl">
          <v-avatar
            :color="featuredToneMap[['blue', 'yellow', 'teal'][idx]]?.bg"
            size="60"
            rounded="circle"
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" v-html="service.icon" />
          </v-avatar>
          <div class="featured-card__info">
            <span class="featured-card__title">{{ service.title }}</span>
            <span class="featured-card__subtitle">{{ service.subtitle }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Bank Services List -->
    <h2 class="text-h6 font-weight-bold text-grey-darken-4 mt-6 mb-3">Bank Services List</h2>

    <v-card class="data-card" elevation="0" rounded="xl">
      <div class="service-list">
        <div
          v-for="service in bankServices"
          :key="service.id"
          class="service-item"
        >
          <v-avatar :color="service.iconBg" size="50" rounded="circle">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" v-html="service.icon" />
          </v-avatar>
          <div class="service-item__col">
            <span class="service-item__name">{{ service.name }}</span>
            <span class="service-item__description">{{ service.description }}</span>
          </div>
          <div class="service-item__col">
            <span class="service-item__lorem">Lorem Ipsum</span>
            <span class="service-item__lorem-sub">Many publishing</span>
          </div>
          <div class="service-item__col">
            <span class="service-item__lorem">Lorem Ipsum</span>
            <span class="service-item__lorem-sub">Many publishing</span>
          </div>
          <div class="service-item__col">
            <span class="service-item__lorem">Lorem Ipsum</span>
            <span class="service-item__lorem-sub">Many publishing</span>
          </div>
          <v-btn
            variant="outlined"
            color="primary"
            rounded="pill"
            size="small"
            class="text-none"
          >
            View Details
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.services-page {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.featured-card {
  padding: 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 1rem;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.featured-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.featured-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #343c6a;
}

.featured-card__subtitle {
  font-size: 0.875rem;
  color: #718ebf;
}

.data-card {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.service-list {
  display: flex;
  flex-direction: column;
}

.service-item {
  display: grid;
  grid-template-columns: 50px 1.5fr 1fr 1fr 1fr 130px;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e6eff5;
}

.service-item:last-child {
  border-bottom: none;
}

.service-item__col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.service-item__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #343c6a;
}

.service-item__description {
  font-size: 0.8125rem;
  color: #b1b1b1;
}

.service-item__lorem {
  font-size: 0.875rem;
  color: #1814f3;
  font-weight: 500;
}

.service-item__lorem-sub {
  font-size: 0.75rem;
  color: #b1b1b1;
}

@media (max-width: 1100px) {
  .service-item {
    grid-template-columns: 50px 1.5fr 130px;
  }

  .service-item__col:nth-child(2),
  .service-item__col:nth-child(3) {
    display: none;
  }
}
</style>
