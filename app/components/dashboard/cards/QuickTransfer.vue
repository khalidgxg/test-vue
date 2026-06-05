<template>
  <div class="quick-transfer">
    <div class="quick-transfer__header">
      <h2 class="quick-transfer__title">Quick Transfer</h2>
    </div>

    <div class="quick-transfer__contacts">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        :class="[
          'quick-transfer__contact',
          { 'quick-transfer__contact--selected': contact.selected },
        ]"
      >
        <img :src="contact.avatar" :alt="contact.name" class="quick-transfer__avatar" />
        <span class="quick-transfer__name">{{ contact.name }}</span>
        <span class="quick-transfer__role">{{ contact.role }}</span>
      </div>

      <button class="quick-transfer__next-btn" aria-label="Next contacts">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7 4L12 9L7 14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="quick-transfer__form">
      <div class="quick-transfer__input-group">
        <span class="quick-transfer__label">Write Amount</span>
        <div class="quick-transfer__input-wrapper">
          <input v-model="amount" type="text" placeholder="525.50" class="quick-transfer__input" />
          <button class="quick-transfer__send-btn" @click="handleSend">
            Send
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10L16 4L14 16L10 12L4 10Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ContactRaw, Contact } from '#shared/types'

const { data } = await useApi<{
  quick_transfer: ContactRaw[]
}>('/dashboard', { key: 'dashboard' })

const contacts = computed<Contact[]>(() => {
  const raws = data.value?.quick_transfer || []
  return raws.slice(0, 3).map((c, idx) => ({
    ...c,
    selected: idx === 0
  }))
})

const amount = ref('')

function handleSend() {
  if (amount.value) {
    console.log('Sending:', amount.value)
    amount.value = ''
  }
}
</script>

<style scoped>
.quick-transfer {
  background-color: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
}

.quick-transfer__header {
  margin-bottom: 1.25rem;
}

.quick-transfer__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.quick-transfer__contacts {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.quick-transfer__contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-transfer__avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.quick-transfer__contact--selected .quick-transfer__avatar {
  border-color: var(--color-primary);
}

.quick-transfer__name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  white-space: nowrap;
}

.quick-transfer__contact--selected .quick-transfer__name {
  font-weight: 700;
}

.quick-transfer__role {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: center;
}

.quick-transfer__next-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: none;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-md);
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.quick-transfer__next-btn:hover {
  box-shadow: var(--shadow-lg);
  color: var(--color-primary);
}

.quick-transfer__form {
  margin-top: 0.5rem;
}

.quick-transfer__input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quick-transfer__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.quick-transfer__input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: var(--color-background);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.quick-transfer__input {
  flex: 1;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  outline: none;
  font-family: var(--font-family);
}

.quick-transfer__input::placeholder {
  color: var(--color-text-muted);
}

.quick-transfer__send-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-text);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  font-family: var(--font-family);
}

.quick-transfer__send-btn:hover {
  background-color: var(--color-primary);
}
</style>
