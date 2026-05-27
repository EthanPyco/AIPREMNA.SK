import { ref, onMounted } from 'vue'

export interface LastUsedItem {
  path: string
  title: string
  timestamp: number
}

export const useLastUsed = () => {
  const STORAGE_KEY = 'last-used'
  const items = ref<LastUsedItem[]>([])

  const loadLastUsed = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        items.value = JSON.parse(saved)
      }
    }
  }

  const addLastUsed = (path: string, title: string) => {
    loadLastUsed()
    const newItem: LastUsedItem = { path, title, timestamp: Date.now() }
    
    // Remove existing if any
    const filtered = items.value.filter(i => i.path !== path)
    
    // Add to top
    const newItems = [newItem, ...filtered].slice(0, 20)
    
    items.value = newItems
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
  }

  const clearLastUsed = () => {
    items.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  onMounted(loadLastUsed)

  return {
    items,
    addLastUsed,
    clearLastUsed
  }
}
