import { describe, it, expect } from 'vitest'
import { slugify } from '../../../shared/parser/slugify'

describe('slugify', () => {
  it('converts snake_case to kebab-case', () => {
    expect(slugify('pisanie_emailu')).toBe('pisanie-emailu')
    expect(slugify('ai_overenie_odpovedi')).toBe('ai-overenie-odpovedi')
  })

  it('strips Slovak diacritics', () => {
    expect(slugify('Príručka pre učiteľov')).toBe('prirucka-pre-ucitelov')
    expect(slugify('Žiaľ čašník')).toBe('zial-casnik')
  })

  it('handles titles with colons and mixed punctuation', () => {
    expect(slugify('Písanie e-mailov pomocou AI: Príručka pre učiteľov')).toBe('pisanie-e-mailov-pomocou-ai-prirucka-pre-ucitelov')
  })

  it('collapses repeated separators', () => {
    expect(slugify('foo___bar---baz')).toBe('foo-bar-baz')
  })

  it('trims leading and trailing separators', () => {
    expect(slugify('---hello---')).toBe('hello')
    expect(slugify('___hi___')).toBe('hi')
  })

  it('is stable across reruns', () => {
    const input = 'Tvorba prezentácií'
    expect(slugify(input)).toBe(slugify(input))
  })
})
