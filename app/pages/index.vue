<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()
const { activeSlug, isOpen, close } = useCardRoute()
const slugRef = computed(() => activeSlug.value)
const { data: guide } = useGuide(slugRef)

function scrollToRoadmap() {
  if (typeof document === 'undefined') return
  document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div>
    <section class="px-6 pt-16 pb-12 text-center md:pt-24 md:pb-20" data-testid="hero">
      <div class="mx-auto max-w-3xl">
        <h1
          class="font-heading text-4xl leading-tight tracking-tight text-ink md:text-6xl"
          data-testid="page-title"
        >
          {{ t('home.title') }}
          <span class="text-primary italic">{{ t('home.titleHighlight') }}</span>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base text-ink/60 md:text-lg">
          {{ t('home.subtitle') }}
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            class="rounded-xl bg-ink px-7 py-3 font-heading text-xs uppercase tracking-widest text-white shadow-lg shadow-ink/20 transition-colors hover:bg-primary"
            data-testid="cta-start"
            @click="scrollToRoadmap"
          >
            {{ t('home.ctaStart') }}
          </button>
          <NuxtLink
            to="/tahak"
            class="rounded-xl border border-ink/10 bg-white px-7 py-3 font-heading text-xs uppercase tracking-widest text-ink shadow-sm transition-shadow hover:shadow-md"
          >
            {{ t('home.ctaCheatsheet') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <div id="roadmap">
      <RoadmapGrid />
    </div>

    <LearningCard :open="isOpen" :guide="guide ?? null" @close="close" />
  </div>
</template>
