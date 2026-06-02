<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const title = computed(() => {
  return route.meta.title || 'Overview'
})
</script>

<template>
  <header class="topbar">
    <div class="topbar__left">
      <h1 class="topbar__title">{{ title }}</h1>
    </div>

    <div class="topbar__right">
      <div class="topbar__search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" />
          <path d="M11 11L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <input type="text" placeholder="Search for something" class="topbar__search-input" />
      </div>

      <button class="topbar__icon-btn" aria-label="Settings">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <button class="topbar__icon-btn" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2C7.23858 2 5 4.23858 5 7V10L3 13H17L15 10V7C15 4.23858 12.7614 2 10 2Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <div class="topbar__avatar">
        <img src="https://i.pravatar.cc/80?img=47" alt="User avatar" class="topbar__avatar-img" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  right: 0;
  left: var(--sidebar-width);
  height: var(--topbar-height);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100;
}

.topbar__left {
  display: flex;
  align-items: center;
}

.topbar__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.topbar__search {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background-color: var(--color-background);
  border-radius: var(--radius-full);
  padding: 0.625rem 1.25rem;
  color: var(--color-text-muted);
  min-width: 220px;
}

.topbar__search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  width: 100%;
  font-family: var(--font-family);
}

.topbar__search-input::placeholder {
  color: var(--color-text-muted);
}

.topbar__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--color-background);
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  transition: all 0.2s ease;
}

.topbar__icon-btn:hover {
  background-color: var(--color-border);
  color: var(--color-text);
}

.topbar__avatar {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid var(--color-border);
}

.topbar__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .topbar {
    left: 0;
  }

  .topbar__search {
    display: none;
  }
}
</style>
