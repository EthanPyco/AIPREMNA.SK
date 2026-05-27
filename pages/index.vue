<template>
  <NuxtLayout>
    <div class="h-[calc(100vh-64px)] w-full overflow-hidden relative">
      <RoadmapTreeRoadmap @node-click="handleNodeClick" />
      
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
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeCardPath = ref(null)

const handleNodeClick = (node) => {
  if (node.data?.path) {
    router.push({ query: { ...route.query, card: node.data.path } })
  }
}

const handleCardClose = () => {
  const query = { ...route.query }
  delete query.card
  router.push({ query })
}

watch(() => route.query.card, (newCard) => {
  activeCardPath.value = newCard
}, { immediate: true })
</script>
