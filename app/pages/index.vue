<script setup lang="ts">
const { data } = await useRoadmapGraph('sk')

function onSelectLeaf(slug: string) {
  // Wired in slice 3 (Learning Card modal)
  console.log('leaf selected:', slug)
}
</script>

<template>
  <div>
    <section class="border-b border-ink/10 bg-bg/60 px-6 py-6">
      <div class="mx-auto max-w-7xl">
        <h1 class="font-heading text-3xl text-ink" data-testid="page-title">
          Vzdelávacia roadmapa AI
        </h1>
        <p class="mt-2 max-w-2xl text-sm text-ink/70">
          Tri úrovne: základy a etika → konkrétne prípady použitia → osvedčené nástroje.
          Klikni na uzol a otvor sa návod.
        </p>
      </div>
    </section>

    <RoadmapTree
      v-if="data?.positioned"
      :graph="data.positioned"
      @select-leaf="onSelectLeaf"
    />
  </div>
</template>
