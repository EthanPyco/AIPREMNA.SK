import { computed } from 'vue'

export const useProgress = (path: string) => {
  const store = useProgressStore()
  const entry = store.getEntry(path)

  // Reactive computed so LearningCard's `checklist.value[index]` reads stay reactive
  // and update when the store mutates.
  const checklist = computed(() => entry.checklist)

  const toggleItem = (index: number) => {
    store.setChecklistItem(path, index, !entry.checklist[index])
  }

  const getCompletionPercentage = (totalItems: number) => {
    if (totalItems !== entry.total) store.setTotal(path, totalItems)
    return store.getPercent(path)
  }

  return {
    checklist,
    toggleItem,
    getCompletionPercentage
  }
}
