import { ref } from 'vue'
import { Index } from 'flexsearch'
import { cheatsheetPrompts } from '~/data/cheatsheetPrompts'

// A search hit can be either a content guide (opens the LearningCard modal
// on /) or a cheatsheet prompt (opens /cheatsheet?focus=<id>). The header
// dropdown branches on `kind` to choose the right route.
export interface SearchHit {
  kind: 'guide' | 'prompt'
  path: string          // routing target — guide path for guides, prompt id for prompts
  title: string
  description?: string
}

export const useSearch = () => {
  const index = new Index({
    tokenize: 'forward',
    cache: true,
  })

  const results = ref<SearchHit[]>([])
  const isReady = ref(false)
  const corpus = ref<SearchHit[]>([])

  const initIndex = async () => {
    const { data } = await useSlovakContent()

    const guideHits: SearchHit[] = []
    if (data.value) {
      for (const guide of data.value) {
        guideHits.push({
          kind: 'guide',
          path: guide.path,
          title: guide.title || guide.path,
          description: guide.description
        })
      }
    }

    const promptHits: SearchHit[] = cheatsheetPrompts.map(p => ({
      kind: 'prompt',
      path: p.id,
      title: `${p.title} — ťahák`,
      description: p.description
    }))

    corpus.value = [...guideHits, ...promptHits]

    corpus.value.forEach((hit, i) => {
      const guideBody = (data.value || [])[i]?.body?.toString?.() ?? ''
      const promptBody = i >= guideHits.length
        ? `${cheatsheetPrompts[i - guideHits.length].prompt} ${cheatsheetPrompts[i - guideHits.length].category}`
        : ''
      const content = `${hit.title} ${hit.description || ''} ${guideBody} ${promptBody}`
      index.add(i, content)
    })

    isReady.value = true
  }

  const search = (query: string) => {
    if (!query || !isReady.value) {
      results.value = []
      return
    }

    const searchResults = index.search(query, { limit: 10, suggest: true })
    results.value = searchResults
      .map(id => corpus.value[id as number])
      .filter(Boolean)
  }

  return {
    results,
    isReady,
    initIndex,
    search
  }
}
