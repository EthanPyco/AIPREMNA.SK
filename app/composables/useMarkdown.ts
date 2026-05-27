import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })

export function renderMarkdown(input: string | null | undefined): string {
  if (!input) return ''
  return marked.parse(input, { async: false }) as string
}
