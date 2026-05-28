<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-brand-dark/20 backdrop-blur-md" @click="close"></div>
    
    <!-- Modal Card -->
    <div 
      class="relative w-full max-w-5xl h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
    >
      <!-- Header -->
      <div class="p-6 md:p-8 flex items-center justify-between border-b border-gray-50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-6 h-6"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
          </div>
          <h2 class="text-xl md:text-2xl font-heading font-bold text-brand-dark line-clamp-1">
            {{ guide?.title || 'Načítavam...' }}
          </h2>
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            @click="toggleBookmarkStatus"
            class="p-3 rounded-xl transition-all"
            :class="isBookmarked(path) ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'"
            :title="isBookmarked(path) ? 'Odstrániť z uložených' : 'Uložiť návod'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" :fill="isBookmarked(path) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark w-5 h-5"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
          </button>
          <button 
            @click="close"
            class="p-3 bg-gray-50 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x w-5 h-5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
      </div>

      <!-- Main Body -->
      <div class="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div v-if="pending" class="p-8 space-y-8 animate-pulse">
          <div class="h-8 bg-gray-100 rounded-lg w-3/4"></div>
          <div class="h-4 bg-gray-100 rounded-lg w-1/2"></div>
          <div class="space-y-4">
            <div class="h-20 bg-gray-100 rounded-2xl w-full"></div>
            <div class="h-20 bg-gray-100 rounded-2xl w-full"></div>
          </div>
        </div>
        
        <div v-else-if="guide" class="flex flex-col lg:flex-row min-h-full">
          <!-- Content -->
          <article class="flex-1 p-6 md:p-10 md:pt-8 prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-brand-dark prose-blockquote:border-brand-primary prose-blockquote:bg-brand-primary/5 prose-blockquote:rounded-2xl prose-blockquote:py-1 prose-a:text-brand-primary prose-img:rounded-3xl prose-img:shadow-xl">
            <ContentRenderer :value="processedGuide" />
            
            <!-- External Links if any -->
            <div v-if="guide.externalLinks?.length" class="mt-12 pt-8 border-t border-gray-100">
              <h3 class="text-sm uppercase tracking-widest text-gray-400 font-bold mb-6">Užitočné zdroje</h3>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 list-none !pl-0">
                <li v-for="link in guide.externalLinks" :key="link">
                  <a 
                    :href="link" 
                    target="_blank"
                    class="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-brand-primary/5 hover:text-brand-primary transition-all group no-underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link w-4 h-4 text-gray-400 group-hover:text-brand-primary"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                    <span class="text-sm font-medium truncate">{{ link }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </article>

          <!-- Sidebar Tracking -->
          <aside class="w-full lg:w-80 p-6 md:p-8 bg-gray-50/50 lg:border-l border-gray-50 flex flex-col gap-8">
            <GuideProgressTracker 
              :items="extractedChecklistItems"
              :checklist="checklist"
              :progress="completion"
              @toggle="toggleItem"
            />
          </aside>
        </div>

        <!-- Error State -->
        <div v-else class="p-20 text-center">
          <div class="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
          </div>
          <h3 class="text-xl font-heading font-bold text-brand-dark mb-2">Nepodarilo sa načítať návod</h3>
          <p class="text-gray-500 mb-8">Skúste to prosím znova alebo skontrolujte pripojenie.</p>
          <button @click="close" class="px-6 py-3 bg-brand-dark text-white rounded-xl font-bold text-sm tracking-wider uppercase">
            Zavrieť
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue'
import { useBookmarks } from '~/composables/useBookmarks'
import { useLastUsed } from '~/composables/useLastUsed'
import { useProgress } from '~/composables/useProgress'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const { isBookmarked, toggleBookmark } = useBookmarks()
const { addLastUsed } = useLastUsed()

const isOpen = ref(true)
const openTime = ref(0)
const timer = ref(null)

const { checklist, toggleItem, getCompletionPercentage } = useProgress(props.path)

// Use useAsyncData for stable fetching and SSR support
const { data: guide, pending, error } = await useAsyncData(`guide-${props.path}`, async () => {
  try {
    const g = await queryCollection('content').path(props.path).first()
    if (g) {
      const dir = props.path.substring(0, props.path.lastIndexOf('/'))
      const linksData = await queryCollection('content').path(`${dir}/links`).first()
      if (linksData) {
        g.externalLinks = linksData.links || []
      }
    }
    return g
  } catch (e) {
    console.error('Error fetching guide in useAsyncData:', e)
    return null
  }
}, {
  watch: [() => props.path]
})

// Provide state for interactive Prose components (like ProseLi)
provide('checklistState', checklist)
provide('toggleItem', toggleItem)

// Helper to extract text from Minimark AST nodes [tag, props, ...children]
const getText = (node) => {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) {
    // Skip tag (index 0) and props (index 1)
    const children = node.slice(2)
    return children.map(getText).join('')
  }
  return ''
}

