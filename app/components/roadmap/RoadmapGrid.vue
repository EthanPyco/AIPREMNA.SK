<script setup lang="ts">
import { computed } from 'vue'

const { t, locale } = useI18n()

const { groups, pending } = useRoadmapData(() => (locale.value === 'en' ? 'en' : 'sk'))
const { open } = useCardRoute()
const { progress, completedSlugs } = useProgress()

const tierMeta = computed(() => ({
  foundation: {
    icon: 'lucide:book-open',
    title: t('roadmap.tiers.foundation.title'),
    tagline: t('roadmap.tiers.foundation.tagline'),
  },
  usecases: {
    icon: 'lucide:zap',
    title: t('roadmap.tiers.usecases.title'),
    tagline: t('roadmap.tiers.usecases.tagline'),
  },
  tools: {
    icon: 'lucide:cpu',
    title: t('roadmap.tiers.tools.title'),
    tagline: t('roadmap.tiers.tools.tagline'),
  },
}))

function categoryLabel(key: string): string {
  const fallback = key.replace(/_/g, ' ')
  const translated = t(`roadmap.categories.${key}`, '')
  return translated || fallback
}

function checkedCount(slug: string): number {
  const map = progress.value[slug]
  if (!map) return 0
  return Object.values(map).filter(Boolean).length
}

function percentFor(slug: string, total: number): number {
  if (total === 0) return 0
  return Math.min(100, Math.round((checkedCount(slug) / total) * 100))
}

function isComplete(slug: string): boolean {
  return completedSlugs.value.has(slug)
}

function onCardClick(slug: string) {
  open(slug)
}
</script>

