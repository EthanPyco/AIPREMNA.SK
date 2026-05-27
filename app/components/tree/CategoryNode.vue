<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps<{
  data: { label: string; category?: string | null }
}>()
</script>

<template>
  <div
    class="rounded-lg border border-accent/50 bg-white px-4 py-2 text-sm font-medium text-ink/80"
    data-testid="node-category"
  >
    {{ data.label }}
    <Handle type="target" :position="Position.Top" class="!opacity-0" />
    <Handle type="source" :position="Position.Bottom" class="!opacity-0" />
  </div>
</template>
