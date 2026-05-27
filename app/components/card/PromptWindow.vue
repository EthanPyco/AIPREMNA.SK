<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  text: string
  heading?: string | null
  index?: number
  slug?: string
  guideTitle?: string | null
}>()

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

const bookmarks = useBookmarks()
const isPromptBookmarked = computed(() =>
  !!props.slug && typeof props.index === 'number'
    ? bookmarks.isPromptBookmarked(props.slug, props.index)
    : false,
)

function togglePromptBookmark() {
  if (!props.slug || typeof props.index !== 'number') return
  bookmarks.togglePrompt({
    slug: props.slug,
    title: props.guideTitle ?? props.slug,
    promptIndex: props.index,
    heading: props.heading ?? null,
    text: props.text,
  })
}

async function copy() {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = props.text
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    copied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (copied.value = false), 1800)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div
    class="my-4 overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.03]"
    data-testid="prompt-window"
  >
    <div class="flex items-center justify-between border-b border-ink/10 bg-ink/[0.05] px-4 py-2">
      <span class="text-xs font-medium uppercase tracking-wide text-ink/60">
        {{ heading ?? 'Prompt' }}
      </span>
      <div class="flex items-center gap-1">
        <button
          v-if="slug !== undefined && index !== undefined"
          type="button"
          class="rounded-md border border-ink/15 bg-white px-2 py-1 text-xs text-ink hover:border-primary hover:text-primary"
          data-testid="prompt-bookmark"
          :data-state="isPromptBookmarked ? 'on' : 'off'"
          :aria-label="isPromptBookmarked ? 'Odstrániť z uložených' : 'Uložiť prompt'"
          @click="togglePromptBookmark"
        >
          <Icon
            :name="isPromptBookmarked ? 'lucide:bookmark-check' : 'lucide:bookmark'"
            class="h-3.5 w-3.5"
          />
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-md border border-ink/15 bg-white px-2.5 py-1 text-xs font-medium text-ink hover:border-primary hover:text-primary"
          data-testid="prompt-copy"
          :data-state="copied ? 'copied' : 'idle'"
          @click="copy"
        >
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="h-3.5 w-3.5" />
          <span>{{ copied ? 'Skopírované' : 'Kopírovať' }}</span>
        </button>
      </div>
    </div>
    <pre
      class="whitespace-pre-wrap px-4 py-3 font-mono text-sm leading-relaxed text-ink"
      data-testid="prompt-text"
    >{{ text }}</pre>
  </div>
</template>
