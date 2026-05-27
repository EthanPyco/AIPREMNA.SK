import type { Ref } from 'vue'
import { computed } from 'vue'
import type { ChecklistItem } from '~~/shared/parser/extractChecklist'
import type { ExtractedPrompt } from '~~/shared/parser/extractPrompts'

export interface LoadedGuide {
  slug: string
  locale: 'sk' | 'en'
  usedFallback: boolean
  title: string | null
  goal: string | null
  sections: {
    workflow?: string
    prompts?: string
    humanLoop?: string
    mastery?: string
    optional?: string
  }
  checklist: ChecklistItem[]
  prompts: ExtractedPrompt[]
}

export const useGuide = (
  slug: Ref<string | null>,
  locale?: Ref<'sk' | 'en'> | (() => 'sk' | 'en'),
) => {
  const { locale: localeState } = useLocale()
  const localeFn = locale
    ? (typeof locale === 'function' ? locale : () => locale.value)
    : () => localeState.value

  const url = computed(() => {
    if (!slug.value) return null
    return `/api/guide/${encodeURIComponent(slug.value)}?locale=${localeFn()}`
  })

  return useFetch<LoadedGuide | null>(() => url.value ?? '/api/guide/_noop', {
    key: () => `guide:${slug.value}:${localeFn()}`,
    immediate: !!slug.value,
    watch: [slug, localeState],
    server: true,
    default: () => null,
  })
}
