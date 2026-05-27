import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { extractSections } from '../../../shared/parser/extractSections'

const USECASE_PATH = resolve(__dirname, '../../../jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md')
const TOOL_PATH = resolve(__dirname, '../../../jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md')

describe('extractSections', () => {
  it('extracts title and goal from a usecase guide', () => {
    const md = readFileSync(USECASE_PATH, 'utf8')
    const out = extractSections(md)
    expect(out.title).toMatch(/Písanie e-mailov pomocou AI/)
    expect(out.goal).toMatch(/^Ako učiteľ môžete využiť/)
  })

  it('finds all emoji-anchored sections in a usecase guide', () => {
    const md = readFileSync(USECASE_PATH, 'utf8')
    const out = extractSections(md)
    expect(out.body.workflow).toBeTruthy()
    expect(out.body.workflow).toMatch(/Krok 1/)
    expect(out.body.prompts).toMatch(/Šablóna promptu/)
    expect(out.body.humanLoop).toMatch(/Presnosť faktov/)
    expect(out.body.mastery).toMatch(/Vytvoriť prompt pre AI/)
    expect(out.body.optional).toMatch(/Vyskúšajte tento prompt/)
  })

  it('finds sections in a tool guide too', () => {
    const md = readFileSync(TOOL_PATH, 'utf8')
    const out = extractSections(md)
    expect(out.title).toMatch(/ChatGPT/)
    expect(out.body.workflow).toMatch(/Krok 1: Prístup/)
    expect(out.body.prompts).toMatch(/Pôsobíš ako učiteľ/)
    expect(out.body.mastery).toMatch(/Úspešne vygenerovať/)
  })

  it('returns nulls for empty markdown', () => {
    const out = extractSections('')
    expect(out.title).toBeNull()
    expect(out.goal).toBeNull()
    expect(out.body).toEqual({})
  })
})
