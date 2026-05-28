import { reactive } from 'vue'

interface Entry {
  checklist: Record<number, boolean>
  total: number
}

// Module-scoped reactive map so every consumer reads/writes the same state.
const store = reactive<Record<string, Entry>>({})

const ensure = (path: string): Entry => {
  if (store[path]) return store[path]
  const entry: Entry = { checklist: {}, total: 0 }
  if (typeof window !== 'undefined') {
    const savedChecklist = localStorage.getItem(`progress-${path}`)
    if (savedChecklist) {
      try { entry.checklist = JSON.parse(savedChecklist) } catch { /* ignore */ }
    }
    const savedTotal = localStorage.getItem(`progress-total-${path}`)
    if (savedTotal) {
      const n = parseInt(savedTotal, 10)
      if (!Number.isNaN(n)) entry.total = n
    }
  }
  store[path] = entry
  return entry
}

const persistChecklist = (path: string, checklist: Record<number, boolean>) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(`progress-${path}`, JSON.stringify(checklist))
}

const persistTotal = (path: string, total: number) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(`progress-total-${path}`, String(total))
}

export const useProgressStore = () => {
  const getEntry = (path: string) => ensure(path)

  const setChecklistItem = (path: string, index: number, value: boolean) => {
    const entry = ensure(path)
    entry.checklist[index] = value
    persistChecklist(path, entry.checklist)
  }

  const toggleChecklistItem = (path: string) => (index: number) => {
    const entry = ensure(path)
    entry.checklist[index] = !entry.checklist[index]
    persistChecklist(path, entry.checklist)
  }

  const setTotal = (path: string, total: number) => {
    const entry = ensure(path)
    if (entry.total === total) return
    entry.total = total
    persistTotal(path, total)
  }

  const getPercent = (path: string): number => {
    const entry = ensure(path)
    if (!entry.total) return 0
    const done = Object.values(entry.checklist).filter(Boolean).length
    return Math.min(100, Math.round((done / entry.total) * 100))
  }

  return { getEntry, setChecklistItem, toggleChecklistItem, setTotal, getPercent }
}
