<script setup>
import { ref, computed, watchEffect } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  customClass: { type: String, default: '' },
})

const svgContent = ref('')

watchEffect(async () => {
  if (!props.src) return
  try {
    const res = await fetch(props.src)
    const text = await res.text()
    svgContent.value = text
  } catch {
    svgContent.value = ''
  }
})

const processedSvg = computed(() => {
  if (!svgContent.value) return ''
  return svgContent.value
    .replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="(?!none)[^"]*"/gi, 'stroke="currentColor"')
})
</script>

<template>
  <div
    v-if="processedSvg"
    v-html="processedSvg"
    :style="{ width: size + 'px', height: size + 'px' }"
    :class="customClass"
  />
</template>
