<template>
  <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit sticky top-8">
    <!-- Progress Ring -->
    <div class="flex flex-col items-center mb-6">
      <div class="relative w-24 h-24 mb-3">
        <svg class="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            stroke-width="8"
            fill="transparent"
            class="text-gray-200"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            stroke-width="8"
            fill="transparent"
            :stroke-dasharray="2 * Math.PI * 40"
            :stroke-dashoffset="2 * Math.PI * 40 * (1 - progress / 100)"
            class="text-emerald-500 transition-all duration-1000 ease-out"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center font-bold text-lg">
          {{ progress }}%
        </div>
      </div>
      <h3 class="font-bold text-gray-800">Váš pokrok</h3>
    </div>

    <!-- Checklist -->
    <GuideChecklistItems 
      :items="items"
      :checklist="checklist"
      @toggle="$emit('toggle', $event)"
    />
    
    <button 
      v-if="progress === 100"
      class="w-full mt-6 py-2 bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-100 animate-bounce"
    >
      Gratulujeme! 🎉
    </button>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  checklist: {
    type: Object,
    required: true
  },
  progress: {
    type: Number,
    required: true
  }
})

defineEmits(['toggle'])
</script>
