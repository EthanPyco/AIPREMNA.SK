<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps<{
  data: { label: string; tier?: string }
}>()
</script>

<template>
  <div
    class="rounded-xl border border-secondary/40 bg-secondary/10 px-5 py-3 font-heading text-sm uppercase tracking-wide text-secondary"
    data-testid="node-tier"
    :data-tier="data.tier"
  >
    {{ data.label }}
    <Handle type="target" :position="Position.Top" class="!opacity-0" />
    <Handle type="source" :position="Position.Bottom" class="!opacity-0" />
  </div>
</template>
