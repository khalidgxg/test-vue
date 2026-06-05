<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
  maxLength: {
    type: Number,
    default: 7,
  },
})

const emit = defineEmits<{
  'update:modelValue': [page: number]
  updated: [page: number]
}>()

const { t } = useI18n()
const { mdAndUp } = useDisplay()

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function onPageChange(page) {
  currentPage.value = page
  emit('updated', page)
}
</script>

<template>
  <div class="d-flex align-center">
    <v-pagination
      v-model="currentPage"
      :length="props.totalPages"
      :size="mdAndUp ? 44 : 22"
      :total-visible="props.maxLength + 1"
      active-color="primary"
      variant="text"
      rounded="circle"
      @update:model-value="onPageChange"
    >
      <template #next>
        <v-btn
          :disabled="currentPage === props.totalPages"
          variant="text"
          color="body"
          class="d-flex align-center h-100"
          @click="onPageChange(currentPage + 1)"
        >
          <p :class="{ 'text-caption': !mdAndUp }">{{ t('shared.next') }}</p>
          <v-icon :size="mdAndUp ? 24 : 18">mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <template #prev>
        <v-btn
          :disabled="currentPage === 1"
          variant="text"
          color="body"
          class="d-flex align-center h-100"
          @click="onPageChange(currentPage - 1)"
        >
          <v-icon :size="mdAndUp ? 24 : 18">mdi-chevron-left</v-icon>
          <p :class="{ 'text-caption': !mdAndUp }">{{ t('shared.prev') }}</p>
        </v-btn>
      </template>
    </v-pagination>
  </div>
</template>
