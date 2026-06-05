<script setup>
const props = defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  itemName?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  confirm: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function handleConfirm() {
  emit('confirm')
  isOpen.value = false
}
</script>

<template>
  <v-dialog v-model="isOpen" max-width="420">
    <v-card>
      <v-card-title v-if="title" class="text-h6 d-flex align-center ga-2">
        <v-icon color="error">mdi-alert-circle</v-icon>
        {{ title }}
      </v-card-title>
      <v-card-text v-if="message">
        {{ message }}
        <strong v-if="itemName">"{{ itemName }}"</strong>
        ؟
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="isOpen = false">
          {{ $t('shared.cancel') }}
        </v-btn>
        <v-btn color="error" variant="flat" @click="handleConfirm">
          {{ $t('shared.delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
