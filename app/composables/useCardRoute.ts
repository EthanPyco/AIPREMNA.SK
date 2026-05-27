import { computed } from 'vue'

export const useCardRoute = () => {
  const route = useRoute()
  const router = useRouter()

  const activeSlug = computed<string | null>(() => {
    const c = route.query.card
    if (typeof c === 'string' && c.length > 0) return c
    if (Array.isArray(c) && c.length > 0 && typeof c[0] === 'string') return c[0]
    return null
  })

  const isOpen = computed(() => activeSlug.value !== null)

  function open(slug: string) {
    router.push({ query: { ...route.query, card: slug } })
  }

  function close() {
    const next = { ...route.query }
    delete next.card
    router.push({ query: next })
  }

  return { activeSlug, isOpen, open, close }
}
