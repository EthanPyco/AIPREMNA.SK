import { ref, watch, computed, type Ref } from 'vue'

export interface SearchDoc {
  slug: string
  title: string
  excerpt: string
  body: string
  tier: string
  category: string | null
}

export interface SearchHit {
  slug: string
  title: string
  excerpt: string
  tier: string
  category: string | null
}

interface IndexBundle {
  index: any
  docs: SearchDoc[]
}

const indexByLocale = new Map<'sk' | 'en', Promise<IndexBundle>>()

async function loadIndex(locale: 'sk' | 'en'): Promise<IndexBundle> {
  if (indexByLocale.has(locale)) return indexByLocale.get(locale)!

  const promise = (async () => {
    const [{ Index }, docs] = await Promise.all([
      import('flexsearch'),
      $fetch<SearchDoc[]>(`/api/search-index?locale=${locale}`),
    ])
    const index = new Index({ tokenize: 'forward', cache: true })
    docs.forEach((doc, i) => {
      index.add(i, `${doc.title}\n${doc.body}`)
    })
    return { index, docs }
  })()

  indexByLocale.set(locale, promise)
  return promise
}

function highlight(text: string, query: string): string {
  if (!query.trim()) return text
  const safe = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (safe.length === 0) return text
  const re = new RegExp(`(${safe.join('|')})`, 'gi')
  return text.replace(re, '<mark>$1</mark>')
}

type LocaleInput = 'sk' | 'en' | Ref<'sk' | 'en'> | (() => 'sk' | 'en')

function readLocale(input: LocaleInput): 'sk' | 'en' {
  if (typeof input === 'string') return input
  if (typeof input === 'function') return input()
  return input.value
}

export const useSearch = (localeInput: LocaleInput = 'sk') => {
  const query = ref('')
  const results = ref<SearchHit[]>([])
  const loading = ref(false)
  const ready = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const currentLocale = computed<'sk' | 'en'>(() => readLocale(localeInput))

  async function runSearch(q: string) {
    if (!q.trim()) {
      results.value = []
      return
    }
    loading.value = true
    try {
      const { index, docs } = await loadIndex(currentLocale.value)
      ready.value = true
      const hits = await index.search(q, { limit: 8 })
      results.value = (hits as number[]).map((i) => {
        const d = docs[i]
        return {
          slug: d.slug,
          title: highlight(d.title, q),
          excerpt: highlight(d.excerpt, q),
          tier: d.tier,
          category: d.category,
        }
      })
    } finally {
      loading.value = false
    }
  }

  watch([query, currentLocale], ([q]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      runSearch(q).catch(() => {})
    }, 250)
  })

  async function prefetch() {
    await loadIndex(currentLocale.value)
    ready.value = true
  }

  return { query, results, loading, ready, prefetch }
}
