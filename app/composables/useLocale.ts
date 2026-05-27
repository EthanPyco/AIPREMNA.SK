import { useStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'

export type Locale = 'sk' | 'en'

const STORAGE_KEY = 'aipremna:locale'

export const useLocale = () => {
  const locale = useState<Locale>('aipremna-locale', () => 'sk')
  const hydrated = useState<boolean>('aipremna-locale-hydrated', () => false)

  onMounted(() => {
    if (hydrated.value) return
    try {
      const v = window.localStorage.getItem(STORAGE_KEY)
      if (v === 'sk' || v === 'en') locale.value = v
    } catch {
      /* ignore */
    }
    hydrated.value = true
  })

  function setLocale(next: Locale) {
    locale.value = next
    if (import.meta.client) {
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
    }
  }

  function toggle() {
    setLocale(locale.value === 'sk' ? 'en' : 'sk')
  }

  return { locale, setLocale, toggle }
}
