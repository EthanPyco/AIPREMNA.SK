export const useRoadmap = () => {
  const getNodesAndEdges = async () => {
    const { data: allContent } = await useAsyncData('all-content', () => {
      return queryCollection('content').all()
    })

    if (!allContent.value) return { nodes: [], edges: [] }

    // STRICT SLOVAK FILTERING
    // 1. Identify all files with _sk suffix
    // 2. Identify files that only have an English version (no _sk equivalent)
    // 3. Keep only the _sk versions, or the non-suffixed version if no _sk exists AND it's not a translation of another file.
    
    const slovakContent = allContent.value.filter(item => {
      // If it ends with _sk, it's a keeper.
      if (item.path.endsWith('_sk')) return true
      
      // If it's in initial_info or jednotlive_usecases, we check if there's an equivalent.
      // Many of these have separate files like pisanie_emailu.md and writing_email.md.
      // This is tricky. Let's look for a pattern where we prefer the one with a Slovak-sounding name.
      
      const hasSkSuffixPartner = allContent.value.some(other => other.path === `${item.path}_sk`)
      if (hasSkSuffixPartner) return false

      // Exclusion list for known English files that have Slovak equivalents with different names
      const englishFiles = [
        '/initial_info/akademicka_integrita/academic_integrity',
        '/initial_info/ai_overenie_odpovedi/ai_verification_of_answers',
        '/initial_info/context_engineering/context_engineering',
        '/initial_info/gdpr/gdpr',
        '/initial_info/prompt_engineering/prompt_engineering',
        '/initial_info/vyber_nastrojov/evaluating_ai_tools',
        '/jednotlive_usecases/administrativa/komunikacia_s_rodicmi/parent_communication',
        '/jednotlive_usecases/administrativa/pisanie_emailu/writing_email',
        '/jednotlive_usecases/administrativa/podpora_ivp/iep_support',
        '/jednotlive_usecases/aktivity_na_hodinu/cvicne_ulohy/practice_questions',
        '/jednotlive_usecases/aktivity_na_hodinu/flashcardy/flashcards',
        '/jednotlive_usecases/aktivity_na_hodinu/gamifikacia/gamification',
        '/jednotlive_usecases/aktivity_na_hodinu/laboratorne_prace/lab_work',
        '/jednotlive_usecases/aktivity_na_hodinu/pracovne_listy/worksheets',
        '/jednotlive_usecases/aktivity_na_hodinu/projektove_vyucovanie/project_based_learning',
        '/jednotlive_usecases/pisomky/opravovanie_pisomiek/exam_grading',
        '/jednotlive_usecases/pisomky/spatna_vazba/student_feedback',
        '/jednotlive_usecases/pisomky/tvorba_pisomky/creating_exams',
        '/jednotlive_usecases/pisomky/ustna_skuska/oral_exam',
        '/jednotlive_usecases/sumarizacia_uciva/sumarizacia_poznamok/summarizing_notes',
        '/jednotlive_usecases/sumarizacia_uciva/sumarizacia_poznamok/summary_notes',
        '/jednotlive_usecases/sumarizacia_uciva/sumarizacny_podcast/summary_podcast',
        '/jednotlive_usecases/sumarizacia_uciva/vytvorenie_cheatsheetu/creating_cheatsheet',
        '/jednotlive_usecases/tvorba_materialov/generovanie_obrazkov/generating_images',
        '/jednotlive_usecases/tvorba_materialov/preklad_uciva/translating_curriculum',
        '/jednotlive_usecases/tvorba_materialov/prezentacie/creating_presentations'
      ]
      
      if (englishFiles.includes(item.path)) return false
      
      // Also exclude the yaml files from the roadmap
      if (item.path.endsWith('/links')) return false
      
      // Keep everything else (should be Slovak or single-version files)
      return true
    })

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

    const initialInfo = slovakContent.filter(f => f.path.startsWith('/initial_info/'))
    const useCases = slovakContent.filter(f => f.path.startsWith('/jednotlive_usecases/'))
    const tools = slovakContent.filter(f => f.path.startsWith('/jednotlive_tools/'))

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
        
        nodes.push({
          id: catId,
          data: { label: catName.replace(/_/g, ' ').toUpperCase() },
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
