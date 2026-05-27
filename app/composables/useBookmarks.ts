import { computed, watch } from 'vue'

export interface CardBookmark {
  slug: string
  title: string
  category: string | null
  tier: string
  savedAt: number
}

export interface PromptBookmark {
  id: string
  slug: string
  title: string
  promptIndex: number
  heading: string | null
  text: string
  savedAt: number
}

interface BookmarksStore {
  cards: CardBookmark[]
  prompts: PromptBookmark[]
}

const STORAGE_KEY = 'aipremna:bookmarks'

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

function promptKey(slug: string, index: number): string {
  return `${slug}#${index}`
}

export const useBookmarks = () => {
  const store = useState<BookmarksStore>('aipremna-bookmarks', () => ({ cards: [], prompts: [] }))
  const hydrated = useState<boolean>('aipremna-bookmarks-hydrated', () => false)

  if (import.meta.client && !hydrated.value) {
    store.value = readJson<BookmarksStore>(STORAGE_KEY, { cards: [], prompts: [] })
    hydrated.value = true
    watch(store, (next) => writeJson(STORAGE_KEY, next), { deep: true })
  }

  function isCardBookmarked(slug: string): boolean {
    return store.value.cards.some((c) => c.slug === slug)
  }

  function toggleCard(input: Omit<CardBookmark, 'savedAt'>) {
    const exists = isCardBookmarked(input.slug)
    if (exists) {
      store.value = {
        ...store.value,
        cards: store.value.cards.filter((c) => c.slug !== input.slug),
      }
    } else {
      store.value = {
        ...store.value,
        cards: [{ ...input, savedAt: Date.now() }, ...store.value.cards],
      }
    }
  }

  function isPromptBookmarked(slug: string, promptIndex: number): boolean {
    const key = promptKey(slug, promptIndex)
    return store.value.prompts.some((p) => p.id === key)
  }

  function togglePrompt(input: Omit<PromptBookmark, 'savedAt' | 'id'>) {
    const key = promptKey(input.slug, input.promptIndex)
    const exists = isPromptBookmarked(input.slug, input.promptIndex)
    if (exists) {
      store.value = {
        ...store.value,
        prompts: store.value.prompts.filter((p) => p.id !== key),
      }
    } else {
      store.value = {
        ...store.value,
        prompts: [{ ...input, id: key, savedAt: Date.now() }, ...store.value.prompts],
      }
    }
  }

  function removeCard(slug: string) {
    store.value = { ...store.value, cards: store.value.cards.filter((c) => c.slug !== slug) }
  }

  function removePrompt(id: string) {
    store.value = { ...store.value, prompts: store.value.prompts.filter((p) => p.id !== id) }
  }

  const sortedCards = computed(() => [...store.value.cards].sort((a, b) => b.savedAt - a.savedAt))
  const sortedPrompts = computed(() => [...store.value.prompts].sort((a, b) => b.savedAt - a.savedAt))
  const totalCount = computed(() => store.value.cards.length + store.value.prompts.length)

  return {
    store,
    isCardBookmarked,
    toggleCard,
    isPromptBookmarked,
    togglePrompt,
    removeCard,
    removePrompt,
    sortedCards,
    sortedPrompts,
    totalCount,
  }
}
