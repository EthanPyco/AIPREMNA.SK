<template>
  <blockquote class="relative group">
    <slot />
    <button 
      @click="copyText" 
      class="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200 shadow-sm"
      title="Kopírovať prompt"
    >
      <CopyIcon v-if="!copied" class="w-4 h-4 text-gray-500" />
      <CheckIcon v-else class="w-4 h-4 text-emerald-500" />
    </button>
  </blockquote>
</template>

<script setup>
import { ref, useSlots } from 'vue'
import { Copy as CopyIcon, Check as CheckIcon } from '@lucide/vue'

const copied = ref(false)
const slots = useSlots()

const copyText = () => {
  // Get text content from slots
  const text = slots.default?.().map(n => n.children).flat().map(n => n.value || n).join('')
  
  if (text) {
    navigator.clipboard.writeText(text.trim())
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>
