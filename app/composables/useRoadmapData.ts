import { computed, type Ref } from 'vue'
import type { RoadmapItem } from '~~/server/api/roadmap.get'

export interface RoadmapTierGroup {
  tier: 'foundation' | 'usecases' | 'tools'
  items: RoadmapItem[]
  categories: Array<{ category: string; items: RoadmapItem[] }>
}

export const useRoadmapData = (locale: Ref<'sk' | 'en'> | (() => 'sk' | 'en')) => {
  const localeFn = typeof locale === 'function' ? locale : () => locale.value

  const { data, pending, error, refresh } = useFetch<RoadmapItem[]>(
    () => `/api/roadmap?locale=${localeFn()}`,
    {
      key: () => `roadmap:${localeFn()}`,
      default: () => [],
      server: true,
    },
  )

  const groups = computed<Record<'foundation' | 'usecases' | 'tools', RoadmapTierGroup>>(() => {
    const empty = { foundation: makeGroup('foundation'), usecases: makeGroup('usecases'), tools: makeGroup('tools') }
    if (!data.value) return empty

    const byTier: Record<string, RoadmapItem[]> = { foundation: [], usecases: [], tools: [] }
    for (const item of data.value) {
      if (item.tier in byTier) byTier[item.tier].push(item)
    }

    return {
      foundation: groupByCategory('foundation', byTier.foundation),
      usecases: groupByCategory('usecases', byTier.usecases),
      tools: groupByCategory('tools', byTier.tools),
    }
  })

  return { groups, pending, error, refresh }
}

function makeGroup(tier: RoadmapTierGroup['tier']): RoadmapTierGroup {
  return { tier, items: [], categories: [] }
}

function groupByCategory(tier: RoadmapTierGroup['tier'], items: RoadmapItem[]): RoadmapTierGroup {
  const byCategory = new Map<string, RoadmapItem[]>()
  const uncategorized: RoadmapItem[] = []
  for (const item of items) {
    if (item.category) {
      const list = byCategory.get(item.category) ?? []
      list.push(item)
      byCategory.set(item.category, list)
    } else {
      uncategorized.push(item)
    }
  }
  const sortedItems = (xs: RoadmapItem[]) => [...xs].sort((a, b) => a.title.localeCompare(b.title, 'sk'))
  return {
    tier,
    items: [...sortedItems(uncategorized), ...[...byCategory.values()].flatMap(sortedItems)],
    categories: [...byCategory.entries()]
      .map(([category, items]) => ({ category, items: sortedItems(items) }))
      .sort((a, b) => a.category.localeCompare(b.category, 'sk')),
  }
}
