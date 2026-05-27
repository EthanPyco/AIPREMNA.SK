import dagre from 'dagre'
import type { Graph, GraphNode } from './buildGraph'

export interface PositionedNode extends GraphNode {
  position: { x: number; y: number }
}

export interface PositionedGraph {
  nodes: PositionedNode[]
  edges: Graph['edges']
}

const NODE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  root: { width: 220, height: 64 },
  tier: { width: 200, height: 56 },
  category: { width: 200, height: 56 },
  leaf: { width: 220, height: 64 },
}

export interface LayoutOptions {
  direction?: 'TB' | 'LR'
  nodesep?: number
  ranksep?: number
}

export function layoutGraph(graph: Graph, opts: LayoutOptions = {}): PositionedGraph {
  const g = new dagre.graphlib.Graph()
  g.setGraph({
    rankdir: opts.direction ?? 'TB',
    nodesep: opts.nodesep ?? 30,
    ranksep: opts.ranksep ?? 90,
    marginx: 40,
    marginy: 40,
  })
  g.setDefaultEdgeLabel(() => ({}))

  for (const node of graph.nodes) {
    const dims = NODE_DIMENSIONS[node.kind] ?? { width: 200, height: 56 }
    g.setNode(node.id, dims)
  }
  for (const edge of graph.edges) {
    g.setEdge(edge.source, edge.target)
  }

  dagre.layout(g)

  const positioned: PositionedNode[] = graph.nodes.map((node) => {
    const dims = NODE_DIMENSIONS[node.kind] ?? { width: 200, height: 56 }
    const layout = g.node(node.id)
    return {
      ...node,
      position: {
        x: layout.x - dims.width / 2,
        y: layout.y - dims.height / 2,
      },
    }
  })

  return { nodes: positioned, edges: graph.edges }
}
