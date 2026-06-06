<script setup>
useHead({ title: 'Credit Cards' })
definePageMeta({ title: 'Credit Cards' })

const { data: cards } = await useApi('/credit-cards', { key: 'credit-cards' })



const cardList = [
  { id: 1, type: 'Secondary', bank: 'DBL Bank', cardNumber: '**** **** 5600', name: 'William', tone: 'blue' },
  { id: 2, type: 'Secondary', bank: 'BRC Bank', cardNumber: '**** **** 4300', name: 'Michel', tone: 'pink' },
  { id: 3, type: 'Secondary', bank: 'ABM Bank', cardNumber: '**** **** 7560', name: 'Edward', tone: 'yellow' },
]

const settings = [
  { icon: 'mdi-credit-card-off', title: 'Block Card', subtitle: 'Instantly block your card', tone: 'yellow' },
  { icon: 'mdi-lock-outline', title: 'Change Pin Code', subtitle: 'Choose another pin code', tone: 'blue' },
  { icon: 'mdi-google', title: 'Add to Google Pay', subtitle: 'Withdraw without any card', tone: 'pink' },
  { icon: 'mdi-apple', title: 'Add to Apple Pay', subtitle: 'Withdraw without any card', tone: 'teal' },
  { icon: 'mdi-apple', title: 'Add to Apple Store', subtitle: 'Withdraw without any card', tone: 'teal' },
]

// Donut chart for Card Expense Statistics
const donutSegments = computed(() => {
  const data = cards.value?.donut_data || []
  const total = data.reduce((acc, item) => acc + item.value, 0) || 100
  const radius = 80
  const center = 100
  let cumulativePercentage = 0

  return data.map((item) => {
    const percentage = (item.value / total) * 100
    const startAngle = (cumulativePercentage / 100) * 360 - 90
    cumulativePercentage += percentage
    const endAngle = (cumulativePercentage / 100) * 360 - 90

    const startX = center + radius * Math.cos((startAngle * Math.PI) / 180)
    const startY = center + radius * Math.sin((startAngle * Math.PI) / 180)
    const endX = center + radius * Math.cos((endAngle * Math.PI) / 180)
    const endY = center + radius * Math.sin((endAngle * Math.PI) / 180)

    const largeArc = percentage > 50 ? 1 : 0

    return {
      path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
      color: item.color,
      label: item.label,
    }
  })
})

const toneColorMap = {
  yellow: { bg: '#FFF5D9', color: '#FFBB38' },
  blue: { bg: '#E7EDFF', color: '#396AFF' },
  pink: { bg: '#FFE0EB', color: '#FF4B4A' },
  teal: { bg: '#DCFAF8', color: '#16DBCC' },
}
</script>

