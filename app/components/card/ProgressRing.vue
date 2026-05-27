<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    percent: number
    size?: number
    stroke?: number
    label?: string
  }>(),
  { size: 84, stroke: 7 },
)

const radius = computed(() => props.size / 2 - props.stroke)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value * (1 - Math.min(100, Math.max(0, props.percent)) / 100))
const center = computed(() => props.size / 2)
</script>

<template>
  <div
    class="inline-flex flex-col items-center gap-1"
    data-testid="progress-ring"
    :data-percent="percent"
  >
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="block">
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        stroke="rgb(0 0 0 / 0.08)"
        :stroke-width="stroke"
      />
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="percent >= 100 ? '#22c55e' : '#8175fb'"
        :stroke-width="stroke"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        :transform="`rotate(-90 ${center} ${center})`"
        class="transition-[stroke-dashoffset] duration-300"
      />
      <text
        :x="center"
        :y="center"
        text-anchor="middle"
        dominant-baseline="central"
        class="fill-ink font-heading text-base"
      >
        {{ percent }}%
      </text>
    </svg>
    <span v-if="label" class="text-xs text-ink/60">{{ label }}</span>
  </div>
</template>
