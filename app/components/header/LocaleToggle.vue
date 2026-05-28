<script setup lang="ts">
const { locale, setLocale } = useLocale()

const items: { id: 'sk' | 'en'; label: string }[] = [
  { id: 'sk', label: 'SK' },
  { id: 'en', label: 'EN' },
]

function onClick(id: 'sk' | 'en') {
  setLocale(id)
}
</script>

<template>
  <div
    class="inline-flex overflow-hidden rounded-full border border-ink/10 bg-white p-0.5 text-xs shadow-sm"
    data-testid="locale-toggle"
  >
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="rounded-full px-3 py-1 font-heading uppercase tracking-wide transition-colors"
      :class="
        locale === item.id
          ? 'bg-primary text-white'
          : 'text-ink/60 hover:text-ink'
      "
      :data-testid="`locale-toggle-${item.id}`"
      :data-active="locale === item.id"
      @click="onClick(item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
