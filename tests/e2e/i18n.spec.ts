import { test, expect } from '@playwright/test'

async function gotoAndHydrate(page: import('@playwright/test').Page, url: string) {
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
}

test.describe('SK/EN locale toggle', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  })

  test('toggle visible with SK active by default', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    const toggle = page.getByTestId('locale-toggle')
    await expect(toggle).toBeVisible()
    await expect(page.getByTestId('locale-toggle-sk')).toHaveAttribute('data-active', 'true')
    await expect(page.getByTestId('locale-toggle-en')).toHaveAttribute('data-active', 'false')
  })

  test('clicking EN switches locale, persists, and translates header nav', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    await expect(page.getByTestId('header-nav')).toContainText('Mapa dopadu')

    await page.getByTestId('locale-toggle-en').click()
    await page.waitForTimeout(200)
    await expect(page.getByTestId('locale-toggle-en')).toHaveAttribute('data-active', 'true')

    await expect(page.getByTestId('header-nav')).toContainText('Impact map')
    await expect(page.getByTestId('page-title')).toContainText(/Save time/i)

    const stored = await page.evaluate(() => localStorage.getItem('aipremna:locale'))
    expect(stored).toBe('en')

    await page.reload()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(400)
    await expect(page.getByTestId('locale-toggle-en')).toHaveAttribute('data-active', 'true')
    await expect(page.getByTestId('header-nav')).toContainText('Impact map')
  })

  test('roadmap tier headings translate with locale', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    await expect(page.getByTestId('tier-foundation')).toContainText('Základy')

    await page.getByTestId('locale-toggle-en').click()
    await page.waitForTimeout(300)

    await expect(page.getByTestId('tier-foundation')).toContainText('Foundations')
    await expect(page.getByTestId('tier-usecases')).toContainText('Use cases')
    await expect(page.getByTestId('tier-tools')).toContainText('Specific tools')
  })

  test('opening a card after EN renders the English guide', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    await page.getByTestId('locale-toggle-en').click()
    await page.waitForTimeout(300)
    await page.goto('/?card=pisanie-emailu')
    await page.waitForLoadState('networkidle')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-title')).toContainText(/Email|Writing/i)
  })

  test('EN with no translation falls back to SK and shows the badge', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    await page.getByTestId('locale-toggle-en').click()
    await page.waitForTimeout(300)
    // glossary is Slovak-only
    await page.goto('/?card=slovnik-pojmov')
    await page.waitForLoadState('networkidle')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-fallback-badge')).toBeVisible()
  })
})
