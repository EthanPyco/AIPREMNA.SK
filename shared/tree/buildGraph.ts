import type { GuidePair } from '../i18n/guideLocalePairing'

export type NodeKind = 'root' | 'tier' | 'category' | 'leaf'

export interface GraphNode {
  id: string
  kind: NodeKind
  label: string
  tier?: string
  category?: string | null
  slug?: string
}

export interface GraphEdge {
  id: string
  source: string
  target: string
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface BuildGraphOptions {
  rootLabel: string
  tierLabels: Record<string, string>
  categoryLabels: Record<string, string>
  tierOrder?: string[]
}

const DEFAULT_TIER_ORDER = ['foundation', 'usecases', 'tools', 'impactEffort']

export function buildGraph(
  pairs: Iterable<GuidePair>,
  opts: BuildGraphOptions,
): Graph {
  const order = opts.tierOrder ?? DEFAULT_TIER_ORDER
  const tierOrderIndex = new Map(order.map((t, i) => [t, i]))

  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const tierSet = new Set<string>()
  const categorySet = new Set<string>()
  const leafSeen = new Set<string>()

  const rootId = 'root'
  nodes.push({ id: rootId, kind: 'root', label: opts.rootLabel })

  const sorted = [...pairs].sort((a, b) => {
    const ai = tierOrderIndex.get(a.tier) ?? 99
    const bi = tierOrderIndex.get(b.tier) ?? 99
    if (ai !== bi) return ai - bi
    return a.slug.localeCompare(b.slug)
  })

  for (const pair of sorted) {
    const tierId = `tier:${pair.tier}`
    if (!tierSet.has(pair.tier)) {
      nodes.push({
        id: tierId,
        kind: 'tier',
        label: opts.tierLabels[pair.tier] ?? pair.tier,
        tier: pair.tier,
      })
      edges.push({ id: `${rootId}->${tierId}`, source: rootId, target: tierId })
      tierSet.add(pair.tier)
    }

    let parentId = tierId
    if (pair.category) {
      const categoryKey = `${pair.tier}:${pair.category}`
      const categoryId = `cat:${categoryKey}`
      if (!categorySet.has(categoryKey)) {
        nodes.push({
          id: categoryId,
          kind: 'category',
          label: opts.categoryLabels[pair.category] ?? pair.category,
          tier: pair.tier,
          category: pair.category,
        })
        edges.push({ id: `${tierId}->${categoryId}`, source: tierId, target: categoryId })
        categorySet.add(categoryKey)
      }
      parentId = categoryId
    }

    const leafId = `leaf:${pair.slug}`
    if (!leafSeen.has(pair.slug)) {
      nodes.push({
        id: leafId,
        kind: 'leaf',
        label: pair.slug,
        tier: pair.tier,
        category: pair.category,
        slug: pair.slug,
      })
      edges.push({ id: `${parentId}->${leafId}`, source: parentId, target: leafId })
      leafSeen.add(pair.slug)
    }
  }

  return { nodes, edges }
}
