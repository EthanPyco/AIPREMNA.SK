import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { buildGuidePairs, resolveGuideFile } from '~~/shared/i18n/guideLocalePairing'
import { extractSections } from '~~/shared/parser/extractSections'
import { extractPrompts } from '~~/shared/parser/extractPrompts'
import { extractGlossary, type GlossaryTerm } from '~~/shared/parser/extractGlossary'

const ROOT_DIRS = ['initial_info', 'jednotlive_usecases', 'jednotlive_tools', 'impact_effort_map']
const GLOSSARY_PATH = 'initial_info/glosar_pojmov.md'

let pathsCache: string[] | null = null
let cache: Partial<Record<'sk' | 'en', { prompts: PromptCard[]; glossary: GlossaryTerm[] }>> = {}

interface PromptCard {
  id: string
  slug: string
  guideTitle: string
  category: string | null
  tier: string
  heading: string | null
  text: string
}

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
  const localeParam = getQuery(event).locale
  const locale: 'sk' | 'en' = localeParam === 'en' ? 'en' : 'sk'

  if (cache[locale]) return cache[locale]!

  const paths = await scanContentPaths()
  const pairs = buildGuidePairs(paths)
  const prompts: PromptCard[] = []

  for (const [slug, pair] of pairs) {
    const { path } = resolveGuideFile(pairs, slug, locale)
    if (!path) continue
    try {
      const raw = await readFile(path, 'utf8')
      const sections = extractSections(raw)
      const guideTitle = sections.title ?? slug
      const guidePrompts = extractPrompts(sections.body.prompts)
      for (const p of guidePrompts) {
        prompts.push({
          id: `${slug}#${p.index}`,
          slug,
          guideTitle,
          category: pair.category,
          tier: pair.tier,
          heading: p.heading,
          text: p.text,
        })
      }
    } catch {
      /* skip */
    }
  }

  let glossary: GlossaryTerm[] = []
  try {
    const glossaryRaw = await readFile(join(process.cwd(), GLOSSARY_PATH), 'utf8')
    glossary = extractGlossary(glossaryRaw)
  } catch {
    /* glossary missing */
  }

  const result = { prompts, glossary }
  cache[locale] = result
  return result
})
