<template>
  <NuxtLayout>
    <div class="max-w-6xl mx-auto p-6 md:p-10">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-brand-secondary/10 rounded-2xl text-brand-secondary">
            <HistoryIcon class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-brand-dark">Naposledy otvorené</h1>
            <p class="text-gray-500">Pokračujte presne tam, kde ste skončili.</p>
          </div>
        </div>
        <button 
          v-if="items.length > 0"
          @click="clearLastUsed"
          class="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
        >
          Vymazať históriu
        </button>
      </div>

      <div v-if="items.length > 0" class="space-y-4">
        <div 
          v-for="item in items" 
          :key="item.path"
          class="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
          @click="openCard(item.path)"
        >
          <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary/10 transition-colors">
            <FileTextIcon class="w-6 h-6" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-lg text-brand-dark truncate">{{ item.title }}</h3>
            <p class="text-sm text-gray-400">{{ formatDate(item.timestamp) }}</p>
          </div>
          <ChevronRightIcon class="w-5 h-5 text-gray-300 group-hover:text-brand-secondary transition-colors" />
        </div>
      </div>

      <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <HistoryIcon class="w-10 h-10" />
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Vaša história je prázdna</h2>
        <p class="text-gray-500 mb-6">Tu sa zobrazia návody, ktoré si otvoríte na viac ako 10 sekúnd.</p>
        <NuxtLink to="/" class="px-6 py-2.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
          Začať objavovať
        </NuxtLink>
      </div>

      <!-- Modal overlay if opened from here -->
      <GuideLearningCard 
        v-if="activeCardPath" 
        :path="activeCardPath" 
        @close="handleCardClose" 
      />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { History as HistoryIcon, FileText as FileTextIcon, ChevronRight as ChevronRightIcon } from '@lucide/vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { items, clearLastUsed } = useLastUsed()

const activeCardPath = ref(null)

const openCard = (path) => {
  router.push({ query: { card: path } })
}

const handleCardClose = () => {
  const query = { ...route.query }
  delete query.card
  router.push({ query })
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
  
  if (diffInMinutes < 1) return 'Práve teraz'
  if (diffInMinutes < 60) return `Pred ${diffInMinutes} minútami`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `Pred ${diffInHours} hodinami`
  
  return date.toLocaleDateString('sk-SK')
}

watch(() => route.query.card, (newCard) => {
  activeCardPath.value = newCard
}, { immediate: true })
</script>
