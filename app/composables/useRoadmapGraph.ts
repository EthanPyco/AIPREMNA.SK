import { buildGuidePairs } from '~~/shared/i18n/guideLocalePairing'
import { buildGraph, type Graph } from '~~/shared/tree/buildGraph'
import { layoutGraph, type PositionedGraph } from '~~/shared/tree/layoutGraph'
import { TIER_LABELS_SK, CATEGORY_LABELS_SK } from '~~/shared/labels.sk'
import { TIER_LABELS_EN, CATEGORY_LABELS_EN } from '~~/shared/labels.en'

const ROOT_DIRS = ['initial_info', 'jednotlive_usecases', 'jednotlive_tools', 'impact_effort_map']

async function scanContentPaths(): Promise<string[]> {
  const { readdir } = await import('node:fs/promises')
  const { join, relative } = await import('node:path')

  const cwd = process.cwd()
  const out: string[] = []

  async function walk(dir: string): Promise<void> {
    let entries: Awaited<ReturnType<typeof readdir>>
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) {
        await walk(full)
      } else if (e.isFile() && e.name.endsWith('.md')) {
        out.push(relative(cwd, full).replace(/\\/g, '/'))
      }
    }
  }

  for (const root of ROOT_DIRS) {
    await walk(join(cwd, root))
  }
  out.sort()
  return out
}

export interface RoadmapData {
  graph: Graph
  positioned: PositionedGraph
}

export const useRoadmapGraph = (locale: 'sk' | 'en' = 'sk') => {
  return useAsyncData<RoadmapData>(`roadmap-graph:${locale}`, async () => {
    let paths: string[] = []
    if (import.meta.server) {
      paths = await scanContentPaths()
    }
    const pairs = buildGuidePairs(paths)
    const tierLabels = locale === 'en' ? TIER_LABELS_EN : TIER_LABELS_SK
    const categoryLabels = locale === 'en' ? CATEGORY_LABELS_EN : CATEGORY_LABELS_SK
    const graph = buildGraph(pairs.values(), {
      rootLabel: 'AIPREMNA.SK',
      tierLabels,
      categoryLabels,
    })
    const positioned = layoutGraph(graph, { direction: 'TB' })
    return { graph, positioned }
  })
}
