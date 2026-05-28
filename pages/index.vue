<template>
  <NuxtLayout>
    <div class="w-full bg-brand-background min-h-screen">
      <!-- Hero Section -->
      <section class="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-7xl font-heading font-black tracking-tighter text-brand-dark mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Ušetrite čas s <span class="text-brand-primary italic">AI asistentom</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Interaktívna cesta k umelej inteligencii pre slovenských učiteľov. Objavte, ako vám AI môže pomôcť v triede aj v kabinete.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <button @click="scrollToRoadmap" class="px-8 py-4 bg-brand-dark text-white rounded-2xl font-heading font-bold text-sm tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-dark/20 uppercase">
            Začať objavovať
          </button>
          <NuxtLink to="/cheatsheet" class="px-8 py-4 bg-white text-brand-dark rounded-2xl font-heading font-bold text-sm tracking-widest hover:shadow-lg transition-all border border-gray-100 uppercase">
            Ťahák promptov
          </NuxtLink>
        </div>
      </section>

      <!-- Scroll Roadmap -->
      <div id="roadmap">
        <RoadmapScrollRoadmap @node-click="handleNodeClick" />
      </div>
      
      <!-- Learning Card Modal -->
      <GuideLearningCard 
        v-if="activeCardPath" 
        :path="activeCardPath" 
        @close="handleCardClose" 
      />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeCardPath = ref(route.query.card)

watch(() => route.query.card, (newCard) => {
  activeCardPath.value = newCard
}, { immediate: true })

const handleNodeClick = (node) => {
  if (node.path) {
    router.push({ query: { ...route.query, card: node.path } })
  }
}

const handleCardClose = () => {
  activeCardPath.value = null
  const query = { ...route.query }
  delete query.card
  router.push({ query })
}

const scrollToRoadmap = () => {
  document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
