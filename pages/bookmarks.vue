<template>
  <NuxtLayout>
    <div class="max-w-6xl mx-auto p-6 md:p-10">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
          <BookmarkIcon class="w-8 h-8" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-brand-dark">Uložené</h1>
          <p class="text-gray-500">Vaša osobná zbierka návodov a nástrojov.</p>
        </div>
      </div>

      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
      </div>

      <div v-else-if="bookmarkedGuides.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="guide in bookmarkedGuides"
          :key="guide.path"
          class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
          @click="openCard(guide.path)"
        >
          <div>
            <h3 class="font-bold text-lg mb-2 group-hover:text-brand-primary transition-colors">{{ guide.title }}</h3>
            <p class="text-sm text-gray-600 line-clamp-2 mb-4">{{ guide.description }}</p>
          </div>
          <div class="flex items-center justify-between mt-auto gap-2">
            <span
              class="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded inline-flex items-center gap-1.5"
              :class="categoryFor(guide.path).pillClass"
            >
              <span>{{ categoryFor(guide.path).tier }}</span>
              <span v-if="categoryFor(guide.path).sub" class="opacity-60">·</span>
              <span v-if="categoryFor(guide.path).sub">{{ categoryFor(guide.path).sub }}</span>
            </span>
            <button
              @click.stop="toggleBookmark(guide.path)"
              class="text-brand-primary hover:scale-110 transition-transform shrink-0"
              aria-label="Odstrániť z uložených"
            >
              <BookmarkIcon class="w-5 h-5" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <BookmarkIcon class="w-10 h-10" />
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Zatiaľ nemáte žiadne záložky</h2>
        <p class="text-gray-500 mb-6">Uložte si návody, ktoré vás zaujali, aby ste ich neskôr rýchlo našli.</p>
        <NuxtLink to="/" class="px-6 py-2.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
          Preskúmať roadmapu
        </NuxtLink>
      </div>

      <!-- Modal overlay if opened from here -->
      <GuideLearningCard
        v-if="activeCardPath"
        :key="activeCardPath"
        :path="activeCardPath"
        @close="handleCardClose"
      />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Bookmark as BookmarkIcon } from '@lucide/vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { bookmarkedPaths, toggleBookmark } = useBookmarks()
const { data: allGuides, pending } = await useSlovakContent()

const bookmarkedGuides = computed(() => {
  if (!allGuides.value) return []
  return allGuides.value.filter(g => bookmarkedPaths.value.includes(g.path))
})

const humanise = (s) => (s || '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

// Maps a guide's content path to a tier label + actual subcategory folder
// and a brand-colour pill matching the homepage roadmap tiers.
const categoryFor = (path) => {
  const parts = (path || '').split('/').filter(Boolean)
  const tierFolder = parts[0]
  const sub = humanise(parts[1] || '')
  if (tierFolder === 'initial_info') {
    return { tier: 'Základy', sub, pillClass: 'text-brand-primary bg-brand-primary/10' }
  }
  if (tierFolder === 'jednotlive_usecases') {
    return { tier: 'Prípady použitia', sub, pillClass: 'text-brand-secondary bg-brand-secondary/10' }
  }
  if (tierFolder === 'jednotlive_tools') {
    return { tier: 'Nástroje', sub, pillClass: 'text-emerald-700 bg-emerald-50' }
  }
  return { tier: humanise(tierFolder), sub, pillClass: 'text-gray-700 bg-gray-100' }
}

const activeCardPath = ref(null)

const openCard = (path) => {
  router.push({ query: { card: path } })
}

const handleCardClose = () => {
  const query = { ...route.query }
  delete query.card
  router.push({ query })
}

watch(() => route.query.card, (newCard) => {
  activeCardPath.value = newCard
}, { immediate: true })
</script>
