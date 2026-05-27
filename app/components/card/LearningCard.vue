<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import confetti from 'canvas-confetti'
import type { LoadedGuide } from '../../composables/useGuide'
import CardSectionImpl from './CardSection.vue'
import PromptWindowImpl from './PromptWindow.vue'
import ChecklistSectionImpl from './ChecklistSection.vue'
import ProgressRingImpl from './ProgressRing.vue'

const props = defineProps<{
  open: boolean
  guide: LoadedGuide | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const title = computed(() => props.guide?.title ?? '')
const sections = computed(() => props.guide?.sections ?? {})
const prompts = computed(() => props.guide?.prompts ?? [])
const slug = computed(() => props.guide?.slug ?? '')
const checklist = computed(() => props.guide?.checklist ?? [])

const { markSeen, summaryRef } = useProgress()
const bookmarks = useBookmarks()

const isBookmarked = computed(() => (slug.value ? bookmarks.isCardBookmarked(slug.value) : false))

function onToggleBookmark() {
  if (!props.guide) return
  bookmarks.toggleCard({
    slug: props.guide.slug,
    title: props.guide.title ?? props.guide.slug,
    tier: '',
    category: null,
  })
}

const progress = summaryRef(
  () => slug.value,
  () => checklist.value.length,
)

watch(
  () => [props.open, slug.value],
  ([isOpen, s]) => {
    if (isOpen && s) markSeen(s as string)
  },
  { immediate: true },
)

function fireConfetti() {
  if (typeof window === 'undefined') return
  const key = `aipremna:celebrated:${slug.value}`
  if (sessionStorage.getItem(key)) return
  sessionStorage.setItem(key, '1')
  confetti({
    particleCount: 110,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#8175fb', '#3d72e5', '#7dbcf9', '#22c55e'],
  })
}

watch(
  () => progress.value.percent,
  (next, prev) => {
    if (next === 100 && (prev ?? 0) < 100 && checklist.value.length > 0) {
      fireConfetti()
    } else if (next < 100) {
      const key = `aipremna:celebrated:${slug.value}`
      if (typeof window !== 'undefined') sessionStorage.removeItem(key)
    }
  },
)

onMounted(() => {
  if (props.open && progress.value.percent === 100 && checklist.value.length > 0) {
    fireConfetti()
  }
})
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" class="relative z-50" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="duration-150 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-100 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-ink/40" aria-hidden="true" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-2 sm:items-center sm:p-4">
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-bg shadow-xl"
              data-testid="learning-card"
            >
              <header
                class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink/10 bg-bg/95 px-5 py-3 backdrop-blur"
              >
                <div class="flex items-center gap-3">
                  <ProgressRingImpl
                    v-if="checklist.length > 0"
                    :percent="progress.percent"
                    :size="56"
                    :stroke="5"
                  />
                  <DialogTitle
                    as="h2"
                    class="font-heading text-xl text-ink"
                    data-testid="card-title"
                  >
                    {{ title || 'Načítavam…' }}
                  </DialogTitle>
                </div>
                <div class="flex items-center gap-1">
                  <button
                    v-if="guide"
                    type="button"
                    class="rounded-md p-1.5 text-ink/60 hover:bg-ink/[0.05] hover:text-primary"
                    data-testid="card-bookmark"
                    :data-state="isBookmarked ? 'on' : 'off'"
                    :aria-label="isBookmarked ? 'Odstrániť z uložených' : 'Uložiť'"
                    @click="onToggleBookmark"
                  >
                    <Icon
                      :name="isBookmarked ? 'lucide:bookmark-check' : 'lucide:bookmark'"
                      class="h-5 w-5"
                    />
                  </button>
                  <button
                    type="button"
                    class="rounded-md p-1.5 text-ink/60 hover:bg-ink/[0.05] hover:text-ink"
                    data-testid="card-close"
                    aria-label="Zavrieť"
                    @click="emit('close')"
                  >
                    <Icon name="lucide:x" class="h-5 w-5" />
                  </button>
                </div>
              </header>

              <div class="flex-1 overflow-y-auto px-5 py-4">
                <p
                  v-if="guide?.usedFallback"
                  class="mb-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
                  data-testid="card-fallback-badge"
                >
                  Tento návod ešte nemá preklad v zvolenom jazyku — zobrazujeme záložnú verziu.
                </p>

                <CardSectionImpl
                  v-if="guide?.goal"
                  heading="Cieľ"
                  :body="guide.goal"
                  testid="card-goal"
                />

                <CardSectionImpl
                  v-if="sections.workflow"
                  heading="Postup krok za krokom"
                  :body="sections.workflow"
                  testid="card-workflow"
                />

                <section
                  v-if="prompts.length > 0"
                  class="my-4 rounded-xl border border-ink/10 bg-white p-5"
                  data-testid="card-prompts"
                >
                  <h3 class="mb-2 font-heading text-base text-ink">Prompty</h3>
                  <PromptWindowImpl
                    v-for="p in prompts"
                    :key="p.index"
                    :text="p.text"
                    :heading="p.heading"
                    :index="p.index"
                    :slug="slug"
                    :guide-title="title"
                  />
                </section>

                <CardSectionImpl
                  v-if="sections.humanLoop"
                  heading="Človek v slučke"
                  :body="sections.humanLoop"
                  variant="warning"
                  testid="card-human-loop"
                />

                <ChecklistSectionImpl
                  v-if="checklist.length > 0"
                  :slug="slug"
                  :items="checklist"
                />
                <CardSectionImpl
                  v-else-if="sections.mastery"
                  heading="Ako zistíte, že ste návod pochopili"
                  :body="sections.mastery"
                  testid="card-mastery"
                />

                <CardSectionImpl
                  v-if="sections.optional"
                  heading="Voliteľné rozšírenie"
                  :body="sections.optional"
                  variant="muted"
                  testid="card-optional"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
