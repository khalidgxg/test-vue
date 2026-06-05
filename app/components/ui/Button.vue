<template>
  <v-btn
    :color="vuetifyColor"
    :variant="vuetifyVariant"
    :disabled="disabled"
    :loading="loading"
    :size="size"
    :block="block"
    class="text-none font-weight-medium"
    @click="emit('click', $event)"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'default' | 'large'
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  size: 'default',
  block: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantMap = {
  primary: { color: 'primary', variant: 'flat' as const },
  secondary: { color: 'surface', variant: 'outlined' as const },
  ghost: { color: undefined, variant: 'text' as const },
  danger: { color: 'error', variant: 'flat' as const },
  success: { color: 'success', variant: 'flat' as const },
}

const vuetifyColor = computed(() => variantMap[props.variant].color)
const vuetifyVariant = computed(() => variantMap[props.variant].variant)
</script>
