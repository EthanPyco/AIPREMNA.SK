<script setup lang="ts">
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import type { LoadedGuide } from '../../composables/useGuide'
import CardSectionImpl from './CardSection.vue'
import PromptWindowImpl from './PromptWindow.vue'

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
                <DialogTitle
                  as="h2"
                  class="font-heading text-xl text-ink"
                  data-testid="card-title"
                >
                  {{ title || 'Načítavam…' }}
                </DialogTitle>
                <button
                  type="button"
                  class="rounded-md p-1.5 text-ink/60 hover:bg-ink/[0.05] hover:text-ink"
                  data-testid="card-close"
                  aria-label="Zavrieť"
                  @click="emit('close')"
                >
                  <Icon name="lucide:x" class="h-5 w-5" />
                </button>
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
                  />
                </section>

                <CardSectionImpl
                  v-if="sections.humanLoop"
                  heading="Človek v slučke"
                  :body="sections.humanLoop"
                  variant="warning"
                  testid="card-human-loop"
                />

                <CardSectionImpl
                  v-if="sections.mastery"
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
