import { ref, onMounted } from 'vue'

export const useBookmarks = () => {
  const STORAGE_KEY = 'bookmarks'
  const bookmarkedPaths = ref<string[]>([])

  const loadBookmarks = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        bookmarkedPaths.value = JSON.parse(saved)
      }
    }
  }

  const toggleBookmark = (path: string) => {
    loadBookmarks()
    if (bookmarkedPaths.value.includes(path)) {
      bookmarkedPaths.value = bookmarkedPaths.value.filter(p => p !== path)
    } else {
      bookmarkedPaths.value.push(path)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedPaths.value))
  }

  const isBookmarked = (path: string) => {
    return bookmarkedPaths.value.includes(path)
  }

  onMounted(loadBookmarks)

  return {
    bookmarkedPaths,
    toggleBookmark,
    isBookmarked
  }
}
