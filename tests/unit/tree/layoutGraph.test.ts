import { describe, it, expect } from 'vitest'
import { buildGraph } from '../../../shared/tree/buildGraph'
import { layoutGraph } from '../../../shared/tree/layoutGraph'
import { buildGuidePairs } from '../../../shared/i18n/guideLocalePairing'
import { TIER_LABELS_SK, CATEGORY_LABELS_SK } from '../../../shared/labels.sk'

const PATHS = [
  'initial_info/akademicka_integrita/akademicka_integrita.md',
  'jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md',
  'jednotlive_usecases/administrativa/komunikacia_s_rodicmi/komunikacia_s_rodicmi.md',
  'jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md',
]

describe('layoutGraph', () => {
  const pairs = buildGuidePairs(PATHS)
  const graph = buildGraph(pairs.values(), {
    rootLabel: 'Test root',
    tierLabels: TIER_LABELS_SK,
    categoryLabels: CATEGORY_LABELS_SK,
  })

  it('assigns a numeric position to every node', () => {
    const positioned = layoutGraph(graph)
    expect(positioned.nodes.length).toBe(graph.nodes.length)
    for (const node of positioned.nodes) {
      expect(node.position.x).toBeTypeOf('number')
      expect(node.position.y).toBeTypeOf('number')
      expect(Number.isFinite(node.position.x)).toBe(true)
      expect(Number.isFinite(node.position.y)).toBe(true)
    }
  })

  it('preserves edges unchanged', () => {
    const positioned = layoutGraph(graph)
    expect(positioned.edges).toEqual(graph.edges)
  })

  it('places the root above leaves when direction=TB', () => {
    const positioned = layoutGraph(graph, { direction: 'TB' })
    const root = positioned.nodes.find((n) => n.kind === 'root')!
    const leaves = positioned.nodes.filter((n) => n.kind === 'leaf')
    expect(leaves.length).toBeGreaterThan(0)
    for (const leaf of leaves) {
      expect(leaf.position.y).toBeGreaterThan(root.position.y)
    }
  })

  it('places the root left of leaves when direction=LR', () => {
    const positioned = layoutGraph(graph, { direction: 'LR' })
    const root = positioned.nodes.find((n) => n.kind === 'root')!
    const leaves = positioned.nodes.filter((n) => n.kind === 'leaf')
    for (const leaf of leaves) {
      expect(leaf.position.x).toBeGreaterThan(root.position.x)
    }
  })
})
