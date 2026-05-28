<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCardRoute } from '../../composables/useCardRoute'

const { t, locale } = useI18n()
const { query, results, loading } = useSearch(() => (locale.value === 'en' ? 'en' : 'sk'))
const cardRoute = useCardRoute()
const open = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const placeholder = computed(() => t('search.placeholder'))

function onFocus() {
  open.value = true
}

function onBlur() {
  setTimeout(() => (open.value = false), 150)
}

function onClear() {
  query.value = ''
  results.value = []
  inputRef.value?.focus()
}

function openResult(slug: string) {
  open.value = false
  query.value = ''
  cardRoute.open(slug)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    open.value = false
    onClear()
  }
  if (e.key === 'Enter' && results.value.length > 0) {
    openResult(results.value[0].slug)
  }
}
</script>

<template>
  <div class="relative w-full max-w-sm" data-testid="header-search">
    <div class="relative">
      <Icon
        name="lucide:search"
        class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
      />
      <input
        ref="inputRef"
        v-model="query"
        type="search"
        :placeholder="placeholder"
        class="h-9 w-full rounded-lg border border-ink/15 bg-white pl-8 pr-8 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        data-testid="search-input"
        autocomplete="off"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      >
      <button
        v-if="query"
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink/40 hover:text-ink"
        data-testid="search-clear"
        :aria-label="t('card.close')"
        @mousedown.prevent
        @click="onClear"
      >
        <Icon name="lucide:x" class="h-3.5 w-3.5" />
      </button>
    </div>

    <div
      v-if="open && (loading || results.length > 0 || query)"
      class="absolute left-0 right-0 top-full z-40 mt-1 max-h-80 overflow-y-auto rounded-lg border border-ink/10 bg-white shadow-lg"
      data-testid="search-results"
    >
      <div v-if="loading" class="px-3 py-2 text-xs text-ink/60">
        …
      </div>
      <ul v-else-if="results.length > 0">
        <li v-for="hit in results" :key="hit.slug">
          <button
            type="button"
            class="block w-full px-3 py-2 text-left text-sm hover:bg-ink/[0.04]"
            data-testid="search-result"
            :data-slug="hit.slug"
            @mousedown.prevent
            @click="openResult(hit.slug)"
          >
            <div class="font-medium text-ink" v-html="hit.title" />
            <div class="mt-0.5 text-xs text-ink/60 line-clamp-1" v-html="hit.excerpt" />
          </button>
        </li>
      </ul>
      <div
        v-else-if="query && !loading"
        class="px-3 py-2 text-xs text-ink/60"
        data-testid="search-empty"
      >
        {{ t('search.noResults', { query }) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(mark) {
  @apply rounded bg-amber-100 px-0.5 text-ink;
}
</style>
