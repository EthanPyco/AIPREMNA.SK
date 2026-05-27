import { ref, watch } from 'vue'
import { Index } from 'flexsearch'

export const useSearch = () => {
  const index = new Index({
    tokenize: 'forward',
    cache: true,
  })
  
  const results = ref<any[]>([])
  const isReady = ref(false)
  const allGuides = ref<any[]>([])

  const initIndex = async () => {
    const { data } = await useAsyncData('search-content', () => {
      return queryCollection('content').all()
    })

    if (data.value) {
      allGuides.value = data.value
      data.value.forEach((guide, i) => {
        // Index title and description
        const contentToIndex = `${guide.title} ${guide.description || ''} ${guide.body?.toString() || ''}`
        index.add(i, contentToIndex)
      })
      isReady.value = true
    }
  }

  const search = (query: string) => {
    if (!query || !isReady.value) {
      results.value = []
      return
    }

    const searchResults = index.search(query, { limit: 10, suggest: true })
    results.value = searchResults.map(id => allGuides.value[id as number])
  }

  return {
    results,
    isReady,
    initIndex,
    search
  }
}
