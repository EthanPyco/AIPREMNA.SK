import { test, expect } from '@playwright/test'

async function gotoAndHydrate(page: import('@playwright/test').Page, url: string) {
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
}

test.describe('slice 8 — cheatsheet + glossary', () => {
  test('cheatsheet grid renders prompt cards', async ({ page }) => {
    await gotoAndHydrate(page, '/tahak')
    await expect(page.getByTestId('cheatsheet-grid')).toBeVisible()
    const cards = page.getByTestId('cheatsheet-card')
    const count = await cards.count()
    expect(count).toBeGreaterThan(10)
  })

  test('filter input narrows the cards', async ({ page }) => {
    await gotoAndHydrate(page, '/tahak')
    const before = await page.getByTestId('cheatsheet-card').count()
    const filter = page.getByTestId('cheatsheet-filter')
    await filter.click()
    await page.keyboard.type('vypracuj', { delay: 25 })
    await expect.poll(() => page.getByTestId('cheatsheet-card').count()).toBeLessThan(before)
    const cards = page.getByTestId('cheatsheet-card')
    const first = cards.first()
    await expect(first).toContainText(/vypracuj/i)
  })

  test('switching to glossary tab shows term entries', async ({ page }) => {
    await gotoAndHydrate(page, '/tahak')
    await page.getByTestId('cheatsheet-tab-glossary').click()
    await expect(page.getByTestId('glossary-section')).toBeVisible()
    const items = page.getByTestId('glossary-item')
    const count = await items.count()
    expect(count).toBeGreaterThan(5)
    await expect(items.first()).toContainText(/LLM|Prompt|Halucinácia/i)
  })

  test('glossary filter narrows term list', async ({ page }) => {
    await gotoAndHydrate(page, '/tahak')
    await page.getByTestId('cheatsheet-tab-glossary').click()
    const before = await page.getByTestId('glossary-item').count()
    const filter = page.getByTestId('cheatsheet-filter')
    await filter.click()
    await page.keyboard.type('GDPR', { delay: 25 })
    await expect.poll(() => page.getByTestId('glossary-item').count()).toBeLessThan(before)
  })

  test('copying a prompt updates state and fills the clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await gotoAndHydrate(page, '/tahak')
    const copyBtn = page.getByTestId('cheatsheet-copy').first()
    await copyBtn.click()
    await expect(copyBtn).toHaveAttribute('data-state', 'copied')
    const clip = await page.evaluate(() => navigator.clipboard.readText())
    expect(clip.length).toBeGreaterThan(5)
  })
})
