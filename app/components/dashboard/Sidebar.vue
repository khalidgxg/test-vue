<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__logo">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="#396AFF" />
          <path
            d="M10 18C10 18 13 13 18 13C23 13 26 18 26 18"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            d="M10 22C10 22 13 17 18 17C23 17 26 22 26 22"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
        <span class="sidebar__brand">BankDash.</span>
      </div>
    </div>

    <nav class="sidebar__nav">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="sidebar__link"
        exact-active-class="sidebar__link--active"
      >
        <span class="sidebar__icon" v-html="item.icon"></span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10L10 3L17 10M5 8.5V16C5 16.5523 5.44772 17 6 17H9V12H11V17H14C14.5523 17 15 16.5523 15 16V8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    to: '/transactions',
    label: 'Transactions',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 7H16M4 7L7 4M4 7L7 10M16 13H4M16 13L13 10M16 13L13 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    to: '/accounts',
    label: 'Accounts',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 7C13 8.65685 11.6569 10 10 10C8.34315 10 7 8.65685 7 7C7 5.34315 8.34315 4 10 4C11.6569 4 13 5.34315 13 7Z" stroke="currentColor" stroke-width="1.5"/><path d="M4 16C4 13.7909 6.68629 12 10 12C13.3137 12 16 13.7909 16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    to: '/investments',
    label: 'Investments',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 17L8 12L11 15L17 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 8H17V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    to: '/credit-cards',
    label: 'Credit Cards',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8H18" stroke="currentColor" stroke-width="1.5"/><path d="M5 13H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    to: '/loans',
    label: 'Loans',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C10 2 3 6 3 11C3 14.5 5.5 18 10 18C14.5 18 17 14.5 17 11C17 6 10 2 10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11V8M10 14H10.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    to: '/services',
    label: 'Services',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8.5 3L10 5L6 9L3 6.5L8.5 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.5 17L10 15L14 11L17 13.5L11.5 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 17L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    to: '/my-privileges',
    label: 'My Privileges',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="currentColor" stroke-width="1.5"/><path d="M7 10L9 12L13 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    to: '/settings',
    label: 'Setting',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
]
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100dvh;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  overflow-y: auto;
  z-index: 200;
}

.sidebar__header {
  padding: 0 1.5rem;
  margin-bottom: 2rem;
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.sidebar__brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0 1rem;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.25rem;
  border-radius: 0.75rem;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.sidebar__link:hover {
  color: var(--color-primary);
  background-color: rgba(57, 106, 255, 0.05);
}

.sidebar__link--active {
  color: var(--color-primary);
  background-color: rgba(57, 106, 255, 0.08);
  font-weight: 600;
}

.sidebar__link--active::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 60%;
  background-color: var(--color-primary);
  border-radius: 0 6px 6px 0;
}

.sidebar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar--open {
    transform: translateX(0);
  }
}
</style>
