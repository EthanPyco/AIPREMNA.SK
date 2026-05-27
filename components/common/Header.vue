<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center px-4 md:px-8">
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

    <!-- Search Bar -->
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
            @mousedown="navigateToResult(result.path)"
            class="w-full text-left p-4 hover:bg-brand-background transition-colors flex flex-col gap-1"
          >
            <span class="font-heading font-bold text-xs text-brand-dark uppercase tracking-tight">{{ result.title }}</span>
            <span class="text-xs text-gray-400 line-clamp-1 italic">{{ result.description }}</span>
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
    <button class="lg:hidden ml-auto p-2 text-gray-500 hover:text-brand-primary transition-colors">
      <MenuIcon class="w-6 h-6" />
    </button>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ClipboardList as ClipboardListIcon, 
  History as HistoryIcon, 
  Bookmark as BookmarkIcon, 
  Search as SearchIcon,
  Menu as MenuIcon
} from '@lucide/vue'

const router = useRouter()
const { results, initIndex, search } = useSearch()

const searchQuery = ref('')
const showResults = ref(false)

onMounted(() => {
  initIndex()
})

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2) {
    search(newQuery)
  } else {
    results.value = []
  }
})

const navigateToResult = (path) => {
  router.push({ query: { card: path } })
  searchQuery.value = ''
  showResults.value = false
}

const handleBlur = () => {
  setTimeout(() => {
    showResults.value = false
  }, 200)
}
</script>
