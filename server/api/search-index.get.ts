import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { buildGuidePairs, resolveGuideFile } from '~~/shared/i18n/guideLocalePairing'
import { extractSections } from '~~/shared/parser/extractSections'

const ROOT_DIRS = ['initial_info', 'jednotlive_usecases', 'jednotlive_tools', 'impact_effort_map']

interface SearchDoc {
  slug: string
  title: string
  excerpt: string
  body: string
  tier: string
  category: string | null
}

let cache: Partial<Record<'sk' | 'en', SearchDoc[]>> = {}
let pathsCache: string[] | null = null

async function scanContentPaths(): Promise<string[]> {
  if (pathsCache) return pathsCache
  const cwd = process.cwd()
  const out: string[] = []
  async function walk(dir: string): Promise<void> {
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) await walk(full)
      else if (e.isFile() && e.name.endsWith('.md')) {
        out.push(relative(cwd, full).replace(/\\/g, '/'))
      }
    }
  }
  for (const root of ROOT_DIRS) await walk(join(cwd, root))
  pathsCache = out
  return out
}

function makeExcerpt(raw: string, max = 180): string {
  const stripped = raw
    .replace(/^---[\s\S]*?---\n/, '')
    .replace(/^#.*$/gm, '')
    .replace(/^>.*$/gm, '')
    .replace(/[*_`~#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return stripped.length > max ? stripped.slice(0, max).trim() + '…' : stripped
}

export default defineEventHandler(async (event) => {
  const localeParam = getQuery(event).locale
  const locale: 'sk' | 'en' = localeParam === 'en' ? 'en' : 'sk'

  if (cache[locale]) return cache[locale]!

  const paths = await scanContentPaths()
  const pairs = buildGuidePairs(paths)
  const out: SearchDoc[] = []

  for (const [slug, pair] of pairs) {
    const { path } = resolveGuideFile(pairs, slug, locale)
    if (!path) continue

    try {
      const raw = await readFile(path, 'utf8')
      const sections = extractSections(raw)
      out.push({
        slug,
        title: sections.title ?? slug,
        excerpt: makeExcerpt(sections.goal ?? raw),
        body: raw,
        tier: pair.tier,
        category: pair.category,
      })
    } catch {
      /* skip unreadable */
    }
  }

  cache[locale] = out
  return out
})
