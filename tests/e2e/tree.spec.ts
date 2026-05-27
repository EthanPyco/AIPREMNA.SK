import { test, expect } from '@playwright/test'

test.describe('slice 2 — roadmap tree', () => {
  test('homepage renders tree with root, tiers, categories, and leaves', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('page-title')).toHaveText('Vzdelávacia roadmapa AI')
    await expect(page.getByTestId('roadmap-tree')).toBeVisible()

    await expect(page.getByTestId('node-root')).toBeVisible()
    await expect(page.getByTestId('node-root')).toHaveText('AIPREMNA.SK')

    const tiers = page.getByTestId('node-tier')
    await expect(tiers.first()).toBeVisible()
    const tierCount = await tiers.count()
    expect(tierCount).toBeGreaterThanOrEqual(3)

    const leaves = page.getByTestId('node-leaf')
    await expect(leaves.first()).toBeVisible()
    const leafCount = await leaves.count()
    expect(leafCount).toBeGreaterThanOrEqual(20)
  })

  test('leaves carry stable slugs in a data attribute', async ({ page }) => {
    await page.goto('/')

    const pisanie = page.locator('[data-slug="pisanie-emailu"]')
    await expect(pisanie).toBeVisible()
    await expect(pisanie).toContainText(/pisanie-emailu|Pisanie/i)

    const chatgpt = page.locator('[data-slug="chatgpt"]')
    await expect(chatgpt).toBeVisible()
  })

  test('clicking a leaf emits open intent (console log for slice 2)', async ({ page }) => {
    const messages: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'log') messages.push(m.text())
    })
    await page.goto('/')
    // Wait for Vue Flow client-only hydration
    await expect(page.locator('[data-id="leaf:pisanie-emailu"]')).toBeVisible()
    await page.locator('[data-id="leaf:pisanie-emailu"]').dispatchEvent('click')
    await expect.poll(() => messages.join('|')).toMatch(/leaf selected.*pisanie-emailu/)
  })

  test('header navigation links render', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByTestId('header-nav')
    await expect(nav).toBeVisible()
    await expect(nav).toContainText('Ťahák promptov')
    await expect(nav).toContainText('Naposledy otvorené')
    await expect(nav).toContainText('Uložené')
  })
})
