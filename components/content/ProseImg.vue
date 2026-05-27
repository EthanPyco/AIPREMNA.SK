<template>
  <img :src="resolvedSrc" :alt="alt" class="rounded-xl shadow-lg my-8 mx-auto max-w-full h-auto border border-gray-100" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const resolvedSrc = computed(() => {
  // If src is a filename, assume it's in the public folder
  if (!props.src.startsWith('http') && !props.src.startsWith('/')) {
    return `/${props.src}`
  }
  return props.src
})
</script>