<template>
  <div class="credit-cards-page">
    <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">My Cards</h2>

    <!-- 3 Cards Row -->
    <v-row dense>
      <v-col
        v-for="card in cards?.my_cards"
        :key="card.id"
        cols="12"
        md="4"
      >
        <v-card
          :class="['cc-card', `cc-card--${card.theme}`]"
          elevation="0"
        >
          <div class="cc-card__top-content">
            <div class="cc-card__top">
              <div>
                <span class="cc-card__label">Balance</span>
                <span class="cc-card__amount">${{ card.balance.toLocaleString() }}</span>
              </div>
              <!-- chip -->
              <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
                <rect width="34" height="30" rx="5" :fill="card.theme === 'light' ? '#c6c6c6' : '#E6EFF5'" opacity="0.8" />
                <rect x="4" y="4" width="26" height="22" rx="3" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="17" y1="4" x2="17" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="4" y1="15" x2="30" y2="15" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="10" y1="4" x2="10" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
                <line x1="24" y1="4" x2="24" y2="26" stroke="black" stroke-opacity="0.1" stroke-width="1.2" />
              </svg>
            </div>
            <div class="cc-card__details">
              <div>
                <span class="cc-card__detail-label">CARD HOLDER</span>
                <span class="cc-card__detail-value">{{ card.holder }}</span>
              </div>
              <div>
                <span class="cc-card__detail-label">VALID THRU</span>
                <span class="cc-card__detail-value">{{ card.expiry }}</span>
              </div>
            </div>
          </div>
          <div class="cc-card__footer">
            <span class="cc-card__number">{{ card.number }}</span>
            <svg width="44" height="22" viewBox="0 0 44 30" fill="none">
              <circle cx="15" cy="15" r="14" :fill="card.theme === 'light' ? 'rgba(150,150,150,0.5)' : 'rgba(255,255,255,0.5)'" />
              <circle cx="29" cy="15" r="14" :fill="card.theme === 'light' ? 'rgba(150,150,150,0.3)' : 'rgba(255,255,255,0.3)'" />
            </svg>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Card Expense Statistics + Card List -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="5">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Card Expense Statistics</h2>
          <div class="donut-wrapper">
            <svg viewBox="0 0 200 200" class="donut-svg">
              <g fill="none" stroke-width="28">
                <path
                  v-for="(segment, idx) in donutSegments"
                  :key="idx"
                  :d="segment.path"
                  :stroke="segment.color"
                />
              </g>
              <circle cx="100" cy="100" r="60" fill="white" />
            </svg>
          </div>
          <div class="donut-legend">
            <div
              v-for="(item, idx) in cards?.donut_data"
              :key="idx"
              class="donut-legend__item"
            >
              <span
                class="donut-legend__dot"
                :style="{ backgroundColor: item.color }"
              />
              <span class="donut-legend__label">{{ item.label }}</span>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="7">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Card List</h2>
          <div class="card-list">
            <div
              v-for="card in cardList"
              :key="card.id"
              class="card-list__row"
            >
              <v-avatar
                :color="toneColorMap[card.tone]?.bg"
                size="50"
                rounded="circle"
              >
                <v-icon
                  :color="toneColorMap[card.tone]?.color"
                  size="24"
                >
                  mdi-credit-card-outline
                </v-icon>
              </v-avatar>
              <div class="card-list__col">
                <span class="card-list__label">Card Type</span>
                <span class="card-list__value">{{ card.type }}</span>
              </div>
              <div class="card-list__col">
                <span class="card-list__label">Bank</span>
                <span class="card-list__value">{{ card.bank }}</span>
              </div>
              <div class="card-list__col">
                <span class="card-list__label">Card Number</span>
                <span class="card-list__value">{{ card.cardNumber }}</span>
              </div>
              <div class="card-list__col">
                <span class="card-list__label">Name on Card</span>
                <span class="card-list__value">{{ card.name }}</span>
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
      </v-col>
    </v-row>

    <!-- Add New Card + Card Setting -->
    <v-row dense class="mt-3">
      <v-col cols="12" lg="7">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-3">Add New Card</h2>
          <p class="data-card__description">
            Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
          </p>

          <v-form class="add-card-form">
            <v-row dense>
              <v-col cols="12" md="6">
                <span class="add-card-form__label">Card Type</span>
                <v-text-field placeholder="Classic" variant="outlined" density="comfortable" />
              </v-col>
              <v-col cols="12" md="6">
                <span class="add-card-form__label">Name On Card</span>
                <v-text-field placeholder="My Cards" variant="outlined" density="comfortable" />
              </v-col>
            </v-row>
            <v-row dense class="mt-2">
              <v-col cols="12" md="6">
                <span class="add-card-form__label">Card Number</span>
                <v-text-field placeholder="**** **** **** ****" variant="outlined" density="comfortable" />
              </v-col>
              <v-col cols="12" md="6">
                <span class="add-card-form__label">Expiration Date</span>
                <v-select
                  placeholder="25 January 2025"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
            <v-btn
              color="#1814f3"
              size="large"
              class="text-none mt-4"
              rounded="lg"
            >
              Add Card
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" lg="5">
        <v-card class="data-card" elevation="0" rounded="xl">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Card Setting</h2>
          <div class="settings-list">
            <div
              v-for="(setting, idx) in settings"
              :key="idx"
              class="settings-item"
            >
              <v-avatar
                :color="toneColorMap[setting.tone]?.bg"
                size="50"
                rounded="circle"
              >
                <v-icon
                  :color="toneColorMap[setting.tone]?.color"
                  size="24"
                >
                  {{ setting.icon }}
                </v-icon>
              </v-avatar>
              <div class="settings-item__info">
                <span class="settings-item__title">{{ setting.title }}</span>
                <span class="settings-item__subtitle">{{ setting.subtitle }}</span>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.credit-cards-page {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Cards */
.cc-card {
  border-radius: 1.25rem !important;
  padding: 0 !important;
  min-height: 220px;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.cc-card--blue {
  background: linear-gradient(135deg, #4D78FF 0%, #2E5BFF 100%) !important;
  color: white;
}

.cc-card--dark {
  background: linear-gradient(135deg, #4c49ed 0%, #0a06f4 100%) !important;
  color: white;
}

.cc-card--light {
  background: #ffffff !important;
  color: #343c6a;
  border: 1px solid #e6eff5;
}

.cc-card__top-content {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cc-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.cc-card__label {
  display: block;
  font-size: 0.75rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.cc-card--light .cc-card__label {
  color: #718ebf;
}

.cc-card__amount {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.cc-card__details {
  display: flex;
  gap: 3rem;
  margin: 1rem 0;
}

.cc-card__detail-label {
  display: block;
  font-size: 0.625rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.cc-card__detail-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 4px;
}

.cc-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: auto;
}

.cc-card--blue .cc-card__footer,
.cc-card--dark .cc-card__footer {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.cc-card--light .cc-card__footer {
  border-top-color: rgba(52, 60, 106, 0.1);
  color: #343c6a;
}

.cc-card__number {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.15em;
}

/* Data cards */
.data-card {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.data-card__description {
  color: #718ebf;
  font-size: 0.9375rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

/* Donut */
.donut-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  min-height: 200px;
}

.donut-svg {
  width: 200px;
  height: 200px;
}

.donut-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.donut-legend__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.donut-legend__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.donut-legend__label {
  font-size: 0.875rem;
  color: #343c6a;
}

/* Card List */
.card-list {
  display: flex;
  flex-direction: column;
}

.card-list__row {
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr 130px;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e6eff5;
}

.card-list__row:last-child {
  border-bottom: none;
}

.card-list__col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-list__label {
  font-size: 0.75rem;
  color: #b1b1b1;
}

.card-list__value {
  font-size: 0.9375rem;
  color: #1814f3;
  font-weight: 500;
}

/* Add Card Form */
.add-card-form {
  margin-top: 1rem;
}

.add-card-form__label {
  display: block;
  font-size: 0.9375rem;
  color: #343c6a;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* Card Settings */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.settings-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.settings-item__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.settings-item__title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #343c6a;
}

.settings-item__subtitle {
  font-size: 0.8125rem;
  color: #718ebf;
}

@media (max-width: 1100px) {
  .card-list__row {
    grid-template-columns: 50px 1fr 1fr 130px;
  }

  .card-list__col:nth-child(3),
  .card-list__col:nth-child(4) {
    display: none;
  }
}
</style>
