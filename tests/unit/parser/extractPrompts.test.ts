import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { extractSections } from '../../../shared/parser/extractSections'
import { extractPrompts } from '../../../shared/parser/extractPrompts'

const USECASE = resolve(__dirname, '../../../jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md')

describe('extractPrompts', () => {
  it('returns empty array for null/empty input', () => {
    expect(extractPrompts(null)).toEqual([])
    expect(extractPrompts('')).toEqual([])
  })

  it('extracts a single blockquote prompt', () => {
    const out = extractPrompts(`### Šablóna promptu
> "Vypracuj [Tón] e-mail pre [Príjemca] o [Téma]."`)
    expect(out).toHaveLength(1)
    expect(out[0].text).toMatch(/^Vypracuj/)
    expect(out[0].heading).toBe('Šablóna promptu')
  })

  it('extracts both šablóna and príklad prompts from real usecase content', () => {
    const md = readFileSync(USECASE, 'utf8')
    const sections = extractSections(md)
    const prompts = extractPrompts(sections.body.prompts)
    expect(prompts.length).toBeGreaterThanOrEqual(2)
    expect(prompts.some((p) => p.heading?.includes('Šablóna'))).toBe(true)
    expect(prompts.some((p) => p.heading?.includes('Príklad'))).toBe(true)
  })

  it('strips Slovak smart quotes around prompt text', () => {
    const out = extractPrompts(`> „Hello world."`)
    expect(out[0].text).toBe('Hello world.')
  })

  it('assigns sequential indices', () => {
    const out = extractPrompts(`### A
> "first"

### B
> "second"`)
    expect(out.map((p) => p.index)).toEqual([0, 1])
  })
})
