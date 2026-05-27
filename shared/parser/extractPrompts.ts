export interface ExtractedPrompt {
  index: number
  text: string
  heading: string | null
}

const QUOTE_OPEN = /[„""]/
const QUOTE_CLOSE = /[""""]/

function stripBlockquote(line: string): string {
  return line.replace(/^>\s?/, '')
}

function stripQuotes(text: string): string {
  return text
    .replace(/^[„"""\s]+/, '')
    .replace(/[""""\s]+$/, '')
    .trim()
}

export function extractPrompts(promptsSection: string | null | undefined): ExtractedPrompt[] {
  if (!promptsSection) return []
  const lines = promptsSection.split('\n')
  const prompts: ExtractedPrompt[] = []
  const buf: string[] = []
  let lastHeading: string | null = null

  const flush = () => {
    if (buf.length === 0) return
    const raw = buf.join('\n').trim()
    if (raw) {
      prompts.push({
        index: prompts.length,
        text: stripQuotes(raw),
        heading: lastHeading,
      })
    }
    buf.length = 0
  }

  for (const raw of lines) {
    const line = raw.replace(/\r$/, '')

    if (/^#{3,4}\s+/.test(line)) {
      flush()
      lastHeading = line.replace(/^#{3,4}\s+/, '').trim()
      continue
    }

    if (line.startsWith('>')) {
      buf.push(stripBlockquote(line))
    } else if (line.trim() === '' && buf.length > 0) {
      flush()
    } else if (buf.length > 0 && !line.startsWith('>')) {
      flush()
    }
  }

  flush()
  return prompts
}
