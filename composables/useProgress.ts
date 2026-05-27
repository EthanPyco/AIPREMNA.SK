import { ref, watch, onMounted } from 'vue'

export const useProgress = (path: string) => {
  const progressKey = `progress-${path}`
  const checklist = ref<Record<number, boolean>>({})
  
  const loadProgress = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(progressKey)
      if (saved) {
        checklist.value = JSON.parse(saved)
      }
    }
  }

  const saveProgress = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(progressKey, JSON.stringify(checklist.value))
    }
  }

  const toggleItem = (index: number) => {
    checklist.value[index] = !checklist.value[index]
    saveProgress()
  }

  const getCompletionPercentage = (totalItems: number) => {
    if (totalItems === 0) return 0
    const completedCount = Object.values(checklist.value).filter(v => v).length
    return Math.round((completedCount / totalItems) * 100)
  }

  onMounted(loadProgress)

  return {
    checklist,
    toggleItem,
    getCompletionPercentage
  }
}
