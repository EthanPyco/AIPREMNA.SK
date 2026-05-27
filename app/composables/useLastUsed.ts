import { computed, watch } from 'vue'

export interface LastUsedEntry {
  slug: string
  title: string
  openedAt: number
  durationMs: number
}

const STORAGE_KEY = 'aipremna:lastused'
const MIN_DURATION_MS = 10_000
const MAX_ENTRIES = 20

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

interface OpenSession {
  slug: string
  title: string
  startedAt: number
}

export const useLastUsed = () => {
  const entries = useState<LastUsedEntry[]>('aipremna-lastused', () => [])
  const hydrated = useState<boolean>('aipremna-lastused-hydrated', () => false)
  const session = useState<OpenSession | null>('aipremna-lastused-session', () => null)

  if (import.meta.client && !hydrated.value) {
    entries.value = readJson<LastUsedEntry[]>(STORAGE_KEY, [])
    hydrated.value = true
    watch(entries, (next) => writeJson(STORAGE_KEY, next), { deep: true })
  }

  function startSession(slug: string, title: string) {
    if (!slug) return
    session.value = { slug, title, startedAt: Date.now() }
  }

  function endSession(): LastUsedEntry | null {
    const s = session.value
    session.value = null
    if (!s) return null
    const duration = Date.now() - s.startedAt
    if (duration < MIN_DURATION_MS) return null

    const entry: LastUsedEntry = {
      slug: s.slug,
      title: s.title,
      openedAt: s.startedAt,
      durationMs: duration,
    }

    const deduped = entries.value.filter((e) => e.slug !== s.slug)
    entries.value = [entry, ...deduped].slice(0, MAX_ENTRIES)
    return entry
  }

  function clearAll() {
    entries.value = []
  }

  function remove(slug: string) {
    entries.value = entries.value.filter((e) => e.slug !== slug)
  }

  const sortedEntries = computed(() => [...entries.value].sort((a, b) => b.openedAt - a.openedAt))

  return {
    entries,
    session,
    startSession,
    endSession,
    clearAll,
    remove,
    sortedEntries,
    MIN_DURATION_MS,
    MAX_ENTRIES,
  }
}
