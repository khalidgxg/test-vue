<template>
  <button
    :class="['ui-button', `ui-button--${variant}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button--primary {
  background-color: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.ui-button--primary:hover:not(:disabled) {
  opacity: 0.9;
}

.ui-button--secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

.ui-button--secondary:hover:not(:disabled) {
  background-color: var(--color-background);
}

.ui-button--ghost {
  background-color: transparent;
  color: var(--color-text-muted);
}

.ui-button--ghost:hover:not(:disabled) {
  background-color: var(--color-background);
}
</style>
