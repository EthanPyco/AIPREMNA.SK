<template>
  <component :is="tag">
    <div v-if="isChecklistItem" class="flex gap-3 group cursor-pointer py-1" @click="handleToggle">
      <div 
        class="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
        :class="isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-emerald-400'"
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
  }
})

// Inject state from LearningCard
const checklistState = inject('checklistState', null)
const toggleItem = inject('toggleItem', null)
const isInsideVerification = inject('isInsideVerification', false)

// We need a way to identify which index this LI is. 
// This is hard with just injection. 
// A simpler way is to check if it's inside a verification section and use text as key.

const itemText = computed(() => {
  // This is a bit of a hack to get the text content
  return '' // Slots are not easily accessible for keying here
})

const isChecklistItem = computed(() => isInsideVerification.value)

const isCompleted = computed(() => {
  if (!checklistState || !checklistState.value) return false
  // For now, this logic is incomplete because we don't have a stable index/key here.
  // I will refactor the LearningCard to pass a different rendering strategy.
  return false
})

const handleToggle = () => {
  if (toggleItem) {
    // toggleItem(index)
  }
}
</script>
