<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" @click="close"></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white w-full max-w-6xl max-h-full flex flex-col rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div class="flex-1 min-w-0">
          <h2 class="text-xl md:text-2xl font-bold truncate text-brand-dark">{{ guide?.title }}</h2>
          <div v-if="guide?.description" class="text-sm text-gray-500 mt-1 line-clamp-1">{{ guide.description }}</div>
        </div>
        
        <div class="flex items-center gap-2 ml-4">
          <button 
            @click="toggleBookmarkStatus"
            class="p-2.5 rounded-full hover:bg-gray-100 transition-colors"
            :class="isBookmarked(path) ? 'text-brand-primary' : 'text-gray-400'"
            title="Uložiť do záložiek"
          >
            <BookmarkIcon class="w-6 h-6" :fill="isBookmarked(path) ? 'currentColor' : 'none'" />
          </button>
          <button @click="close" class="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div class="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div v-if="pending" class="flex items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent"></div>
        </div>
        <div v-else-if="guide" class="flex flex-col lg:flex-row min-h-full">
          <!-- Main Content -->
          <div class="flex-1 p-6 md:p-10 prose prose-brand prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-bold prose-blockquote:not-italic">
            <ContentRenderer :value="guide" />
            
            <!-- In-content Checklist (Visible on mobile or as part of the guide flow) -->
            <div v-if="extractedChecklistItems.length > 0" class="mt-12 lg:hidden pt-8 border-t border-gray-100">
              <h3 class="flex items-center gap-2 text-xl font-bold text-brand-dark mb-6">
                <CheckCircleIcon class="w-6 h-6 text-emerald-500" />
                <span>Overenie vedomostí</span>
              </h3>
              <GuideChecklistItems 
                :items="extractedChecklistItems"
                :checklist="checklist"
                @toggle="toggleItem"
              />
            </div>
          </div>
          
          <!-- Sidebar (Progress Tracker) -->
          <div class="hidden lg:block w-80 p-6 border-l border-gray-100 bg-white">
            <GuideProgressTracker 
              :items="extractedChecklistItems"
              :checklist="checklist"
              :progress="completion"
              @toggle="toggleItem"
            />
            
            <!-- External Links -->
            <div v-if="guide.externalLinks && guide.externalLinks.length > 0" class="mt-10">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ExternalLinkIcon class="w-4 h-4" />
                <span>Užitočné odkazy</span>
              </h3>
              <ul class="space-y-2">
                <li v-for="link in guide.externalLinks" :key="link">
                  <a 
                    :href="link" 
                    target="_blank" 
                    class="text-sm text-brand-secondary hover:underline line-clamp-1 flex items-center gap-1 font-medium"
                  >
                    {{ link }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20">
          <p class="text-gray-500">Návod sa nepodarilo načítať.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { 
  X as XIcon, 
  Bookmark as BookmarkIcon, 
  CheckCircle as CheckCircleIcon,
  ExternalLink as ExternalLinkIcon
} from '@lucide/vue'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const { fetchGuide } = useContent()
const { isBookmarked, toggleBookmark } = useBookmarks()
const { addLastUsed } = useLastUsed()

const isOpen = ref(true)
const guide = ref(null)
const pending = ref(true)
const openTime = ref(0)
const timer = ref(null)

const { checklist, toggleItem, getCompletionPercentage } = useProgress(props.path)

const extractedChecklistItems = computed(() => {
  if (!guide.value?.body?.children) return []
  
  const children = guide.value.body.children
  let inVerificationSection = false
  let items = []
  
  for (const node of children) {
    if (node.tag?.match(/^h[1-6]$/)) {
      const text = node.children?.[0]?.value || ''
      if (text.includes('✅') || text.includes('Ako zistíte') || text.includes('How to Know')) {
        inVerificationSection = true
        continue
      } else if (inVerificationSection) {
        break
      }
    }
    
    if (inVerificationSection && (node.tag === 'ul' || node.tag === 'ol')) {
      const liItems = node.children
        ?.filter(li => li.tag === 'li')
        .map(li => {
          return li.children?.map(c => {
            if (c.type === 'text') return c.value
            if (c.tag === 'strong' || c.tag === 'em' || c.tag === 'code') {
              return c.children?.[0]?.value || ''
            }
            return ''
          }).join('') || ''
        }) || []
      items = [...items, ...liItems]
    }
  }
  
  return items.filter(i => i.trim().length > 0)
})

const completion = computed(() => {
  return getCompletionPercentage(extractedChecklistItems.value.length)
})

const loadGuide = async () => {
  pending.value = true
  guide.value = await fetchGuide(props.path)
  pending.value = false
  
  if (guide.value) {
    startTimer()
  }
}

const startTimer = () => {
  if (timer.value) clearInterval(timer.value)
  openTime.value = 0
  timer.value = setInterval(() => {
    openTime.value += 1
    if (openTime.value >= 10) {
      addLastUsed(props.path, guide.value?.title || props.path)
      clearInterval(timer.value)
    }
  }, 1000)
}

const toggleBookmarkStatus = () => {
  toggleBookmark(props.path)
}

const close = () => {
  isOpen.value = false
  clearInterval(timer.value)
  emit('close')
}

watch(() => props.path, loadGuide, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
})
</script>

<style scoped>
.prose :deep(blockquote) {
  @apply border-l-4 border-brand-primary bg-red-50 py-5 px-8 rounded-2xl font-medium text-brand-dark my-10 relative shadow-sm border-y border-r border-red-100;
}

.prose :deep(blockquote::before) {
  content: "Prompt";
  @apply absolute -top-3 left-6 bg-brand-primary text-white text-[11px] uppercase font-black px-2.5 py-1 rounded-full tracking-widest shadow-md shadow-red-200;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-200 rounded-full border-4 border-white;
}

/* Style to hide the original checklist in markdown if needed, but let's keep it for now as we don't have a reliable way to hide just that one UL */
</style>
