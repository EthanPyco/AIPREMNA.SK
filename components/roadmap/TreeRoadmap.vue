<template>
  <ClientOnly>
    <div class="h-full w-full bg-gray-50 relative">
      <VueFlow
        v-model:nodes="nodes"
        v-model:edges="edges"
        :default-viewport="{ zoom: 1.2, x: 0, y: 0 }"
        :min-zoom="0.2"
        :max-zoom="4"
        fit-view-on-init
        class="bg-dots"
        @node-click="$emit('node-click', $event.node)"
      >
        <Background :pattern-color="'#e2e8f0'" :gap="20" />
        <Controls />
      </VueFlow>
      
      <!-- Legend -->
      <div class="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-gray-100 shadow-sm text-sm z-10">
        <h3 class="font-bold mb-2">Legenda</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-brand-primary"></span>
            <span>Základy</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-brand-secondary"></span>
            <span>Prípady použitia</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>Nástroje</span>
          </div>
        </div>
      </div>
    </div>
    <template #fallback>
      <div class="h-full w-full flex items-center justify-center bg-gray-50">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent"></div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

const { getNodesAndEdges } = useRoadmap()

const nodes = ref([])
const edges = ref([])

onMounted(async () => {
  const { nodes: initialNodes, edges: initialEdges } = await getNodesAndEdges()
  nodes.value = initialNodes
  edges.value = initialEdges
})
</script>

<style>
.bg-dots {
  background-image: radial-gradient(#e2e8e0 1px, transparent 0);
  background-size: 20px 20px;
}
</style>
