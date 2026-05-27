<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-brand-dark/20 backdrop-blur-md" @click="close"></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white w-full max-w-6xl max-h-full flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 md:p-10 border-b border-gray-50 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl md:text-3xl font-heading font-bold tracking-tight text-brand-dark truncate leading-tight">{{ guide?.title }}</h2>
          <div v-if="guide?.description" class="text-sm text-gray-400 mt-2 font-medium italic line-clamp-1">
            {{ guide.description }}
          </div>
        </div>
        
        <div class="flex items-center gap-3 ml-6">
          <button 
            @click="toggleBookmarkStatus"
            class="p-3 rounded-2xl hover:bg-brand-background transition-all"
            :class="isBookmarked(path) ? 'text-brand-primary bg-brand-primary/10' : 'text-gray-300'"
            title="Uložiť do záložiek"
          >
            <BookmarkIcon class="w-6 h-6" :fill="isBookmarked(path) ? 'currentColor' : 'none'" />
          </button>
          <button @click="close" class="p-3 rounded-2xl hover:bg-red-50 transition-all text-gray-300 hover:text-red-400">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div class="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div v-if="pending" class="flex items-center justify-center py-32">
          <div class="w-12 h-12 border-4 border-brand-accent border-t-brand-primary rounded-full animate-spin"></div>
        </div>
        <div v-else-if="guide" class="flex flex-col lg:flex-row min-h-full">
          <!-- Main Content -->
          <div class="flex-1 p-8 md:p-14 prose prose-brand prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-heading prose-headings:tracking-tight prose-blockquote:border-brand-primary prose-blockquote:bg-brand-background/50 prose-blockquote:rounded-3xl prose-blockquote:border-l-8">
            <ContentRenderer :value="guide" />
            
            <!-- In-content Checklist (Visible on mobile) -->
            <div v-if="extractedChecklistItems.length > 0" class="mt-16 lg:hidden pt-10 border-t border-gray-100">
              <h3 class="flex items-center gap-3 text-xl font-heading font-bold text-brand-dark mb-8">
                <CheckCircleIcon class="w-7 h-7 text-emerald-500" />
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
          <div class="hidden lg:block w-96 p-10 border-l border-gray-50 bg-brand-background/30">
            <GuideProgressTracker 
              :items="extractedChecklistItems"
              :checklist="checklist"
              :progress="completion"
              @toggle="toggleItem"
            />
            
            <!-- External Links -->
            <div v-if="guide.externalLinks && guide.externalLinks.length > 0" class="mt-12 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
              <h3 class="font-heading font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <ExternalLinkIcon class="w-4 h-4" />
                <span>Užitočné odkazy</span>
              </h3>
              <ul class="space-y-4">
                <li v-for="link in guide.externalLinks" :key="link">
                  <a 
                    :href="link" 
                    target="_blank" 
                    class="text-sm text-brand-secondary hover:text-brand-primary transition-colors line-clamp-1 flex items-center gap-2 font-bold group"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-brand-primary transition-colors"></div>
                    {{ link }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-32">
          <p class="text-gray-400 font-medium font-heading italic text-lg uppercase tracking-tighter">Návod sa nepodarilo načítať.</p>
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
  @apply py-8 px-10 font-medium text-brand-dark my-12 relative shadow-xl shadow-brand-primary/5 border-brand-accent/20;
}

.prose :deep(blockquote::before) {
  content: "PROMPT PRE AI";
  @apply absolute -top-4 left-8 bg-brand-primary text-white text-[10px] uppercase font-heading font-black px-4 py-2 rounded-full tracking-[0.2em] shadow-lg shadow-brand-primary/30;
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
