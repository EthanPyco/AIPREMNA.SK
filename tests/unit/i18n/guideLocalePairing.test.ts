import { describe, it, expect } from 'vitest'
import { buildGuidePairs, resolveGuideFile } from '../../../shared/i18n/guideLocalePairing'

describe('buildGuidePairs', () => {
  it('pairs SK and EN files for a usecase', () => {
    const pairs = buildGuidePairs([
      'jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md',
      'jednotlive_usecases/administrativa/pisanie_emailu/writing_email.md',
    ])
    const pair = pairs.get('pisanie-emailu')
    expect(pair).toBeTruthy()
    expect(pair!.files.sk).toContain('pisanie_emailu.md')
    expect(pair!.files.en).toContain('writing_email.md')
    expect(pair!.tier).toBe('usecases')
    expect(pair!.category).toBe('administrativa')
  })

  it('pairs tool files using the _sk suffix convention', () => {
    const pairs = buildGuidePairs([
      'jednotlive_tools/chatboti/chatgpt/chatgpt.md',
      'jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md',
    ])
    const pair = pairs.get('chatgpt')
    expect(pair).toBeTruthy()
    expect(pair!.files.sk).toContain('chatgpt_sk.md')
    expect(pair!.files.en).toContain('chatgpt.md')
  })

  it('keeps a Slovak-only file alive (no English pair)', () => {
    const pairs = buildGuidePairs([
      'initial_info/glosar_pojmov.md',
    ])
    const pair = pairs.get('slovnik-pojmov')
    expect(pair).toBeTruthy()
    expect(pair!.files.sk).toBeTruthy()
    expect(pair!.files.en).toBeUndefined()
  })
})

describe('resolveGuideFile', () => {
  const pairs = buildGuidePairs([
    'jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md',
    'jednotlive_usecases/administrativa/pisanie_emailu/writing_email.md',
    'initial_info/glosar_pojmov.md',
  ])

  it('returns the preferred locale path when available', () => {
    const r = resolveGuideFile(pairs, 'pisanie-emailu', 'en')
    expect(r.path).toContain('writing_email.md')
    expect(r.usedFallback).toBe(false)
  })

  it('falls back to the other locale when preferred is missing', () => {
    const r = resolveGuideFile(pairs, 'slovnik-pojmov', 'en')
    expect(r.path).toContain('glosar_pojmov.md')
    expect(r.usedFallback).toBe(true)
  })

  it('returns null for unknown slug', () => {
    const r = resolveGuideFile(pairs, 'no-such-guide', 'sk')
    expect(r.path).toBeNull()
    expect(r.usedFallback).toBe(false)
  })
})
