import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { extractGlossary } from '../../../shared/parser/extractGlossary'

const GLOSSARY = resolve(__dirname, '../../../initial_info/glosar_pojmov.md')

describe('extractGlossary', () => {
  it('returns [] for empty input', () => {
    expect(extractGlossary('')).toEqual([])
    expect(extractGlossary(null)).toEqual([])
  })

  it('parses real glossary file with multiple groups', () => {
    const md = readFileSync(GLOSSARY, 'utf8')
    const terms = extractGlossary(md)
    expect(terms.length).toBeGreaterThan(10)
    const llm = terms.find((t) => t.term.startsWith('LLM'))
    expect(llm).toBeTruthy()
    expect(llm!.english).toContain('Large Language Model')
    expect(llm!.definition).toMatch(/Jadro moderných chatbotov/)
    expect(llm!.group).toMatch(/Základné/)
  })

  it('captures terms across all groups', () => {
    const md = readFileSync(GLOSSARY, 'utf8')
    const terms = extractGlossary(md)
    const groups = new Set(terms.map((t) => t.group).filter(Boolean))
    expect(groups.size).toBeGreaterThanOrEqual(3)
  })

  it('handles term without english parenthetical', () => {
    const out = extractGlossary(`### Group
*   **OnlySlovak:** definition here.`)
    expect(out).toHaveLength(1)
    expect(out[0].term).toBe('OnlySlovak')
    expect(out[0].english).toBeNull()
  })
})
