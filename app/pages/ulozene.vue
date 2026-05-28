<script setup lang="ts">
import { ref, computed } from 'vue'

const { t, locale } = useI18n()
const { sortedCards, sortedPrompts, removeCard, removePrompt, totalCount } = useBookmarks()
const cardRoute = useCardRoute()

type Tab = 'all' | 'cards' | 'prompts'
const tab = ref<Tab>('all')

const showCards = computed(() => tab.value === 'all' || tab.value === 'cards')
const showPrompts = computed(() => tab.value === 'all' || tab.value === 'prompts')

const tabs = computed<{ id: Tab; label: string }[]>(() => [
  { id: 'all', label: t('pages.bookmarks.tabAll') },
  { id: 'cards', label: t('pages.bookmarks.tabCards') },
  { id: 'prompts', label: t('pages.bookmarks.tabPrompts') },
])

function formatTime(ts: number): string {
  const tag = locale.value === 'en' ? 'en-US' : 'sk-SK'
  return new Date(ts).toLocaleString(tag, { dateStyle: 'short', timeStyle: 'short' })
}

function openCard(slug: string) {
  cardRoute.open(slug)
  navigateTo({ path: '/', query: { card: slug } })
}
</script>

<template>
  <main class="mx-auto max-w-5xl px-6 py-10" data-testid="bookmarks-page">
    <header class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 class="font-heading text-3xl text-ink">{{ t('pages.bookmarks.title') }}</h1>
        <p class="mt-1 text-sm text-ink/60">{{ t('pages.bookmarks.subtitle') }}</p>
      </div>
      <div class="flex gap-1" data-testid="bookmarks-tabs">
        <button
          v-for="tabItem in tabs"
          :key="tabItem.id"
          type="button"
          class="rounded-lg border px-3 py-1.5 text-sm transition-colors"
          :class="
            tab === tabItem.id
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-ink/15 bg-white text-ink/70 hover:border-primary/50'
          "
          :data-testid="`bookmarks-tab-${tabItem.id}`"
          :data-active="tab === tabItem.id"
          @click="tab = tabItem.id"
        >
          {{ tabItem.label }}
        </button>
      </div>
    </header>

    <div
      v-if="totalCount === 0"
      class="rounded-xl border border-dashed border-ink/20 bg-white p-10 text-center"
      data-testid="bookmarks-empty"
    >
      <Icon name="lucide:bookmark" class="mx-auto mb-2 h-8 w-8 text-ink/30" />
      <p class="text-ink/60">{{ t('pages.bookmarks.empty') }}</p>
    </div>

    <section
      v-if="showCards && sortedCards.length > 0"
      class="mb-8"
      data-testid="bookmarks-cards"
    >
      <h2 class="mb-2 font-heading text-base text-ink/80">{{ t('pages.bookmarks.tabCards') }}</h2>
      <ul class="space-y-2">
        <li
          v-for="card in sortedCards"
          :key="card.slug"
          class="flex items-center justify-between gap-3 rounded-lg border border-ink/10 bg-white px-4 py-3"
          data-testid="bookmark-card-item"
          :data-slug="card.slug"
        >
          <button
            type="button"
            class="flex-1 text-left text-ink hover:text-primary"
            @click="openCard(card.slug)"
          >
            <div class="font-medium">{{ card.title }}</div>
            <div class="text-xs text-ink/50">{{ formatTime(card.savedAt) }}</div>
          </button>
          <button
            type="button"
            class="rounded-md p-1.5 text-ink/50 hover:bg-ink/[0.05] hover:text-ink"
            data-testid="bookmark-card-remove"
            :aria-label="t('pages.bookmarks.removeCard')"
            @click="removeCard(card.slug)"
          >
            <Icon name="lucide:x" class="h-4 w-4" />
          </button>
        </li>
      </ul>
    </section>

    <section
      v-if="showPrompts && sortedPrompts.length > 0"
      data-testid="bookmarks-prompts"
    >
      <h2 class="mb-2 font-heading text-base text-ink/80">{{ t('pages.bookmarks.tabPrompts') }}</h2>
      <ul class="space-y-2">
        <li
          v-for="p in sortedPrompts"
          :key="p.id"
          class="rounded-lg border border-ink/10 bg-white p-4"
          data-testid="bookmark-prompt-item"
          :data-id="p.id"
        >
          <div class="mb-2 flex items-start justify-between gap-3">
            <div>
              <button
                type="button"
                class="text-sm font-medium text-ink hover:text-primary"
                @click="openCard(p.slug)"
              >
                {{ p.title }}
                <span v-if="p.heading" class="text-ink/50">— {{ p.heading }}</span>
              </button>
              <div class="text-xs text-ink/50">{{ formatTime(p.savedAt) }}</div>
            </div>
            <button
              type="button"
              class="rounded-md p-1.5 text-ink/50 hover:bg-ink/[0.05] hover:text-ink"
              data-testid="bookmark-prompt-remove"
              :aria-label="t('pages.bookmarks.removeCard')"
              @click="removePrompt(p.id)"
            >
              <Icon name="lucide:x" class="h-4 w-4" />
            </button>
          </div>
          <pre class="whitespace-pre-wrap rounded bg-ink/[0.04] p-3 font-mono text-xs text-ink/80">{{ p.text }}</pre>
        </li>
      </ul>
    </section>
  </main>
</template>
