<template>
  <component 
    :is="tag" 
    :class="{ 'list-none !pl-0': isChecklistItem }"
  >
    <div v-if="isChecklistItem" class="flex gap-3 group cursor-pointer py-1" @click="handleToggle">
      <div 
        class="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
        :class="isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-gray-200 group-hover:border-emerald-400 bg-white'"
      >
        <CheckIcon v-if="isCompleted" class="w-3.5 h-3.5 text-white" />
      </div>
      <span 
        class="text-base transition-all"
        :class="isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'"
      >
        <slot />
      </span>
    </div>
    <slot v-else />
  </component>
</template>

<script setup>
import { computed, inject } from 'vue'
import { Check as CheckIcon } from '@lucide/vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'li'
  },
  checklistIndex: {
    type: Number,
    default: -1
  },
  isInsideVerification: {
    type: Boolean,
    default: false
  }
})

// Inject state from LearningCard
const checklistState = inject('checklistState', null)
const toggleItem = inject('toggleItem', null)

const isChecklistItem = computed(() => props.isInsideVerification && props.checklistIndex !== -1)

const isCompleted = computed(() => {
  if (!checklistState || !checklistState.value) return false
  return !!checklistState.value[props.checklistIndex]
})

const handleToggle = () => {
  if (toggleItem && props.checklistIndex !== -1) {
    toggleItem(props.checklistIndex)
  }
}
</script>
