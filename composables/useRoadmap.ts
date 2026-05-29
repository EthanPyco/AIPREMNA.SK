export const useRoadmap = () => {
  const getNodesAndEdges = async () => {
    const { data: slovakContent } = await useSlovakContent()

    if (!slovakContent.value) return { nodes: [], edges: [] }

    const nodes: any[] = []
    const edges: any[] = []

    const TIER1_ID = 'tier-initial_info'
    const TIER2_ID = 'tier-jednotlive_usecases'
    const TIER3_ID = 'tier-jednotlive_tools'

    nodes.push({
      id: TIER1_ID,
      type: 'input',
      data: { label: 'Základy a Príprava' },
      position: { x: 400, y: 0 },
      style: { background: '#EF4444', color: 'white', fontWeight: 'bold', borderRadius: '12px', padding: '15px', width: 220, textAlign: 'center' },
    })

    nodes.push({
      id: TIER2_ID,
      data: { label: 'Prípady použitia' },
      position: { x: 400, y: 350 },
      style: { border: '3px solid #3B82F6', borderRadius: '12px', padding: '15px', fontWeight: 'bold', width: 220, textAlign: 'center' },
    })

    nodes.push({
      id: TIER3_ID,
      type: 'output',
      data: { label: 'Konkrétne nástroje' },
      position: { x: 400, y: 700 },
      style: { border: '3px solid #10B981', borderRadius: '12px', padding: '15px', fontWeight: 'bold', width: 220, textAlign: 'center' },
    })

    edges.push({ id: 'e1-2', source: TIER1_ID, target: TIER2_ID, animated: true, style: { stroke: '#EF4444', strokeWidth: 3 } })
    edges.push({ id: 'e2-3', source: TIER2_ID, target: TIER3_ID, animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 } })

    const initialInfo = slovakContent.value.filter(f => f.path.startsWith('/initial_info/'))
    const useCases = slovakContent.value.filter(f => f.path.startsWith('/jednotlive_usecases/'))
    const tools = slovakContent.value.filter(f => f.path.startsWith('/jednotlive_tools/'))

    const CATEGORY_MAP: Record<string, string> = {
      'administrativa': 'Administratíva',
      'aktivity_na_hodinu': 'Aktivity na hodinu',
      'pisomky': 'Písomky a skúšanie',
      'sumarizacia_uciva': 'Sumarizácia učiva',
      'tvorba_materialov': 'Tvorba materiálov',
      'chatboti': 'Chatboti',
      'Designer': 'Dizajn a prezentácie',
      'generacia_obrazkov': 'Generovanie obrázkov',
      'ucebne_pomocky': 'Učebné pomôcky',
      'ai_overenie_odpovedi': 'Overovanie odpovedí',
      'akademicka_integrita': 'Akademická integrita',
      'context_engineering': 'Kontextové inžinierstvo',
      'gdpr': 'GDPR a bezpečnosť',
      'prompt_engineering': 'Promptové inžinierstvo',
      'vyber_nastrojov': 'Výber nástrojov'
    }

    const processLeaves = (items: any[], parentId: string, startX: number, y: number, color: string) => {
      const categories: Record<string, any[]> = {}
      items.forEach(item => {
        const parts = item.path.split('/')
        const catName = parts[2] || 'Všeobecné'
        if (!categories[catName]) categories[catName] = []
        categories[catName].push(item)
      })

      Object.entries(categories).forEach(([catName, catItems], catIndex) => {
        const catId = `cat-${parentId}-${catName}`
        const catX = startX + (catIndex * 300) - ((Object.keys(categories).length - 1) * 150)
        const label = CATEGORY_MAP[catName] || catName.replace(/_/g, ' ')

        nodes.push({
          id: catId,
          data: { label: label.toUpperCase() },
          position: { x: catX, y: y },
          style: { border: `2px dashed ${color}`, borderRadius: '8px', padding: '8px', fontSize: '10px', width: 150, textAlign: 'center', color: '#666' },
        })

        edges.push({ id: `e-${parentId}-${catId}`, source: parentId, target: catId, style: { stroke: color, opacity: 0.5 } })

        catItems.forEach((item, index) => {
          const nodeId = `leaf-${item.path}`
          nodes.push({
            id: nodeId,
            data: { label: item.title, path: item.path },
            position: { x: catX, y: y + 80 + (index * 60) },
            style: {
              background: 'white',
              border: `1px solid ${color}`,
              borderRadius: '8px',
              padding: '10px',
              fontSize: '12px',
              width: 180,
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            },
          })
          edges.push({ id: `e-${catId}-${nodeId}`, source: catId, target: nodeId, style: { stroke: color, opacity: 0.3 } })
        })
      })
    }

    processLeaves(initialInfo, TIER1_ID, 400, 150, '#EF4444')
    processLeaves(useCases, TIER2_ID, 400, 500, '#3B82F6')
    processLeaves(tools, TIER3_ID, 400, 850, '#10B981')

    return { nodes, edges }
  }

  return {
    getNodesAndEdges
  }
}
