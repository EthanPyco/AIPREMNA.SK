export interface GlossaryTerm {
  term: string
  english: string | null
  definition: string
  group: string | null
}

const H3 = /^###\s+(.+)$/
const ITEM = /^\s*\*\s+\*\*(.+?):\*\*\s+(.+)$/

function parseTermTitle(raw: string): { term: string; english: string | null } {
  const match = raw.match(/^(.+?)\s*\((.+?)\)\s*$/)
  if (match) {
    return { term: match[1].trim(), english: match[2].trim() }
  }
  return { term: raw.trim(), english: null }
}

export function extractGlossary(markdown: string | null | undefined): GlossaryTerm[] {
  if (!markdown) return []
  const lines = markdown.split('\n')
  const terms: GlossaryTerm[] = []
  let currentGroup: string | null = null

  for (const raw of lines) {
    const line = raw.replace(/\r$/, '')

    const h3 = line.match(H3)
    if (h3) {
      currentGroup = h3[1].trim()
      continue
    }

    const item = line.match(ITEM)
    if (item) {
      const { term, english } = parseTermTitle(item[1])
      const definition = item[2].trim()
      terms.push({ term, english, definition, group: currentGroup })
    }
  }

  return terms
}
