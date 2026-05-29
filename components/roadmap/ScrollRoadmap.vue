<template>
  <div class="relative min-h-screen py-20 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
    <!-- Progress Line Background -->
    <div class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 hidden md:block"></div>
    
    <!-- Tier 1: Základy -->
    <div class="relative mb-40">
      <div class="flex flex-col items-center mb-16 animate-in slide-in-from-top duration-700">
        <div class="w-20 h-20 bg-brand-primary text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-primary/40 mb-6 group hover:scale-110 transition-transform cursor-default">
          <BookOpenIcon class="w-10 h-10" />
        </div>
        <h2 class="text-3xl md:text-5xl font-heading font-bold text-center tracking-tighter text-brand-dark">Základy a Príprava</h2>
        <p class="text-gray-600 mt-4 text-center max-w-md font-medium">Všetko, čo potrebujete vedieť pred prvým promptom.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="guide in tier1" 
          :key="guide.path"
          class="roadmap-node group"
          @click="$emit('node-click', guide)"
        >
          <div class="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-50 relative overflow-hidden h-full flex flex-col">
            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
              <ChevronRightIcon class="w-6 h-6 text-brand-primary" />
            </div>
            <h3 class="font-heading font-bold text-sm uppercase tracking-tight mb-4 text-brand-dark group-hover:text-brand-primary transition-colors">{{ guide.title }}</h3>
            <p class="text-gray-600 text-xs leading-relaxed italic line-clamp-3 mb-6 flex-1">{{ guide.description }}</p>
            <div class="flex items-center gap-2 mt-auto">
              <div class="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-brand-primary transition-all duration-500" :style="{ width: `${getProgress(guide.path)}%` }"></div>
              </div>
              <span class="text-[10px] font-black font-heading text-brand-primary">{{ getProgress(guide.path) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tier 2: Prípady použitia -->
    <div class="relative mb-40 pt-20 border-t border-dashed border-gray-200">
      <div class="flex flex-col items-center mb-16">
        <div class="w-20 h-20 bg-brand-secondary text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-secondary/40 mb-6 group hover:scale-110 transition-transform cursor-default">
          <ZapIcon class="w-10 h-10" />
        </div>
        <h2 class="text-3xl md:text-5xl font-heading font-bold text-center tracking-tighter text-brand-dark">Prípady použitia</h2>
        <p class="text-gray-600 mt-4 text-center max-w-md font-medium">Praktické scenáre pre vašu každodennú prácu.</p>
      </div>

      <div v-for="(items, category) in tier2Grouped" :key="category" class="mb-20 last:mb-0">
        <h4 class="font-heading font-black text-[11px] uppercase tracking-[0.3em] text-gray-600 mb-8 flex items-center gap-4">
          <span>{{ category.replace(/_/g, ' ') }}</span>
          <div class="h-px flex-1 bg-gray-100"></div>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="guide in items" 
            :key="guide.path"
            class="roadmap-node group"
            @click="$emit('node-click', guide)"
          >
            <div class="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-50 h-full flex flex-col">
              <h3 class="font-heading font-bold text-xs uppercase tracking-tight mb-3 text-brand-dark group-hover:text-brand-secondary transition-colors">{{ guide.title }}</h3>
              <div class="flex items-center gap-2 mt-auto">
                <div class="h-1 bg-gray-100 flex-1 rounded-full overflow-hidden">
                  <div class="h-full bg-brand-secondary transition-all" :style="{ width: `${getProgress(guide.path)}%` }"></div>
                </div>
                <span class="text-[9px] font-bold text-brand-secondary">{{ getProgress(guide.path) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tier 3: Nástroje -->
    <div class="relative pt-20 border-t border-dashed border-gray-200">
      <div class="flex flex-col items-center mb-16">
        <div class="w-20 h-20 bg-brand-accent text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-accent/40 mb-6 group hover:scale-110 transition-transform cursor-default">
          <CpuIcon class="w-10 h-10" />
        </div>
        <h2 class="text-3xl md:text-5xl font-heading font-bold text-center tracking-tighter text-brand-dark">Konkrétne nástroje</h2>
        <p class="text-gray-600 mt-4 text-center max-w-md font-medium">Hĺbkové pohľady na najlepšie AI aplikácie.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div 
          v-for="guide in tier3" 
          :key="guide.path"
          class="group cursor-pointer"
          @click="$emit('node-click', guide)"
        >
          <div class="bg-white aspect-square flex flex-col items-center justify-center p-4 rounded-[2rem] shadow-sm hover:shadow-lg transition-all border border-gray-50 text-center group-hover:border-brand-accent/50">
            <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-brand-accent/10 transition-colors">
              <component :is="getToolIcon(guide.path)" class="w-5 h-5 text-gray-400 group-hover:text-brand-accent" />
            </div>
            <span class="font-heading font-bold text-[9px] uppercase tracking-tighter text-brand-dark leading-tight">{{ guide.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  BookOpen as BookOpenIcon, 
  Zap as ZapIcon, 
  Cpu as CpuIcon, 
  ChevronRight as ChevronRightIcon,
  Layout as LayoutIcon
} from '@lucide/vue'

// Tool Logos from unplugin-icons
import LogosOpenaiIcon from '~icons/logos/openai-icon'
import LogosClaudeIcon from '~icons/logos/claude-icon'
import LogosMicrosoftIcon from '~icons/logos/microsoft-icon'
import SimpleIconsDeepseek from '~icons/simple-icons/deepseek'
import LogosGoogleGemini from '~icons/logos/google-gemini'
import SimpleIconsX from '~icons/simple-icons/x'
import SimpleIconsCanva from '~icons/simple-icons/canva'
import LogosGoogleIcon from '~icons/logos/google-icon'

const getToolIcon = (path) => {
  const p = path.toLowerCase()
  if (p.includes('chatgpt')) return LogosOpenaiIcon
  if (p.includes('claude')) return LogosClaudeIcon
  if (p.includes('copilot')) return LogosMicrosoftIcon
  if (p.includes('deepseek')) return SimpleIconsDeepseek
  if (p.includes('gemini')) return LogosGoogleGemini
  if (p.includes('grok')) return SimpleIconsX
  if (p.includes('canva')) return SimpleIconsCanva
  if (p.includes('notebook_lm')) return LogosGoogleIcon
  if (p.includes('nano_banana')) return LogosGoogleIcon
  return LayoutIcon
}

const emit = defineEmits(['node-click'])

const { data: slovakContent } = await useSlovakContent()

const tier1 = computed(() => (slovakContent.value || []).filter(f => f.path.startsWith('/initial_info/')))
const tier2 = computed(() => (slovakContent.value || []).filter(f => f.path.startsWith('/jednotlive_usecases/')))
const tier3 = computed(() => (slovakContent.value || []).filter(f => f.path.startsWith('/jednotlive_tools/')))

const tier2Grouped = computed(() => {
  const groups = {}
  tier2.value.forEach(item => {
    const cat = item.path.split('/')[2] || 'Všeobecné'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(item)
  })
  return groups
})

const progressStore = useProgressStore()
// Touching `getEntry` here makes the template binding depend on the reactive
// store, so the homepage % updates instantly when LearningCard toggles a box.
const getProgress = (path) => {
  progressStore.getEntry(path)
  return progressStore.getPercent(path)
}
</script>

<style scoped>
.roadmap-node {
  @apply cursor-pointer;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.roadmap-node {
  animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

/* Stagger animation for nodes if possible */
</style>
