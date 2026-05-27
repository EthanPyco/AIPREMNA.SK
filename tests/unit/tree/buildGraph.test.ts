import { describe, it, expect } from 'vitest'
import { buildGuidePairs } from '../../../shared/i18n/guideLocalePairing'
import { buildGraph } from '../../../shared/tree/buildGraph'
import { TIER_LABELS_SK, CATEGORY_LABELS_SK } from '../../../shared/labels.sk'

const PATHS = [
  'initial_info/glosar_pojmov.md',
  'initial_info/akademicka_integrita/akademicka_integrita.md',
  'initial_info/akademicka_integrita/academic_integrity.md',
  'jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md',
  'jednotlive_usecases/administrativa/pisanie_emailu/writing_email.md',
  'jednotlive_usecases/administrativa/komunikacia_s_rodicmi/komunikacia_s_rodicmi.md',
  'jednotlive_usecases/administrativa/komunikacia_s_rodicmi/parent_communication.md',
  'jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md',
  'jednotlive_tools/chatboti/chatgpt/chatgpt.md',
  'impact_effort_map/impact_effort_sjl.md',
  'impact_effort_map/impact_effort_en.md',
]

describe('buildGraph', () => {
  const pairs = buildGuidePairs(PATHS)
  const graph = buildGraph(pairs.values(), {
    rootLabel: 'AIPREMNA.SK',
    tierLabels: TIER_LABELS_SK,
    categoryLabels: CATEGORY_LABELS_SK,
  })

  it('emits a single root node', () => {
    const roots = graph.nodes.filter((n) => n.kind === 'root')
    expect(roots).toHaveLength(1)
    expect(roots[0].label).toBe('AIPREMNA.SK')
  })

  it('emits one tier node per tier present', () => {
    const tiers = graph.nodes.filter((n) => n.kind === 'tier').map((n) => n.tier)
    expect(tiers).toEqual(['foundation', 'usecases', 'tools', 'impactEffort'])
  })

  it('connects root to every tier', () => {
    for (const tier of ['foundation', 'usecases', 'tools', 'impactEffort']) {
      expect(graph.edges.some((e) => e.source === 'root' && e.target === `tier:${tier}`)).toBe(true)
    }
  })

  it('emits leaf nodes with stable slugs', () => {
    const leaves = graph.nodes.filter((n) => n.kind === 'leaf').map((n) => n.slug)
    expect(leaves).toContain('pisanie-emailu')
    expect(leaves).toContain('chatgpt')
    expect(leaves).toContain('akademicka-integrita')
    expect(leaves).toContain('slovnik-pojmov')
    expect(leaves).toContain('impact-effort-map')
  })

  it('avoids duplicate category nodes', () => {
    const adminCats = graph.nodes.filter((n) => n.kind === 'category' && n.category === 'administrativa')
    expect(adminCats).toHaveLength(1)
  })

  it('labels categories in Slovak when SK labels passed', () => {
    const admin = graph.nodes.find((n) => n.kind === 'category' && n.category === 'administrativa')
    expect(admin?.label).toBe('Administratíva')
  })
})
