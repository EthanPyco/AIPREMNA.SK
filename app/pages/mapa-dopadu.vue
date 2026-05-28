<script setup lang="ts">
import { computed } from 'vue'
import { renderMarkdown } from '../composables/useMarkdown'

const { t, locale } = useI18n()

const localeStr = computed(() => (locale.value === 'en' ? 'en' : 'sk'))

const { data } = await useFetch(() => `/api/impact-effort?locale=${localeStr.value}`, {
  key: () => `impact-effort:${localeStr.value}`,
  default: () => null as { title: string | null; body: string; usedFallback: boolean } | null,
})

const html = computed(() => renderMarkdown(data.value?.body ?? ''))
</script>

<template>
  <main class="mx-auto max-w-4xl px-6 py-12" data-testid="impact-map-page">
    <header class="mb-8">
      <h1 class="font-heading text-3xl text-ink md:text-4xl" data-testid="impact-map-title">
        {{ data?.title || t('pages.impactMap.title') }}
      </h1>
      <p class="mt-2 text-sm text-ink/60">{{ t('pages.impactMap.subtitle') }}</p>
      <p
        v-if="data?.usedFallback"
        class="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
        data-testid="impact-map-fallback-badge"
      >
        {{ t('card.fallbackBadge') }}
      </p>
    </header>

    <article
      class="impact-content prose prose-sm max-w-none rounded-2xl border border-ink/10 bg-white p-6 text-ink/85 md:p-8"
      data-testid="impact-map-content"
      v-html="html"
    />
  </main>
</template>

<style scoped>
.impact-content :deep(h1) { @apply hidden; }
.impact-content :deep(h2) { @apply mt-8 mb-3 font-heading text-xl text-ink; }
.impact-content :deep(h2:first-child) { @apply mt-0; }
.impact-content :deep(p) { @apply my-3; }
.impact-content :deep(ul) { @apply my-3 list-disc pl-6 space-y-1.5; }
.impact-content :deep(ol) { @apply my-3 list-decimal pl-6 space-y-1.5; }
.impact-content :deep(strong) { @apply font-semibold text-ink; }
.impact-content :deep(em) { @apply italic text-ink/70; }
.impact-content :deep(code) { @apply rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.85em]; }
</style>
