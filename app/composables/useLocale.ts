import { computed } from 'vue'

export type Locale = 'sk' | 'en'

const STORAGE_KEY = 'aipremna:locale'

export const useLocale = () => {
  const { locale: i18nLocale, setLocale: i18nSetLocale } = useI18n()

  const locale = computed<Locale>(() => (i18nLocale.value === 'en' ? 'en' : 'sk'))

  async function setLocale(next: Locale) {
    await i18nSetLocale(next)
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

  if (import.meta.client) {
    onMounted(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if ((stored === 'sk' || stored === 'en') && stored !== locale.value) {
          i18nSetLocale(stored)
        }
      } catch {
        /* ignore */
      }
    })
  }

  return { locale, setLocale, toggle }
}
