import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const FILES: Record<'sk' | 'en', string> = {
  sk: 'impact_effort_map/impact_effort_sjl.md',
  en: 'impact_effort_map/impact_effort_en.md',
}

let cache: Partial<Record<'sk' | 'en', { title: string | null; body: string; usedFallback: boolean }>> = {}

async function loadFile(locale: 'sk' | 'en') {
  try {
    return await readFile(join(process.cwd(), FILES[locale]), 'utf8')
  } catch {
    return null
  }
}

function extractTitle(raw: string): string | null {
  const m = raw.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : null
}

export default defineEventHandler(async (event) => {
  const localeParam = getQuery(event).locale
  const locale: 'sk' | 'en' = localeParam === 'en' ? 'en' : 'sk'

  if (cache[locale]) return cache[locale]!

  let raw = await loadFile(locale)
  let usedFallback = false
  if (!raw) {
    raw = await loadFile(locale === 'en' ? 'sk' : 'en')
    usedFallback = !!raw
  }

  if (!raw) {
    throw createError({ statusCode: 404, statusMessage: 'Impact-effort map not found' })
  }

  const payload = { title: extractTitle(raw), body: raw, usedFallback }
  cache[locale] = payload
  return payload
})
