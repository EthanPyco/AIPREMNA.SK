import { describe, it, expect } from 'vitest'

describe('slice 0 smoke', () => {
  it('vitest is wired correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('happy-dom environment is available', () => {
    const div = document.createElement('div')
    div.textContent = 'hello'
    expect(div.textContent).toBe('hello')
  })
})
