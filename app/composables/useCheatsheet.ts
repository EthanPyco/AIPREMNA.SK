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

export const useCheatsheet = (locale: 'sk' | 'en' = 'sk') => {
  return useFetch<CheatsheetData>(`/api/cheatsheet?locale=${locale}`, {
    key: `cheatsheet:${locale}`,
    default: () => ({ prompts: [], glossary: [] }),
  })
}
