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

const amount = ref('')

function handleSend() {
  if (amount.value) {
    // TODO: integrate with backend send API
    amount.value = ''
  }
}
</script>

<template>
  <v-card class="quick-transfer" elevation="0">
    <h2 class="text-h6 font-weight-bold mb-4">Quick Transfer</h2>

    <div class="quick-transfer__contacts">
      <button
        v-for="contact in contactList"
        :key="contact.id"
        type="button"
        :class="['quick-transfer__contact', { 'quick-transfer__contact--selected': contact.id === selectedId }]"
        @click="selectContact(contact.id)"
      >
        <v-avatar
          size="60"
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
        elevation="1"
        size="small"
        aria-label="Next contacts"
        class="quick-transfer__next-btn"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <div class="quick-transfer__form">
      <span class="quick-transfer__label">Write Amount</span>
      <div class="quick-transfer__input-wrapper">
        <input
          v-model="amount"
          type="number"
          placeholder="525.50"
          class="quick-transfer__input"
        >
        <button class="quick-transfer__send-btn" @click="handleSend">
          Send
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M4 10L16 4L14 16L10 12L4 10Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.quick-transfer {
  padding: 1.5rem !important;
  border: 1px solid rgb(var(--v-theme-grey-100));
}

.quick-transfer__contacts {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
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
  border: 2px solid rgb(var(--v-theme-primary));
}

.quick-transfer__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--v-theme-grey-700, 51 60 106));
  text-align: center;
  white-space: nowrap;
}

.quick-transfer__role {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-grey-300, 177 177 177));
  text-align: center;
}

.quick-transfer__next-btn {
  flex-shrink: 0;
}

.quick-transfer__form {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quick-transfer__label {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-grey-300, 177 177 177));
  white-space: nowrap;
}

.quick-transfer__input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: rgb(var(--v-theme-grey-50, 245 247 250));
  border-radius: 9999px;
  overflow: hidden;
  min-height: 48px;
}

.quick-transfer__input {
  flex: 1;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  color: inherit;
  outline: none;
  font-family: inherit;
}

.quick-transfer__input::placeholder {
  color: rgb(var(--v-theme-grey-300, 177 177 177));
}

.quick-transfer__send-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.5rem;
  background-color: #343c6a;
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
  margin-right: 4px;
}

.quick-transfer__send-btn:hover {
  background-color: rgb(var(--v-theme-primary));
}

@media (max-width: 600px) {
  .quick-transfer__form {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .quick-transfer__contacts {
    gap: 0.75rem;
  }
}
</style>
