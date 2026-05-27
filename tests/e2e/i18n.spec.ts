import { test, expect } from '@playwright/test'

async function gotoAndHydrate(page: import('@playwright/test').Page, url: string) {
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
}

test.describe('slice 9 — locale toggle', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('locale toggle shows in header with SK active by default', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    const toggle = page.getByTestId('locale-toggle')
    await expect(toggle).toBeVisible()
    await expect(page.getByTestId('locale-toggle-sk')).toHaveAttribute('data-active', 'true')
    await expect(page.getByTestId('locale-toggle-en')).toHaveAttribute('data-active', 'false')
  })

  test('clicking EN switches the locale and persists', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    await page.getByTestId('locale-toggle-en').click()
    await expect(page.getByTestId('locale-toggle-en')).toHaveAttribute('data-active', 'true')
    const stored = await page.evaluate(() => localStorage.getItem('aipremna:locale'))
    expect(stored).toBe('en')

    await page.reload()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(400)
    await expect(page.getByTestId('locale-toggle-en')).toHaveAttribute('data-active', 'true')
  })

  test('opening a card after switching to EN renders the English guide', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    await page.getByTestId('locale-toggle-en').click()
    await page.waitForTimeout(200)
    await page.goto('/?card=pisanie-emailu')
    await page.waitForLoadState('networkidle')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-title')).toContainText(/Email|Writing/i)
  })

  test('EN with no translation falls back to SK and shows the badge', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    await page.getByTestId('locale-toggle-en').click()
    await page.waitForTimeout(200)
    // glossary is Slovak-only
    await page.goto('/?card=slovnik-pojmov')
    await page.waitForLoadState('networkidle')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-fallback-badge')).toBeVisible()
  })
})
