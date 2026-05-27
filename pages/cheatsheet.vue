<template>
  <NuxtLayout>
    <div class="max-w-6xl mx-auto p-6 md:p-10">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
            <ClipboardListIcon class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-brand-dark">Ťahák promptov</h1>
            <p class="text-gray-500">Rýchle vzorce a tipy pre vaše každodenné úlohy.</p>
          </div>
        </div>
        <button 
          @click="window.print()"
          class="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
        >
          <PrinterIcon class="w-4 h-4" />
          <span>Vytlačiť / PDF</span>
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
        <button 
          @click="activeTab = 'prompts'"
          class="px-6 py-2 rounded-lg text-sm font-bold transition-all"
          :class="activeTab === 'prompts' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        >
          Ťahák
        </button>
        <button 
          @click="activeTab = 'glossary'"
          class="px-6 py-2 rounded-lg text-sm font-bold transition-all"
          :class="activeTab === 'glossary' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        >
          Slovník pojmov
        </button>
      </div>

      <!-- Prompts View -->
      <div v-if="activeTab === 'prompts'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="card in cheatsheetCards" :key="card.title" class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <div class="flex items-center gap-3 mb-4">
            <component :is="card.icon" class="w-6 h-6 text-brand-primary" />
            <h3 class="font-bold text-lg text-brand-dark">{{ card.title }}</h3>
          </div>
          <p class="text-sm text-gray-500 mb-6 flex-1">{{ card.description }}</p>
          
          <div class="bg-gray-50 p-4 rounded-xl relative group">
            <p class="text-xs font-mono text-gray-600 pr-8">{{ card.prompt }}</p>
            <button 
              @click="copy(card.prompt)"
              class="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <CopyIcon v-if="!copied" class="w-3.5 h-3.5 text-gray-400" />
              <CheckIcon v-else class="w-3.5 h-3.5 text-emerald-500" />
            </button>
          </div>
        </div>
      </div>

      <!-- Glossary View -->
      <div v-else-if="activeTab === 'glossary'" class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div v-if="pendingGlossary" class="p-8 space-y-4">
          <div v-for="i in 10" :key="i" class="h-12 bg-gray-50 animate-pulse rounded-xl"></div>
        </div>
        <div v-else-if="glossaryContent" class="p-8 md:p-12 prose prose-brand max-w-none">
          <ContentRenderer :value="glossaryContent" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ClipboardList as ClipboardListIcon, 
  Printer as PrinterIcon, 
  Copy as CopyIcon, 
  Check as CheckIcon,
  Mail as MailIcon,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  PenTool as PenToolIcon,
  Presentation as PresentationIcon,
  MessageSquare as MessageSquareIcon
} from '@lucide/vue'

const activeTab = ref('prompts')
const copied = ref(false)

const copy = (text) => {
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const { data: glossaryContent, pending: pendingGlossary } = await useAsyncData('glossary', () => {
  return queryCollection('content').path('/initial_info/glosar_pojmov').first()
})

const cheatsheetCards = [
  {
    title: 'Príprava e-mailu',
    description: 'Rýchly návrh profesionálneho e-mailu pre rodičov alebo kolegov.',
    icon: MailIcon,
    prompt: 'Vypracuj [Tón] e-mail pre [Príjemca] o [Téma]. Zahrň [Detaily].'
  },
  {
    title: 'Generátor cvičení',
    description: 'Vytvorenie testových otázok alebo cvičení na zadanú tému.',
    icon: GraduationCapIcon,
    prompt: 'Vytvor 5 otázok s výberom z 4 možností na tému [Téma] pre [Ročník]. Uveď kľúč správnych odpovedí.'
  },
  {
    title: 'Zhrnutie učiva',
    description: 'Zjednodušenie komplexného textu pre študentov.',
    icon: BookOpenIcon,
    prompt: 'Zhrň tento text do 5 odrážok tak, aby mu rozumel žiak [Ročník] ročníka: [Text]'
  },
  {
    title: 'Spätná väzba',
    description: 'Konštruktívne slovné hodnotenie práce študenta.',
    icon: MessageSquareIcon,
    prompt: 'Navrhni konštruktívnu spätnú väzbu pre študenta, ktorý [Úspech/Problém]. Zameraj sa na rastové nastavenie.'
  },
  {
    title: 'Príprava prezentácie',
    description: 'Štruktúra a body pre vašu ďalšiu prednášku.',
    icon: PresentationIcon,
    prompt: 'Navrhni štruktúru 10 slidov pre prezentáciu na tému [Téma]. Ku každému slidu uveď hlavné body.'
  },
  {
    title: 'Kreatívne písanie',
    description: 'Námety na slohy alebo tvorivé aktivity.',
    icon: PenToolIcon,
    prompt: 'Vymysli 3 zaujímavé námety na slohové práce pre [Ročník] na tému [Téma].'
  }
]
</script>

<style>
@media print {
  header, nav, .flex.gap-1, button {
    display: none !important;
  }
  .max-w-6xl {
    max-width: 100% !important;
    padding: 0 !important;
  }
  .grid {
    display: block !important;
  }
  .bg-white {
    border: none !important;
    box-shadow: none !important;
    margin-bottom: 2rem;
  }
}
</style>
