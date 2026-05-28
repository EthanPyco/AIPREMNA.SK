import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { buildGuidePairs, resolveGuideFile } from '~~/shared/i18n/guideLocalePairing'
import { extractSections } from '~~/shared/parser/extractSections'
import { extractChecklist } from '~~/shared/parser/extractChecklist'

const ROOT_DIRS = ['initial_info', 'jednotlive_usecases', 'jednotlive_tools']

export interface RoadmapItem {
  slug: string
  title: string
  excerpt: string
  tier: string
  category: string | null
  checklistTotal: number
}

let cache: Partial<Record<'sk' | 'en', RoadmapItem[]>> = {}
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

function makeExcerpt(raw: string, max = 140): string {
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
  const out: RoadmapItem[] = []

  for (const [slug, pair] of pairs) {
    if (pair.tier !== 'foundation' && pair.tier !== 'usecases' && pair.tier !== 'tools') {
      continue
    }
    const { path } = resolveGuideFile(pairs, slug, locale)
    if (!path) continue

    try {
      const raw = await readFile(path, 'utf8')
      const sections = extractSections(raw)
      const checklist = extractChecklist(raw)
      out.push({
        slug,
        title: sections.title ?? slug,
        excerpt: makeExcerpt(sections.goal ?? raw),
        tier: pair.tier,
        category: pair.category,
        checklistTotal: checklist.length,
      })
    } catch {
      /* skip unreadable */
    }
  }

  cache[locale] = out
  return out
})
