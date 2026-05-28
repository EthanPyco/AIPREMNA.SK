<template>
  <NuxtLayout>
    <div class="max-w-6xl mx-auto p-6 md:p-10">
      <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
            <ClipboardListIcon class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-brand-dark">Ťahák promptov</h1>
            <p class="text-gray-600">Rýchle vzorce a tipy pre vaše každodenné úlohy.</p>
          </div>
        </div>
        <button
          @click="printPage"
          class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
        >
          <PrinterIcon class="w-4 h-4" />
          <span>Vytlačiť / PDF</span>
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit no-print">
        <button
          @click="activeTab = 'prompts'"
          class="px-6 py-2 rounded-lg text-sm font-bold transition-all"
          :class="activeTab === 'prompts' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-600 hover:text-gray-800'"
        >
          Ťahák
        </button>
        <button
          @click="activeTab = 'glossary'"
          class="px-6 py-2 rounded-lg text-sm font-bold transition-all"
          :class="activeTab === 'glossary' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-600 hover:text-gray-800'"
        >
          Slovník pojmov
        </button>
      </div>

      <!-- Local filter (Prompts tab) -->
      <div v-if="activeTab === 'prompts'" class="mb-6 no-print">
        <div class="relative max-w-md">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            v-model="filterQuery"
            type="text"
            placeholder="Filtrovať prompty..."
            class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-accent/30 rounded-xl text-sm font-medium"
          />
        </div>
        <p class="mt-2 text-xs text-gray-500">{{ filteredPrompts.length }} z {{ allPrompts.length }} promptov</p>
      </div>

      <!-- Prompts View -->
      <div v-if="activeTab === 'prompts'">
        <div v-if="filteredPrompts.length === 0" class="text-center py-16 text-gray-500 italic">
          Žiadne prompty nezodpovedajú filtru „{{ filterQuery }}“.
        </div>
        <div v-for="(items, cat) in groupedPrompts" :key="cat" class="mb-10 last:mb-0">
          <h2 class="font-heading font-bold text-sm uppercase tracking-[0.2em] text-gray-700 mb-4 print-category">
            {{ cat }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print-grid">
            <div
              v-for="card in items"
              :id="`prompt-${card.id}`"
              :key="card.id"
              class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-full scroll-mt-20"
              :class="focusedId === card.id ? 'ring-2 ring-brand-primary' : ''"
            >
              <div class="flex items-start justify-between gap-3 mb-3">
                <h3 class="font-bold text-base text-brand-dark">{{ card.title }}</h3>
              </div>
              <p class="text-sm text-gray-600 mb-4 flex-1">{{ card.description }}</p>

              <div class="bg-gray-50 p-4 rounded-xl relative group mb-3">
                <p class="text-xs font-mono text-gray-700 leading-relaxed pr-8 whitespace-pre-wrap">{{ card.prompt }}</p>
                <button
                  @click="copy(card.id, card.prompt)"
                  class="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  :title="copiedId === card.id ? 'Skopírované' : 'Skopírovať'"
                >
                  <CheckIcon v-if="copiedId === card.id" class="w-3.5 h-3.5 text-emerald-500" />
                  <CopyIcon v-else class="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>

              <NuxtLink
                :to="{ path: '/', query: { card: card.sourcePath } }"
                class="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-secondary no-print"
              >
                <span>Otvoriť návod</span>
                <ChevronRightIcon class="w-3 h-3" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Glossary View -->
      <div v-else-if="activeTab === 'glossary'" class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div v-if="pendingGlossary" class="p-8 space-y-4">
          <div v-for="i in 10" :key="i" class="h-12 bg-gray-50 animate-pulse rounded-xl"></div>
        </div>
        <div v-else-if="glossaryContent" class="p-8 md:p-12 prose prose-brand max-w-none">
          <ContentRenderer :value="glossaryContent" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import {
  ClipboardList as ClipboardListIcon,
  Printer as PrinterIcon,
  Copy as CopyIcon,
  Check as CheckIcon,
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon
} from '@lucide/vue'
import { cheatsheetPrompts } from '~/data/cheatsheetPrompts'

const route = useRoute()

const activeTab = ref('prompts')
const copiedId = ref('')
const filterQuery = ref('')
const focusedId = ref('')

const allPrompts = cheatsheetPrompts

const filteredPrompts = computed(() => {
  const q = filterQuery.value.trim().toLowerCase()
  if (!q) return allPrompts
  return allPrompts.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.prompt.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q)
  )
})

const groupedPrompts = computed(() => {
  const groups = {}
  for (const c of filteredPrompts.value) {
    if (!groups[c.category]) groups[c.category] = []
    groups[c.category].push(c)
  }
  return groups
})

const copy = (id, text) => {
  navigator.clipboard.writeText(text)
  copiedId.value = id
  setTimeout(() => { if (copiedId.value === id) copiedId.value = '' }, 2000)
}

const printPage = () => {
  if (typeof window !== 'undefined') window.print()
}

// ?focus=<id> from global search highlights and scrolls to the matching card.
const focusFromQuery = async () => {
  const id = route.query.focus
  if (typeof id !== 'string' || !id) return
  focusedId.value = id
  await nextTick()
  if (typeof document !== 'undefined') {
    const el = document.getElementById(`prompt-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  // Drop the highlight after a few seconds, leaving the URL intact.
  setTimeout(() => { focusedId.value = '' }, 4000)
}

onMounted(focusFromQuery)
watch(() => route.query.focus, focusFromQuery)

const { data: glossaryContent, pending: pendingGlossary } = await useAsyncData('glossary', () => {
  return queryCollection('content').path('/initial_info/glosar_pojmov').first()
})
</script>

<style>
@media print {
  @page {
    margin: 1.5cm;
  }
  /* Kill site chrome, modals and any "no-print" affordances. */
  header,
  nav,
  .no-print,
  [role="dialog"],
  .fixed.inset-0 {
    display: none !important;
  }
  main {
    padding-top: 0 !important;
  }
  .max-w-6xl {
    max-width: 100% !important;
    padding: 0 !important;
  }
  /* Each category starts a fresh visual block; cards stack vertically. */
  .print-grid {
    display: block !important;
  }
  .print-category {
    page-break-before: auto;
    margin-top: 1rem;
  }
  .bg-white {
    border: 1px solid #ddd !important;
    box-shadow: none !important;
    margin-bottom: 1rem;
    page-break-inside: avoid;
  }
  /* Force the prompt blockquote to print legibly in black on white. */
  .bg-gray-50 {
    background: #f9f9f9 !important;
    border: 1px solid #eee !important;
  }
}
</style>
