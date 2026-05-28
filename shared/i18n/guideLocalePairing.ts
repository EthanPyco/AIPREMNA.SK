import { parseContentPath, type Locale } from '../parser/parseContentPath'
import { slugify } from '../parser/slugify'

export interface GuidePair {
  slug: string
  tier: string
  category: string | null
  files: Partial<Record<Locale, string>>
}

const SLUG_BY_LEAF: Record<string, string> = {
  ai_overenie_odpovedi: 'overenie-odpovedi',
  akademicka_integrita: 'akademicka-integrita',
  context_engineering: 'kontextove-inzinierstvo',
  gdpr: 'gdpr',
  prompt_engineering: 'promptove-inzinierstvo',
  vyber_nastrojov: 'vyber-nastrojov',
  glosar_pojmov: 'slovnik-pojmov',
  komunikacia_s_rodicmi: 'komunikacia-s-rodicmi',
  pisanie_emailu: 'pisanie-emailu',
  podpora_ivp: 'podpora-ivp',
  cvicne_ulohy: 'cvicne-ulohy',
  flashcardy: 'flashcardy',
  gamifikacia: 'gamifikacia',
  laboratorne_prace: 'laboratorne-prace',
  pracovne_listy: 'pracovne-listy',
  projektove_vyucovanie: 'projektove-vyucovanie',
  opravovanie_pisomiek: 'opravovanie-pisomiek',
  spatna_vazba: 'spatna-vazba',
  tvorba_pisomky: 'tvorba-pisomky',
  ustna_skuska: 'ustna-skuska',
  sumarizacia_poznamok: 'sumarizacia-poznamok',
  sumarizacny_podcast: 'sumarizacny-podcast',
  vytvorenie_cheatsheetu: 'vytvorenie-cheatsheetu',
  generovanie_obrazkov: 'generovanie-obrazkov',
  preklad_uciva: 'preklad-uciva',
  prezentacie: 'tvorba-prezentacii',
  impact_effort_sjl: 'impact-effort-map',
  impact_effort_en: 'impact-effort-map',
}

export function slugForLeaf(leaf: string): string {
  return SLUG_BY_LEAF[leaf] ?? slugify(leaf)
}

export function buildGuidePairs(paths: string[]): Map<string, GuidePair> {
  const pairs = new Map<string, GuidePair>()

  for (const path of paths) {
    const meta = parseContentPath(path)
    if (!meta) continue

    const slug = meta.tier === 'tools'
      ? slugify(meta.leaf)
      : slugForLeaf(meta.leaf)

    const existing = pairs.get(slug) ?? {
      slug,
      tier: meta.tier,
      category: meta.category,
      files: {} as Partial<Record<Locale, string>>,
    }

    existing.files[meta.locale] = path
    pairs.set(slug, existing)
  }

  return pairs
}

export function resolveGuideFile(
  pairs: Map<string, GuidePair>,
  slug: string,
  preferred: Locale,
): { path: string | null; usedFallback: boolean } {
  const pair = pairs.get(slug)
  if (!pair) return { path: null, usedFallback: false }

  const preferredPath = pair.files[preferred]
  if (preferredPath) return { path: preferredPath, usedFallback: false }

  const fallback: Locale = preferred === 'en' ? 'sk' : 'en'
  const fallbackPath = pair.files[fallback]
  return { path: fallbackPath ?? null, usedFallback: !!fallbackPath }
}
