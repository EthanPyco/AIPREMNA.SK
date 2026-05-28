<script setup lang="ts">
import type { ChecklistItem } from '~~/shared/parser/extractChecklist'

const props = defineProps<{
  slug: string
  items: ChecklistItem[]
}>()

const { t } = useI18n()
const { isChecked, toggle } = useProgress()
</script>

<template>
  <section
    class="my-4 rounded-xl border border-ink/10 bg-white p-5"
    data-testid="card-checklist"
  >
    <h3 class="mb-3 font-heading text-base text-ink">
      {{ t('card.sections.mastery') }}
    </h3>
    <ul class="space-y-2">
      <li v-for="item in items" :key="item.id">
        <button
          type="button"
          class="group flex w-full items-start gap-3 rounded-lg p-2 text-left hover:bg-ink/[0.04]"
          data-testid="checklist-item"
          :data-item-id="item.id"
          :data-checked="isChecked(slug, item.id)"
          @click="toggle(slug, item.id)"
        >
          <span
            class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
            :class="
              isChecked(slug, item.id)
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-ink/30 bg-white text-transparent group-hover:border-primary'
            "
          >
            <Icon name="lucide:check" class="h-3.5 w-3.5" />
          </span>
          <span
            class="text-sm text-ink/85"
            :class="isChecked(slug, item.id) ? 'line-through opacity-60' : ''"
          >
            {{ item.text }}
          </span>
        </button>
      </li>
    </ul>
  </section>
</template>
