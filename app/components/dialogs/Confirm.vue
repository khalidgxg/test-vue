<script setup>
const props = defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  color?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function handleConfirm() {
  emit('confirm')
  isOpen.value = false
}
function handleCancel() {
  emit('cancel')
  isOpen.value = false
}
</script>

<template>
  <v-dialog v-model="isOpen" max-width="420">
    <v-card>
      <v-card-title v-if="title" class="text-h6">
        {{ title }}
      </v-card-title>
      <v-card-text v-if="message">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="handleCancel">
          {{ cancelText || $t('shared.cancel') }}
        </v-btn>
        <v-btn :color="color || 'primary'" variant="flat" @click="handleConfirm">
          {{ confirmText || $t('shared.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
