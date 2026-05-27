<script setup lang="ts">
const { locale, setLocale } = useLocale()

const locales: { id: 'sk' | 'en'; label: string }[] = [
  { id: 'sk', label: 'SK' },
  { id: 'en', label: 'EN' },
]

function onClick(id: 'sk' | 'en') {
  setLocale(id)
}
</script>

<template>
  <div
    class="inline-flex overflow-hidden rounded-md border border-ink/15 bg-white text-xs"
    data-testid="locale-toggle"
  >
    <button
      v-for="l in locales"
      :key="l.id"
      type="button"
      class="px-2 py-1 transition-colors"
      :class="
        locale === l.id
          ? 'bg-primary text-white'
          : 'text-ink/70 hover:bg-ink/[0.04] hover:text-ink'
      "
      :data-testid="`locale-toggle-${l.id}`"
      :data-active="locale === l.id"
      @click="onClick(l.id)"
    >
      {{ l.label }}
    </button>
  </div>
</template>
