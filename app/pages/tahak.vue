<script setup lang="ts">
import { ref, computed } from 'vue'
import { CATEGORY_LABELS_SK } from '~~/shared/labels.sk'

const { data } = await useCheatsheet('sk')
const cardRoute = useCardRoute()

type Tab = 'cheats' | 'glossary'
const tab = ref<Tab>('cheats')
const filter = ref('')

const copiedId = ref<string | null>(null)
let resetTimer: ReturnType<typeof setTimeout> | null = null

async function copyPrompt(id: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (copiedId.value = null), 1500)
  } catch {
    /* ignored */
  }
}

const filteredPrompts = computed(() => {
  const q = filter.value.trim().toLowerCase()
  const all = data.value?.prompts ?? []
  if (!q) return all
  return all.filter((p) =>
    [p.guideTitle, p.heading ?? '', p.text, p.category ?? '']
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
})

const filteredGlossary = computed(() => {
  const q = filter.value.trim().toLowerCase()
  const all = data.value?.glossary ?? []
  if (!q) return all
  return all.filter((t) =>
    [t.term, t.english ?? '', t.definition, t.group ?? '']
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
})

function categoryLabel(c: string | null): string {
  if (!c) return 'Všeobecné'
  return CATEGORY_LABELS_SK[c] ?? c
}

function openCard(slug: string) {
  cardRoute.open(slug)
  navigateTo({ path: '/', query: { card: slug } })
}

function onPrint() {
  if (typeof window !== 'undefined') window.print()
}
</script>

<template>
  <main class="mx-auto max-w-7xl px-6 py-10" data-testid="cheatsheet-page">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4 print:hidden">
      <div>
        <h1 class="font-heading text-3xl text-ink">Ťahák promptov</h1>
        <p class="mt-1 text-sm text-ink/60">
          Rýchla zbierka promptov a kľúčových pojmov, ktorú môžeš mať vždy poruke.
        </p>
      </div>
      <button
        type="button"
        class="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm text-ink/70 hover:border-primary hover:text-primary"
        data-testid="cheatsheet-print"
        @click="onPrint"
      >
        <Icon name="lucide:printer" class="mr-1 inline h-4 w-4" />
        Vytlačiť / PDF
      </button>
    </header>

    <div class="mb-4 flex flex-wrap gap-3 print:hidden">
      <div class="flex gap-1" data-testid="cheatsheet-tabs">
        <button
          type="button"
          class="rounded-lg border px-3 py-1.5 text-sm transition-colors"
          :class="
            tab === 'cheats'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-ink/15 bg-white text-ink/70 hover:border-primary/50'
          "
          data-testid="cheatsheet-tab-cheats"
          :data-active="tab === 'cheats'"
          @click="tab = 'cheats'"
        >
          Hlavný ťahák
        </button>
        <button
          type="button"
          class="rounded-lg border px-3 py-1.5 text-sm transition-colors"
          :class="
            tab === 'glossary'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-ink/15 bg-white text-ink/70 hover:border-primary/50'
          "
          data-testid="cheatsheet-tab-glossary"
          :data-active="tab === 'glossary'"
          @click="tab = 'glossary'"
        >
          Slovník pojmov
        </button>
      </div>

      <input
        v-model="filter"
        type="search"
        placeholder="Filtrovať…"
        class="h-9 w-full max-w-xs rounded-lg border border-ink/15 bg-white px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        data-testid="cheatsheet-filter"
      >
    </div>

    <section
      v-if="tab === 'cheats'"
      class="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
      data-testid="cheatsheet-grid"
    >
      <article
        v-for="p in filteredPrompts"
        :key="p.id"
        class="flex flex-col rounded-xl border border-ink/10 bg-white p-4"
        data-testid="cheatsheet-card"
        :data-slug="p.slug"
      >
        <header class="mb-2 flex items-start justify-between gap-2">
          <div>
            <button
              type="button"
              class="text-left text-xs uppercase tracking-wide text-ink/50 hover:text-primary"
              @click="openCard(p.slug)"
            >
              {{ categoryLabel(p.category) }} · {{ p.guideTitle }}
            </button>
            <div v-if="p.heading" class="mt-1 font-heading text-sm text-ink">
              {{ p.heading }}
            </div>
          </div>
          <button
            type="button"
            class="flex shrink-0 items-center gap-1 rounded-md border border-ink/15 bg-white px-2 py-1 text-xs text-ink hover:border-primary hover:text-primary"
            data-testid="cheatsheet-copy"
            :data-state="copiedId === p.id ? 'copied' : 'idle'"
            @click="copyPrompt(p.id, p.text)"
          >
            <Icon
              :name="copiedId === p.id ? 'lucide:check' : 'lucide:copy'"
              class="h-3.5 w-3.5"
            />
            <span>{{ copiedId === p.id ? 'Skopírované' : 'Kopírovať' }}</span>
          </button>
        </header>
        <pre class="whitespace-pre-wrap rounded bg-ink/[0.04] p-3 font-mono text-xs text-ink/85">{{ p.text }}</pre>
      </article>
      <div
        v-if="filteredPrompts.length === 0"
        class="col-span-full rounded-xl border border-dashed border-ink/20 bg-white p-8 text-center text-ink/60"
        data-testid="cheatsheet-empty"
      >
        Žiadne prompty pre tento filter.
      </div>
    </section>

    <section
      v-else
      class="space-y-6"
      data-testid="glossary-section"
    >
      <div v-if="filteredGlossary.length === 0" class="rounded-xl border border-dashed border-ink/20 bg-white p-8 text-center text-ink/60">
        Žiadne pojmy pre tento filter.
      </div>
      <ul v-else class="space-y-3">
        <li
          v-for="t in filteredGlossary"
          :key="t.term"
          class="rounded-xl border border-ink/10 bg-white p-4"
          data-testid="glossary-item"
        >
          <div class="text-xs uppercase tracking-wide text-ink/50">
            {{ t.group ?? 'Pojem' }}
          </div>
          <div class="mt-1 font-heading text-base text-ink">
            {{ t.term }}<span v-if="t.english" class="text-ink/50"> ({{ t.english }})</span>
          </div>
          <p class="mt-1 text-sm text-ink/80">{{ t.definition }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style>
@media print {
  header, nav, .print\:hidden { display: none !important; }
  body { background: white !important; }
}
</style>