<template>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30 md:block"
      aria-hidden="true"
    />

    <div
      v-if="pending"
      class="grid min-h-[60vh] place-items-center"
      data-testid="roadmap-loading"
    >
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>

    <div v-else class="relative mx-auto max-w-7xl px-4 py-12 md:px-8" data-testid="roadmap-grid">
      <!-- Tier 1 — Foundation -->
      <section class="relative mb-24" data-testid="tier-foundation" data-tier="foundation">
        <div class="mb-10 flex flex-col items-center text-center">
          <div
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30"
          >
            <Icon :name="tierMeta.foundation.icon" class="h-7 w-7" />
          </div>
          <h2 class="font-heading text-3xl tracking-tight text-ink md:text-4xl">
            {{ tierMeta.foundation.title }}
          </h2>
          <p class="mt-2 max-w-md text-sm text-ink/60">
            {{ tierMeta.foundation.tagline }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="guide in groups.foundation.items"
            :key="guide.slug"
            type="button"
            class="group relative flex flex-col rounded-2xl border border-ink/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            :class="{ 'border-primary/40 ring-1 ring-primary/20': isComplete(guide.slug) }"
            data-testid="roadmap-card"
            :data-slug="guide.slug"
            :data-tier="guide.tier"
            :data-completed="isComplete(guide.slug)"
            @click="onCardClick(guide.slug)"
          >
            <div class="mb-3 flex items-start justify-between gap-2">
              <h3 class="font-heading text-sm uppercase tracking-tight text-ink group-hover:text-primary">
                {{ guide.title }}
              </h3>
              <Icon
                v-if="isComplete(guide.slug)"
                name="lucide:check-circle-2"
                class="h-5 w-5 shrink-0 text-emerald-500"
              />
            </div>
            <p class="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-ink/60">
              {{ guide.excerpt }}
            </p>
            <div v-if="guide.checklistTotal > 0" class="mt-auto flex items-center gap-2">
              <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/5">
                <div
                  class="h-full bg-primary transition-all duration-300"
                  :style="{ width: `${percentFor(guide.slug, guide.checklistTotal)}%` }"
                />
              </div>
              <span class="font-heading text-[10px] text-primary">
                {{ percentFor(guide.slug, guide.checklistTotal) }}%
              </span>
            </div>
          </button>
        </div>
      </section>

      <!-- Tier 2 — Use cases -->
      <section
        class="relative mb-24 border-t border-dashed border-ink/10 pt-16"
        data-testid="tier-usecases"
        data-tier="usecases"
      >
        <div class="mb-10 flex flex-col items-center text-center">
          <div
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/30"
          >
            <Icon :name="tierMeta.usecases.icon" class="h-7 w-7" />
          </div>
          <h2 class="font-heading text-3xl tracking-tight text-ink md:text-4xl">
            {{ tierMeta.usecases.title }}
          </h2>
          <p class="mt-2 max-w-md text-sm text-ink/60">
            {{ tierMeta.usecases.tagline }}
          </p>
        </div>

        <div
          v-for="cat in groups.usecases.categories"
          :key="cat.category"
          class="mb-14 last:mb-0"
          data-testid="usecases-category"
          :data-category="cat.category"
        >
          <h3 class="mb-6 flex items-center gap-4 font-heading text-[11px] uppercase tracking-[0.25em] text-ink/40">
            <span>{{ categoryLabel(cat.category) }}</span>
            <span class="h-px flex-1 bg-ink/10" />
          </h3>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <button
              v-for="guide in cat.items"
              :key="guide.slug"
              type="button"
              class="group relative flex flex-col rounded-xl border border-ink/10 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
              :class="{ 'border-secondary/40 ring-1 ring-secondary/20': isComplete(guide.slug) }"
              data-testid="roadmap-card"
              :data-slug="guide.slug"
              :data-tier="guide.tier"
              :data-completed="isComplete(guide.slug)"
              @click="onCardClick(guide.slug)"
            >
              <div class="mb-2 flex items-start justify-between gap-2">
                <h4 class="font-heading text-xs uppercase tracking-tight text-ink group-hover:text-secondary">
                  {{ guide.title }}
                </h4>
                <Icon
                  v-if="isComplete(guide.slug)"
                  name="lucide:check-circle-2"
                  class="h-4 w-4 shrink-0 text-emerald-500"
                />
              </div>
              <div v-if="guide.checklistTotal > 0" class="mt-auto flex items-center gap-2">
                <div class="h-1 flex-1 overflow-hidden rounded-full bg-ink/5">
                  <div
                    class="h-full bg-secondary transition-all duration-300"
                    :style="{ width: `${percentFor(guide.slug, guide.checklistTotal)}%` }"
                  />
                </div>
                <span class="font-heading text-[9px] text-secondary">
                  {{ percentFor(guide.slug, guide.checklistTotal) }}%
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      <!-- Tier 3 — Tools -->
      <section
        class="relative border-t border-dashed border-ink/10 pt-16"
        data-testid="tier-tools"
        data-tier="tools"
      >
        <div class="mb-10 flex flex-col items-center text-center">
          <div
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/30"
          >
            <Icon :name="tierMeta.tools.icon" class="h-7 w-7" />
          </div>
          <h2 class="font-heading text-3xl tracking-tight text-ink md:text-4xl">
            {{ tierMeta.tools.title }}
          </h2>
          <p class="mt-2 max-w-md text-sm text-ink/60">
            {{ tierMeta.tools.tagline }}
          </p>
        </div>

        <div
          v-for="cat in groups.tools.categories"
          :key="cat.category"
          class="mb-10 last:mb-0"
          data-testid="tools-category"
          :data-category="cat.category"
        >
          <h3 class="mb-5 flex items-center gap-4 font-heading text-[11px] uppercase tracking-[0.25em] text-ink/40">
            <span>{{ categoryLabel(cat.category) }}</span>
            <span class="h-px flex-1 bg-ink/10" />
          </h3>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <button
              v-for="guide in cat.items"
              :key="guide.slug"
              type="button"
              class="group flex aspect-square flex-col items-center justify-center rounded-xl border border-ink/10 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              :class="{ 'border-accent ring-1 ring-accent/30': isComplete(guide.slug) }"
              data-testid="roadmap-card"
              :data-slug="guide.slug"
              :data-tier="guide.tier"
              :data-completed="isComplete(guide.slug)"
              @click="onCardClick(guide.slug)"
            >
              <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-ink/5 transition-colors group-hover:bg-accent/10">
                <Icon
                  v-if="isComplete(guide.slug)"
                  name="lucide:check-circle-2"
                  class="h-4 w-4 text-emerald-500"
                />
                <Icon v-else name="lucide:layout-dashboard" class="h-4 w-4 text-ink/40 group-hover:text-secondary" />
              </div>
              <span class="font-heading text-[10px] uppercase leading-tight tracking-tight text-ink">
                {{ guide.title }}
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
