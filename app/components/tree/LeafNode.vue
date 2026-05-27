<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps<{
  data: { label: string; slug?: string; tier?: string }
}>()
</script>

<template>
  <div
    class="group cursor-pointer rounded-xl border border-primary/30 bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
    data-testid="node-leaf"
    :data-slug="data.slug"
  >
    <span class="line-clamp-2">{{ data.label }}</span>
    <Handle type="target" :position="Position.Top" class="!opacity-0" />
  </div>
</template>
