export type SectionAnchor =
  | 'goal'
  | 'workflow'
  | 'prompts'
  | 'humanLoop'
  | 'mastery'
  | 'optional'

export interface ExtractedSections {
  title: string | null
  goal: string | null
  body: Partial<Record<SectionAnchor, string>>
}

const TITLE_HEADING = /^#\s+(.+)$/
const GOAL_HEADING = /^##\s+(Cieľ|Goal)\s*$/u
const WORKFLOW_HEADING = /^##\s*🔄\s+/u
const PROMPTS_HEADING = /^##\s*✍️\s+/u
const HUMAN_LOOP_HEADING = /^##\s*⚠️\s+/u
const MASTERY_HEADING = /^##\s*✅\s+/u
const OPTIONAL_HEADING = /^##\s*🚀\s+/u
const ANY_H2 = /^##\s+/

type Anchor = SectionAnchor | 'goal'

function matchAnchor(line: string): Anchor | null {
  if (GOAL_HEADING.test(line)) return 'goal'
  if (WORKFLOW_HEADING.test(line)) return 'workflow'
  if (PROMPTS_HEADING.test(line)) return 'prompts'
  if (HUMAN_LOOP_HEADING.test(line)) return 'humanLoop'
  if (MASTERY_HEADING.test(line)) return 'mastery'
  if (OPTIONAL_HEADING.test(line)) return 'optional'
  return null
}

export function extractSections(markdown: string): ExtractedSections {
  const lines = markdown.split('\n')
  const out: ExtractedSections = { title: null, goal: null, body: {} }

  let current: Anchor | null = null
  let buf: string[] = []

  const flush = () => {
    if (!current) return
    const text = buf.join('\n').trim()
    if (current === 'goal') {
      out.goal = text || null
    } else {
      out.body[current] = text
    }
    buf = []
  }

  for (const raw of lines) {
    const line = raw.replace(/\r$/, '')

    if (!out.title) {
      const t = line.match(TITLE_HEADING)
      if (t) {
        out.title = t[1].trim()
        continue
      }
    }

    const anchor = matchAnchor(line)
    if (anchor) {
      flush()
      current = anchor
      continue
    }

    if (current && ANY_H2.test(line)) {
      flush()
      current = null
      continue
    }

    if (current) buf.push(line)
  }

  flush()
  return out
}
