import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { extractChecklist } from '../../../shared/parser/extractChecklist'

const FIXTURES = {
  usecasePisanieEmailu: resolve(__dirname, '../../../jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md'),
  toolChatgptSk: resolve(__dirname, '../../../jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md'),
}

describe('extractChecklist', () => {
  it('extracts the mastery checklist from a usecase guide', () => {
    const md = readFileSync(FIXTURES.usecasePisanieEmailu, 'utf8')
    const items = extractChecklist(md)

    expect(items.length).toBe(6)
    expect(items[0].text).toMatch(/^Vytvoriť prompt pre AI/)
    expect(items[1].text).toMatch(/^Rozlíšiť, kedy je vhodné/)
    expect(items.every((i) => i.id.length >= 4)).toBe(true)
  })

  it('extracts the mastery checklist from a tool guide (different heading wording)', () => {
    const md = readFileSync(FIXTURES.toolChatgptSk, 'utf8')
    const items = extractChecklist(md)

    expect(items.length).toBe(2)
    expect(items[0].text).toMatch(/^Úspešne vygenerovať/)
  })

  it('stops before the next H2 (does not include optional extension bullets)', () => {
    const md = `## ✅ Mastery
* one
* two

## 🚀 Voliteľné rozšírenie
* three
* four`
    const items = extractChecklist(md)
    expect(items.map((i) => i.text)).toEqual(['one', 'two'])
  })

  it('returns empty array when no mastery section exists', () => {
    expect(extractChecklist('# Title\n\nJust some prose.')).toEqual([])
  })

  it('produces stable IDs for the same text', () => {
    const md = `## ✅ Mastery
* same text`
    const a = extractChecklist(md)
    const b = extractChecklist(md)
    expect(a[0].id).toBe(b[0].id)
  })
})
