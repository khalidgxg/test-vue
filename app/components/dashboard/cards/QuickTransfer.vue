<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  contacts: {
    type: Array,
    default: () => [],
  },
})

const contactList = computed(() =>
  (props.contacts || []).slice(0, 3).map((c, idx) => ({
    ...c,
    selected: idx === 0,
  })),
)

const selectedId = ref(contactList.value[0]?.id)

function selectContact(id) {
  selectedId.value = id
}

const amount = ref('525.50')

function handleSend() {
  if (amount.value) {
    // TODO: integrate with backend send API
    amount.value = ''
  }
}
</script>

<template>
  <v-card class="quick-transfer" elevation="0" rounded="xl">
    <h2 class="text-h6 font-weight-bold text-grey-darken-4 mb-4">Quick Transfer</h2>

    <div class="quick-transfer__contacts">
      <button
        v-for="contact in contactList"
        :key="contact.id"
        type="button"
        :class="['quick-transfer__contact', { 'quick-transfer__contact--selected': contact.id === selectedId }]"
        @click="selectContact(contact.id)"
      >
        <v-avatar
          size="70"
          :class="{ 'quick-transfer__avatar--selected': contact.id === selectedId }"
        >
          <img :src="contact.avatar" :alt="contact.name" cover>
        </v-avatar>
        <span class="quick-transfer__name">{{ contact.name }}</span>
        <span class="quick-transfer__role">{{ contact.role }}</span>
      </button>

      <v-btn
        icon
        variant="elevated"
        elevation="2"
        size="small"
        aria-label="Next contacts"
        class="quick-transfer__next-btn"
        color="white"
      >
        <v-icon color="grey-darken-3">mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <div class="quick-transfer__form">
      <span class="quick-transfer__label">Write Amount</span>
      <div class="quick-transfer__input-wrapper">
        <input
          v-model="amount"
          type="text"
          placeholder="525.50"
          class="quick-transfer__input"
        >
        <button class="quick-transfer__send-btn" @click="handleSend">
          Send
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 10L17 3L14 17L9 12L3 10Z" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.quick-transfer {
  padding: 1.5rem !important;
  background: #ffffff !important;
  border-radius: 25px !important;
}

.quick-transfer__contacts {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.quick-transfer__contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
}

.quick-transfer__avatar--selected {
  border: 3px solid #1814f3;
}

.quick-transfer__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #343c6a;
  text-align: center;
  white-space: nowrap;
}

.quick-transfer__contact--selected .quick-transfer__name {
  font-weight: 700;
  color: #343c6a;
}

.quick-transfer__role {
  font-size: 0.75rem;
  color: #8ba3cb;
  text-align: center;
}

.quick-transfer__next-btn {
  flex-shrink: 0;
  margin-top: -1rem;
}

.quick-transfer__form {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.quick-transfer__label {
  font-size: 0.9375rem;
  color: #343c6a;
  white-space: nowrap;
  font-weight: 400;
}

.quick-transfer__input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 9999px;
  overflow: hidden;
  min-height: 50px;
  padding: 4px;
  padding-inline-start: 1.25rem;
  gap: 0.5rem;
}

.quick-transfer__input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  color: #343c6a;
  outline: none;
  font-family: inherit;
  min-width: 0;
}

.quick-transfer__input::placeholder {
  color: #b1b1b1;
}

.quick-transfer__send-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  background-color: #1814f3;
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
}

.quick-transfer__send-btn:hover {
  background-color: #0a0ad1;
}

@media (max-width: 600px) {
  .quick-transfer__form {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
}
</style>