// Helper to check if a heading matches the verification section
const isVerificationHeading = (node) => {
  if (!Array.isArray(node)) return false
  const tag = node[0]
  if (typeof tag !== 'string' || !tag.match(/^h[1-6]$/)) return false
  
  const text = getText(node).toLowerCase()
  // Permissive matching for verification sections
  return text.includes('✅') ||
         text.includes('ako zisti') ||
         text.includes('ako vedie') ||
         text.includes('how to know') ||
         text.includes('overeni') ||
         text.includes('pochopi') ||
         text.includes(' mastered')
}

const processedData = computed(() => {
  const bodyChildren = guide.value?.body?.value || guide.value?.body?.children
  if (!bodyChildren || !Array.isArray(bodyChildren)) {
    return { processedGuide: guide.value, items: [] }
  }

  const newGuide = JSON.parse(JSON.stringify(guide.value))
  const children = newGuide.body.value || newGuide.body.children
  let inVerificationSection = false
  let checklistIndex = 0
  let items = []

  for (const node of children) {
    if (!Array.isArray(node)) continue

    const tag = node[0]
    if (isVerificationHeading(node)) {
      inVerificationSection = true
      continue
    } else if (inVerificationSection && typeof tag === 'string' && tag.match(/^h[1-6]$/)) {
      inVerificationSection = false
    }

    if (inVerificationSection && (tag === 'ul' || tag === 'ol')) {
      const listChildren = node.slice(2)
      for (const child of listChildren) {
        if (Array.isArray(child) && child[0] === 'li') {
          const itemText = getText(child).trim()
          if (itemText) {
            items.push(itemText)
            // Inject props into index 1 of the Minimark node array
            child[1] = child[1] || {}
            child[1].checklistIndex = checklistIndex++
            child[1].isInsideVerification = true
          }
        }
      }
    }
  }

  return { processedGuide: newGuide, items }
})

const processedGuide = computed(() => processedData.value.processedGuide)
const extractedChecklistItems = computed(() => processedData.value.items)

const completion = computed(() => {
  return getCompletionPercentage(extractedChecklistItems.value.length)
})

// Persist the real checklist length so the roadmap can compute % without
// loading every guide. Read by ScrollRoadmap.getProgress.
watch(extractedChecklistItems, (items) => {
  if (typeof window === 'undefined' || items.length === 0) return
  localStorage.setItem(`progress-total-${props.path}`, String(items.length))
}, { immediate: true })

const toggleBookmarkStatus = () => {
  toggleBookmark(props.path)
}

const close = () => {
  isOpen.value = false
  emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
  
  // Track last used
  const timer = setTimeout(() => {
    if (guide.value) {
      addLastUsed(props.path, guide.value.title || props.path)
    }
  }, 10000)
  
  onUnmounted(() => clearTimeout(timer))
})
</script>

<style scoped>
.prose :deep(blockquote) {
  @apply font-normal italic text-slate-600 bg-slate-50/50 border-slate-200 rounded-2xl py-2 px-6;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-brand-background rounded-full border-4 border-white hover:bg-gray-200 transition-colors;
}
</style>
