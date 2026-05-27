<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps<{
  data: { label: string }
}>()
</script>

<template>
  <div
    class="rounded-2xl bg-primary px-6 py-4 font-heading text-lg text-white shadow-lg"
    data-testid="node-root"
  >
    {{ data.label }}
    <Handle type="source" :position="Position.Bottom" class="!opacity-0" />
  </div>
</template>
