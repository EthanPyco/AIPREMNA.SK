import { computed, watch } from 'vue'

type ProgressMap = Record<string, Record<string, boolean>>
type SeenMap = Record<string, number>

const STORAGE_KEY_PROGRESS = 'aipremna:progress'
const STORAGE_KEY_SEEN = 'aipremna:seen'

export interface ProgressSummary {
  checked: number
  total: number
  percent: number
  completed: boolean
}

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
    /* ignore quota errors */
  }
}

export const useProgress = () => {
  const progress = useState<ProgressMap>('aipremna-progress', () => ({}))
  const seen = useState<SeenMap>('aipremna-seen', () => ({}))
  const hydrated = useState<boolean>('aipremna-progress-hydrated', () => false)

  if (import.meta.client && !hydrated.value) {
    progress.value = readJson<ProgressMap>(STORAGE_KEY_PROGRESS, {})
    seen.value = readJson<SeenMap>(STORAGE_KEY_SEEN, {})
    hydrated.value = true

    watch(progress, (next) => writeJson(STORAGE_KEY_PROGRESS, next), { deep: true })
    watch(seen, (next) => writeJson(STORAGE_KEY_SEEN, next), { deep: true })
  }

  function ensureSlug(slug: string): Record<string, boolean> {
    return progress.value[slug] ?? {}
  }

  function isChecked(slug: string, itemId: string): boolean {
    return !!ensureSlug(slug)[itemId]
  }

  function setChecked(slug: string, itemId: string, value: boolean) {
    const next = { ...ensureSlug(slug) }
    if (value) next[itemId] = true
    else delete next[itemId]
    progress.value = { ...progress.value, [slug]: next }
  }

  function toggle(slug: string, itemId: string) {
    setChecked(slug, itemId, !isChecked(slug, itemId))
  }

  function reset(slug: string) {
    const next = { ...progress.value }
    delete next[slug]
    progress.value = next
  }

  function summary(slug: string, totalItems: number): ProgressSummary {
    const map = ensureSlug(slug)
    const checked = Object.values(map).filter(Boolean).length
    const percent = totalItems === 0 ? 0 : Math.round((checked / totalItems) * 100)
    return { checked, total: totalItems, percent, completed: totalItems > 0 && checked === totalItems }
  }

  function summaryRef(slugFn: () => string, totalFn: () => number) {
    return computed<ProgressSummary>(() => summary(slugFn(), totalFn()))
  }

  function markSeen(slug: string) {
    if (!slug) return
    seen.value = { ...seen.value, [slug]: Date.now() }
  }

  function wasSeen(slug: string): boolean {
    return slug in seen.value
  }

  const completedSlugs = computed<Set<string>>(() => {
    const set = new Set<string>()
    for (const [slug, items] of Object.entries(progress.value)) {
      const total = Object.keys(items).length
      const checked = Object.values(items).filter(Boolean).length
      if (total > 0 && checked === total) set.add(slug)
    }
    return set
  })

  return {
    progress,
    seen,
    isChecked,
    setChecked,
    toggle,
    reset,
    summary,
    summaryRef,
    markSeen,
    wasSeen,
    completedSlugs,
  }
}
