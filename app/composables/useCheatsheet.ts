import { computed, type Ref } from 'vue'
import type { GlossaryTerm } from '~~/shared/parser/extractGlossary'

export interface CheatsheetPrompt {
  id: string
  slug: string
  guideTitle: string
  category: string | null
  tier: string
  heading: string | null
  text: string
}

export interface CheatsheetData {
  prompts: CheatsheetPrompt[]
  glossary: GlossaryTerm[]
}

type LocaleInput = 'sk' | 'en' | Ref<'sk' | 'en'> | (() => 'sk' | 'en')

function readLocale(input: LocaleInput): 'sk' | 'en' {
  if (typeof input === 'string') return input
  if (typeof input === 'function') return input()
  return input.value
}

export const useCheatsheet = (localeInput: LocaleInput = 'sk') => {
  const localeFn = () => readLocale(localeInput)
  return useFetch<CheatsheetData>(() => `/api/cheatsheet?locale=${localeFn()}`, {
    key: () => `cheatsheet:${localeFn()}`,
    default: () => ({ prompts: [], glossary: [] }),
  })
}
