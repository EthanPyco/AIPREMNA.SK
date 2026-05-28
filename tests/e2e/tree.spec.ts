import { test, expect } from '@playwright/test'

async function gotoAndHydrate(page: import('@playwright/test').Page, url: string) {
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
}

test.describe('roadmap grid (replaces vue-flow tree)', () => {
  test('homepage renders hero + 3 tier sections', async ({ page }) => {
    await gotoAndHydrate(page, '/')

    await expect(page.getByTestId('hero')).toBeVisible()
    await expect(page.getByTestId('page-title')).toContainText(/Ušetrite čas|Save time/)

    await expect(page.getByTestId('roadmap-grid')).toBeVisible()
    await expect(page.getByTestId('tier-foundation')).toBeVisible()
    await expect(page.getByTestId('tier-usecases')).toBeVisible()
    await expect(page.getByTestId('tier-tools')).toBeVisible()
  })

  test('foundation tier renders ≥5 cards with real titles', async ({ page }) => {
    await gotoAndHydrate(page, '/')

    const foundationCards = page
      .getByTestId('tier-foundation')
      .getByTestId('roadmap-card')
    const count = await foundationCards.count()
    expect(count).toBeGreaterThanOrEqual(5)

    for (let i = 0; i < count; i++) {
      const text = (await foundationCards.nth(i).innerText()).trim()
      expect(text.length).toBeGreaterThan(3)
      // titles should NOT be raw slugs like "pisanie-emailu"
      expect(text).not.toMatch(/^[a-z0-9-]+$/)
    }
  })

  test('cards carry stable slugs in data-slug', async ({ page }) => {
    await gotoAndHydrate(page, '/')

    const pisanie = page.locator('[data-testid="roadmap-card"][data-slug="pisanie-emailu"]')
    await expect(pisanie).toBeVisible()

    const chatgpt = page.locator('[data-testid="roadmap-card"][data-slug="chatgpt"]')
    await expect(chatgpt).toBeVisible()
  })

  test('usecases are grouped under category headers', async ({ page }) => {
    await gotoAndHydrate(page, '/')

    const categories = page
      .getByTestId('tier-usecases')
      .getByTestId('usecases-category')
    const catCount = await categories.count()
    expect(catCount).toBeGreaterThanOrEqual(4)

    await expect(
      page.locator('[data-testid="usecases-category"][data-category="administrativa"]'),
    ).toBeVisible()
  })

  test('tools tier renders compact category cards', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    const tools = page.getByTestId('tier-tools')
    await expect(tools).toBeVisible()
    const toolCards = tools.getByTestId('roadmap-card')
    expect(await toolCards.count()).toBeGreaterThanOrEqual(5)
  })

  test('header navigation links render (including Mapa dopadu)', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    const nav = page.getByTestId('header-nav')
    await expect(nav).toBeVisible()
    await expect(nav).toContainText('Mapa dopadu')
    await expect(nav).toContainText('Ťahák promptov')
    await expect(nav).toContainText('Naposledy otvorené')
    await expect(nav).toContainText('Uložené')
  })
})
