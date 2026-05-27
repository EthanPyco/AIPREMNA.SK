<script setup lang="ts">
import { computed, markRaw } from 'vue'
import { VueFlow, type Node, type Edge, type NodeMouseEvent } from '@vue-flow/core'
import type { PositionedGraph } from '~~/shared/tree/layoutGraph'
import RootNodeImpl from './RootNode.vue'
import TierNodeImpl from './TierNode.vue'
import CategoryNodeImpl from './CategoryNode.vue'
import LeafNodeImpl from './LeafNode.vue'

const props = defineProps<{
  graph: PositionedGraph
}>()

const emit = defineEmits<{
  (e: 'select-leaf', slug: string): void
}>()

const nodeTypes = markRaw({
  root: RootNodeImpl,
  tier: TierNodeImpl,
  category: CategoryNodeImpl,
  leaf: LeafNodeImpl,
})

const flowNodes = computed<Node[]>(() =>
  props.graph.nodes.map((n) => ({
    id: n.id,
    type: n.kind,
    position: n.position,
    data: {
      label: n.label,
      tier: n.tier,
      category: n.category,
      slug: n.slug,
    },
    selectable: n.kind === 'leaf',
    draggable: false,
    connectable: false,
  })),
)

const flowEdges = computed<Edge[]>(() =>
  props.graph.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#7dbcf9', strokeWidth: 1.5 },
  })),
)

function onNodeClick({ node }: NodeMouseEvent) {
  if (node.type === 'leaf' && node.data?.slug) {
    emit('select-leaf', node.data.slug as string)
  }
}
</script>

<template>
  <div
    class="h-[calc(100vh-4rem)] w-full"
    data-testid="roadmap-tree"
  >
    <ClientOnly>
      <VueFlow
        :nodes="flowNodes"
        :edges="flowEdges"
        :node-types="nodeTypes"
        :fit-view-on-init="true"
        :min-zoom="0.4"
        :max-zoom="1.5"
        :default-edge-options="{ type: 'smoothstep' }"
        :nodes-draggable="false"
        :nodes-connectable="false"
        @node-click="onNodeClick"
      />

      <template #fallback>
        <div class="grid h-full place-items-center text-ink/60">
          Načítavam roadmapu…
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style>
.vue-flow__node {
  @apply font-body;
}
</style>
