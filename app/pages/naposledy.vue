<script setup lang="ts">
import { computed } from 'vue'

const { t, locale } = useI18n()
const { sortedEntries, clearAll, remove } = useLastUsed()
const cardRoute = useCardRoute()

const rtf = computed(() => new Intl.RelativeTimeFormat(locale.value === 'en' ? 'en' : 'sk', { numeric: 'auto' }))

function relative(ts: number): string {
  const diffSec = Math.round((ts - Date.now()) / 1000)
  const abs = Math.abs(diffSec)
  if (abs < 60) return rtf.value.format(diffSec, 'second')
  if (abs < 3600) return rtf.value.format(Math.round(diffSec / 60), 'minute')
  if (abs < 86_400) return rtf.value.format(Math.round(diffSec / 3600), 'hour')
  return rtf.value.format(Math.round(diffSec / 86_400), 'day')
}

function open(slug: string) {
  cardRoute.open(slug)
  navigateTo({ path: '/', query: { card: slug } })
}
</script>

<template>
  <main class="mx-auto max-w-5xl px-6 py-10" data-testid="lastused-page">
    <header class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 class="font-heading text-3xl text-ink">{{ t('pages.lastUsed.title') }}</h1>
        <p class="mt-1 text-sm text-ink/60">{{ t('pages.lastUsed.subtitle') }}</p>
      </div>
      <button
        v-if="sortedEntries.length > 0"
        type="button"
        class="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm text-ink/70 hover:border-primary hover:text-primary"
        data-testid="lastused-clear"
        @click="clearAll"
      >
        {{ t('pages.lastUsed.clearAll') }}
      </button>
    </header>

    <div
      v-if="sortedEntries.length === 0"
      class="rounded-xl border border-dashed border-ink/20 bg-white p-10 text-center"
      data-testid="lastused-empty"
    >
      <Icon name="lucide:history" class="mx-auto mb-2 h-8 w-8 text-ink/30" />
      <p class="text-ink/60">{{ t('pages.lastUsed.empty') }}</p>
    </div>

    <ul v-else class="grid gap-3 md:grid-cols-2">
      <li
        v-for="entry in sortedEntries"
        :key="entry.slug"
        class="flex items-start justify-between gap-3 rounded-xl border border-ink/10 bg-white p-4"
        data-testid="lastused-item"
        :data-slug="entry.slug"
      >
        <button
          type="button"
          class="flex-1 text-left"
          @click="open(entry.slug)"
        >
          <div class="font-medium text-ink hover:text-primary">{{ entry.title }}</div>
          <div class="mt-1 text-xs text-ink/50">
            {{ relative(entry.openedAt) }} · {{ Math.round(entry.durationMs / 1000) }} s
          </div>
        </button>
        <button
          type="button"
          class="rounded-md p-1.5 text-ink/50 hover:bg-ink/[0.05] hover:text-ink"
          data-testid="lastused-remove"
          :aria-label="t('pages.bookmarks.removeCard')"
          @click="remove(entry.slug)"
        >
          <Icon name="lucide:x" class="h-4 w-4" />
        </button>
      </li>
    </ul>
  </main>
</template>
