<template>
  <header class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
    <div ref="headerInnerRef" class="h-16 flex items-center px-4 md:px-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <img src="/logo.png" alt="AIPREMNA" class="h-10 w-auto" />
        <div class="hidden sm:block">
          <h1 class="font-heading font-bold text-sm leading-tight tracking-tight uppercase">AI PREMNA</h1>
          <p class="text-[10px] text-brand-secondary font-bold tracking-[0.2em] uppercase">AI PRE NÁS</p>
        </div>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="ml-auto hidden lg:flex items-center gap-6">
        <NuxtLink to="/recent" class="flex items-center gap-1.5 text-gray-500 hover:text-brand-primary transition-all font-bold text-xs uppercase tracking-wider">
          <HistoryIcon class="w-4 h-4" />
          <span>Naposledy otvorené</span>
        </NuxtLink>
        <NuxtLink to="/bookmarks" class="flex items-center gap-1.5 text-gray-500 hover:text-brand-primary transition-all font-bold text-xs uppercase tracking-wider">
          <BookmarkIcon class="w-4 h-4" />
          <span>Uložené</span>
        </NuxtLink>
        <NuxtLink to="/cheatsheet" class="flex items-center gap-1.5 text-gray-500 hover:text-brand-primary transition-all font-bold text-xs uppercase tracking-wider">
          <ClipboardListIcon class="w-4 h-4" />
          <span>Ťahák promptov</span>
        </NuxtLink>
      </nav>

      <!-- Search Bar (desktop / tablet) -->
      <div class="ml-6 flex-1 max-w-xs relative hidden sm:block">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Vyhľadávať návody..."
          class="w-full pl-10 pr-4 py-2 bg-brand-background border-transparent focus:bg-white focus:ring-2 focus:ring-brand-accent/30 rounded-xl text-sm transition-all font-medium"
          @focus="showResults = true"
          @blur="handleBlur"
        />

        <!-- Search Results Dropdown -->
        <div
          v-if="showResults && results.length > 0"
          class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[60]"
        >
          <div v-for="result in results" :key="result.path" class="border-b border-gray-50 last:border-0">
            <button
              @mousedown="navigateToResult(result)"
              class="w-full text-left p-4 hover:bg-brand-background transition-colors flex flex-col gap-1 min-w-0"
            >
              <span class="font-heading font-bold text-xs text-brand-dark uppercase tracking-tight truncate block w-full">{{ result.title }}</span>
              <span class="text-xs text-gray-500 line-clamp-1 italic break-words">{{ result.description }}</span>
            </button>
          </div>
        </div>
        <div
          v-else-if="showResults && searchQuery.length > 2"
          class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 text-center text-sm text-gray-400 font-medium z-[60]"
        >
          Žiadne výsledky pre „{{ searchQuery }}“
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="lg:hidden ml-auto p-2 text-gray-500 hover:text-brand-primary transition-colors"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Hlavné menu"
        @click="toggleMobileMenu"
      >
        <XIcon v-if="isMobileMenuOpen" class="w-6 h-6" />
        <MenuIcon v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Menu Panel -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-4 flex flex-col gap-2"
    >
      <!-- Search (mobile-only — desktop search is in the bar above) -->
      <div class="relative sm:hidden mb-2">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Vyhľadávať návody..."
          class="w-full pl-10 pr-4 py-2 bg-brand-background border-transparent focus:bg-white focus:ring-2 focus:ring-brand-accent/30 rounded-xl text-sm transition-all font-medium"
          @focus="showResults = true"
          @blur="handleBlur"
        />
        <div
          v-if="showResults && results.length > 0"
          class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[60]"
        >
          <div v-for="result in results" :key="result.path" class="border-b border-gray-50 last:border-0">
            <button
              @mousedown="navigateToResult(result)"
              class="w-full text-left p-4 hover:bg-brand-background transition-colors flex flex-col gap-1 min-w-0"
            >
              <span class="font-heading font-bold text-xs text-brand-dark uppercase tracking-tight truncate block w-full">{{ result.title }}</span>
              <span class="text-xs text-gray-500 line-clamp-1 italic break-words">{{ result.description }}</span>
            </button>
          </div>
        </div>
      </div>

      <NuxtLink
        to="/recent"
        class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-brand-background text-gray-700 hover:text-brand-primary transition-all font-bold text-sm uppercase tracking-wider"
        @click="closeMobileMenu"
      >
        <HistoryIcon class="w-5 h-5" />
        <span>Naposledy otvorené</span>
      </NuxtLink>
      <NuxtLink
        to="/bookmarks"
        class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-brand-background text-gray-700 hover:text-brand-primary transition-all font-bold text-sm uppercase tracking-wider"
        @click="closeMobileMenu"
      >
        <BookmarkIcon class="w-5 h-5" />
        <span>Uložené</span>
      </NuxtLink>
      <NuxtLink
        to="/cheatsheet"
        class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-brand-background text-gray-700 hover:text-brand-primary transition-all font-bold text-sm uppercase tracking-wider"
        @click="closeMobileMenu"
      >
        <ClipboardListIcon class="w-5 h-5" />
        <span>Ťahák promptov</span>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ClipboardList as ClipboardListIcon,
  History as HistoryIcon,
  Bookmark as BookmarkIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  X as XIcon
} from '@lucide/vue'

const router = useRouter()
const route = useRoute()
const { results, initIndex, search } = useSearch()

const searchQuery = ref('')
const showResults = ref(false)
const isMobileMenuOpen = ref(false)
const headerInnerRef = ref(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleDocumentClick = (e) => {
  if (!isMobileMenuOpen.value) return
  // Click inside the header? Ignore — the button itself toggles, and link
  // clicks already close via closeMobileMenu. Clicks anywhere else close.
  const headerEl = headerInnerRef.value?.parentElement
  if (headerEl && !headerEl.contains(e.target)) closeMobileMenu()
}

onMounted(() => {
  initIndex()
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// Close the menu when the route changes (e.g. user taps a link).
watch(() => route.fullPath, closeMobileMenu)

watch(searchQuery, (newQuery) => {
  // Guard against pathological queries that would push the dropdown wider
  // than its container — FlexSearch tolerates any length but the UI doesn't.
  const trimmed = (newQuery || '').slice(0, 80)
  if (trimmed.length > 2) {
    search(trimmed)
  } else {
    results.value = []
  }
})

const navigateToResult = (hit) => {
  // Guide hits open the LearningCard modal on the homepage.
  // Cheatsheet-prompt hits jump to /cheatsheet and highlight the matching card.
  if (hit?.kind === 'prompt') {
    router.push({ path: '/cheatsheet', query: { focus: hit.path } })
  } else {
    router.push({ path: '/', query: { card: hit?.path ?? hit } })
  }
  searchQuery.value = ''
  showResults.value = false
  closeMobileMenu()
}

const handleBlur = () => {
  setTimeout(() => {
    showResults.value = false
  }, 200)
}
</script>
