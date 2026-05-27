<script setup lang="ts">
import { computed } from 'vue'
import { renderMarkdown } from '../../composables/useMarkdown'

const props = defineProps<{
  heading: string
  body: string | null | undefined
  variant?: 'default' | 'warning' | 'muted'
  testid?: string
}>()

const html = computed(() => renderMarkdown(props.body))

const variantClass = computed(() => {
  switch (props.variant) {
    case 'warning':
      return 'border-l-4 border-amber-400 bg-amber-50/60'
    case 'muted':
      return 'border border-ink/10 bg-ink/[0.02] text-ink/70'
    default:
      return 'border border-ink/10 bg-white'
  }
})
</script>

<template>
  <section
    class="my-4 rounded-xl p-5"
    :class="variantClass"
    :data-testid="testid ?? 'card-section'"
  >
    <h3 class="mb-2 font-heading text-base text-ink">{{ heading }}</h3>
    <div class="prose prose-sm max-w-none text-ink/85" v-html="html" />
  </section>
</template>

<style scoped>
.prose :deep(p) { @apply my-2; }
.prose :deep(ul) { @apply my-2 list-disc pl-6; }
.prose :deep(ol) { @apply my-2 list-decimal pl-6; }
.prose :deep(li) { @apply my-1; }
.prose :deep(strong) { @apply font-semibold text-ink; }
.prose :deep(code) { @apply rounded bg-ink/[0.06] px-1 py-0.5 font-mono text-[0.85em]; }
.prose :deep(blockquote) { @apply my-2 border-l-2 border-primary/40 pl-3 italic text-ink/70; }
</style>
