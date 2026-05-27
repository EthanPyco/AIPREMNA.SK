import { hashId } from './hashId'

export interface ChecklistItem {
  id: string
  text: string
}

const MASTERY_HEADING = /^##\s*✅\s+/u
const NEXT_HEADING = /^##\s+/u
const HR = /^\s*---+\s*$/
const BULLET = /^\s*[*\-+]\s+(.+)$/

export function extractChecklist(markdown: string): ChecklistItem[] {
  const lines = markdown.split('\n')
  const items: ChecklistItem[] = []
  let inSection = false
  let pastLeadIn = false

  for (const raw of lines) {
    const line = raw.replace(/\r$/, '')

    if (MASTERY_HEADING.test(line)) {
      inSection = true
      pastLeadIn = false
      continue
    }

    if (!inSection) continue

    if (NEXT_HEADING.test(line)) break
    if (HR.test(line) && pastLeadIn) break

    const bullet = line.match(BULLET)
    if (bullet) {
      pastLeadIn = true
      const text = bullet[1].trim()
      items.push({ id: hashId(text), text })
    }
  }

  return items
}
