<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4 md:px-8">
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-2 group">
      <div class="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
        <BookOpenIcon class="w-6 h-6" />
      </div>
      <div class="hidden sm:block">
        <h1 class="font-bold text-lg leading-tight">AI PREMNA</h1>
        <p class="text-xs text-gray-500 font-medium">AI PRE NÁS</p>
      </div>
    </NuxtLink>

    <!-- Navigation -->
    <nav class="ml-auto hidden md:flex items-center gap-6">
      <NuxtLink to="/cheatsheet" class="flex items-center gap-1.5 text-gray-600 hover:text-brand-primary transition-colors font-medium">
        <ClipboardListIcon class="w-4 h-4" />
        <span>Ťahák promptov</span>
      </NuxtLink>
      <NuxtLink to="/recent" class="flex items-center gap-1.5 text-gray-600 hover:text-brand-primary transition-colors font-medium">
        <HistoryIcon class="w-4 h-4" />
        <span>Naposledy otvorené</span>
      </NuxtLink>
      <NuxtLink to="/bookmarks" class="flex items-center gap-1.5 text-gray-600 hover:text-brand-primary transition-colors font-medium">
        <BookmarkIcon class="w-4 h-4" />
        <span>Uložené</span>
      </NuxtLink>
    </nav>

    <!-- Search Bar -->
    <div class="ml-6 flex-1 max-w-xs relative hidden sm:block">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Vyhľadávať..." 
        class="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-brand-primary focus:ring-0 rounded-full text-sm transition-all"
        @focus="showResults = true"
        @blur="handleBlur"
      />
      
      <!-- Search Results Dropdown -->
      <div 
        v-if="showResults && results.length > 0" 
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-[60]"
      >
        <div v-for="result in results" :key="result.path" class="border-b border-gray-50 last:border-0">
          <button 
            @mousedown="navigateToResult(result.path)"
            class="w-full text-left p-3 hover:bg-gray-50 transition-colors flex flex-col gap-0.5"
          >
            <span class="font-bold text-sm text-brand-dark">{{ result.title }}</span>
            <span class="text-xs text-gray-500 line-clamp-1">{{ result.description }}</span>
          </button>
        </div>
      </div>
      <div 
        v-else-if="showResults && searchQuery.length > 2" 
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl p-4 text-center text-sm text-gray-500 z-[60]"
      >
        Žiadne výsledky pre „{{ searchQuery }}“
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button class="md:hidden ml-auto p-2 text-gray-600">
      <MenuIcon class="w-6 h-6" />
    </button>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  BookOpen as BookOpenIcon, 
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
  // Delay to allow mousedown on results
  setTimeout(() => {
    showResults.value = false
  }, 200)
}
</script>
