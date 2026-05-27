import { describe, it, expect } from 'vitest'
import { parseContentPath } from '../../../shared/parser/parseContentPath'

describe('parseContentPath', () => {
  it('parses a usecase Slovak file', () => {
    const m = parseContentPath('jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md')!
    expect(m.tier).toBe('usecases')
    expect(m.category).toBe('administrativa')
    expect(m.leaf).toBe('pisanie_emailu')
    expect(m.locale).toBe('sk')
  })

  it('parses a usecase English file', () => {
    const m = parseContentPath('jednotlive_usecases/administrativa/pisanie_emailu/writing_email.md')!
    expect(m.locale).toBe('en')
    expect(m.leaf).toBe('pisanie_emailu')
  })

  it('parses a tool file with _sk suffix', () => {
    const m = parseContentPath('jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md')!
    expect(m.tier).toBe('tools')
    expect(m.category).toBe('chatboti')
    expect(m.leaf).toBe('chatgpt')
    expect(m.locale).toBe('sk')
  })

  it('parses a tool file without suffix as English', () => {
    const m = parseContentPath('jednotlive_tools/chatboti/chatgpt/chatgpt.md')!
    expect(m.locale).toBe('en')
  })

  it('parses a foundation file pair', () => {
    const sk = parseContentPath('initial_info/akademicka_integrita/akademicka_integrita.md')!
    const en = parseContentPath('initial_info/akademicka_integrita/academic_integrity.md')!
    expect(sk.tier).toBe('foundation')
    expect(sk.category).toBe('akademicka_integrita')
    expect(sk.locale).toBe('sk')
    expect(en.locale).toBe('en')
  })

  it('parses a foundation file where folder name is in English', () => {
    const sk = parseContentPath('initial_info/prompt_engineering/promptove_inzinierstvo.md')!
    const en = parseContentPath('initial_info/prompt_engineering/prompt_engineering.md')!
    expect(sk.locale).toBe('sk')
    expect(en.locale).toBe('en')
  })

  it('parses an impact_effort_map file', () => {
    const sk = parseContentPath('impact_effort_map/impact_effort_sjl.md')!
    const en = parseContentPath('impact_effort_map/impact_effort_en.md')!
    expect(sk.tier).toBe('impactEffort')
    expect(sk.locale).toBe('sk')
    expect(en.locale).toBe('en')
  })

  it('parses a root-level foundation file (glossary)', () => {
    const g = parseContentPath('initial_info/glosar_pojmov.md')!
    expect(g.tier).toBe('foundation')
    expect(g.category).toBeNull()
    expect(g.leaf).toBe('glosar_pojmov')
  })

  it('returns null for non-content paths', () => {
    expect(parseContentPath('package.json')).toBeNull()
    expect(parseContentPath('ai_docs/standards.md')).toBeNull()
  })
})
