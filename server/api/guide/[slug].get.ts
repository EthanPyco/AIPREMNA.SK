import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { buildGuidePairs, resolveGuideFile } from '~~/shared/i18n/guideLocalePairing'
import { extractSections } from '~~/shared/parser/extractSections'
import { extractChecklist } from '~~/shared/parser/extractChecklist'
import { extractPrompts } from '~~/shared/parser/extractPrompts'

const ROOT_DIRS = ['initial_info', 'jednotlive_usecases', 'jednotlive_tools', 'impact_effort_map']

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

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const localeParam = getQuery(event).locale
  const locale: 'sk' | 'en' = localeParam === 'en' ? 'en' : 'sk'

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug required' })
  }

  const paths = await scanContentPaths()
  const pairs = buildGuidePairs(paths)
  const { path, usedFallback } = resolveGuideFile(pairs, slug, locale)

  if (!path) {
    throw createError({ statusCode: 404, statusMessage: `Guide not found: ${slug}` })
  }

  const raw = await readFile(path, 'utf8')
  const parsed = extractSections(raw)
  const checklist = extractChecklist(raw)
  const prompts = extractPrompts(parsed.body.prompts)

  return {
    slug,
    locale,
    usedFallback,
    title: parsed.title,
    goal: parsed.goal,
    sections: parsed.body,
    checklist,
    prompts,
  }
})
