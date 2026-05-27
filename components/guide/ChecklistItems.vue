<template>
  <div class="h-fit">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="flex gap-4 group cursor-pointer py-3 border-b border-gray-50 last:border-0"
      @click="$emit('toggle', index)"
    >
      <div 
        class="w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
        :class="checklist[index] ? 'bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-200' : 'border-gray-200 group-hover:border-emerald-300 bg-white'"
      >
        <CheckIcon v-if="checklist[index]" class="w-4 h-4 text-white" />
      </div>
      <span 
        class="text-[15px] leading-snug transition-all"
        :class="checklist[index] ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { Check as CheckIcon } from '@lucide/vue'

defineProps({
  items: {
    type: Array,
    required: true
  },
  checklist: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle'])
</script>
