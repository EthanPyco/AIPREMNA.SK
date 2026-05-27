import { test, expect } from '@playwright/test'

async function gotoAndHydrate(page: import('@playwright/test').Page, url = '/') {
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
}

test.describe('slice 5 — search', () => {
  test('header search input is visible', async ({ page }) => {
    await gotoAndHydrate(page)
    await expect(page.getByTestId('search-input')).toBeVisible()
  })

  test('typing a query shows results that match', async ({ page }) => {
    await gotoAndHydrate(page)
    const input = page.getByTestId('search-input')
    await input.click()
    await page.keyboard.type('pisanie', { delay: 25 })

    const results = page.getByTestId('search-results')
    await expect(results).toBeVisible({ timeout: 10_000 })
    const firstResult = page.getByTestId('search-result').first()
    await expect(firstResult).toBeVisible()
    await expect(firstResult).toContainText(/pisanie|písanie|e-mail/i)
  })

  test('clicking a result opens the corresponding learning card', async ({ page }) => {
    await gotoAndHydrate(page)
    const input = page.getByTestId('search-input')
    await input.click()
    await page.keyboard.type('email', { delay: 25 })

    const firstResult = page.getByTestId('search-result').first()
    await expect(firstResult).toBeVisible({ timeout: 10_000 })
    const slug = await firstResult.getAttribute('data-slug')
    await firstResult.click()

    await expect(page.getByTestId('learning-card')).toBeVisible()
    expect(page.url()).toContain(`card=${slug}`)
  })

  test('a query with no matches shows the empty state', async ({ page }) => {
    await gotoAndHydrate(page)
    const input = page.getByTestId('search-input')
    await input.click()
    await page.keyboard.type('zzzzzzzzqqqqq', { delay: 15 })
    await expect(page.getByTestId('search-empty')).toBeVisible({ timeout: 10_000 })
  })

  test('clear button empties the input', async ({ page }) => {
    await gotoAndHydrate(page)
    const input = page.getByTestId('search-input')
    await input.click()
    await page.keyboard.type('email', { delay: 25 })
    await expect(page.getByTestId('search-clear')).toBeVisible()
    await page.getByTestId('search-clear').click()
    await expect(input).toHaveValue('')
  })

  test('Enter opens the first result', async ({ page }) => {
    await gotoAndHydrate(page)
    const input = page.getByTestId('search-input')
    await input.click()
    await page.keyboard.type('chatgpt', { delay: 25 })
    await expect(page.getByTestId('search-result').first()).toBeVisible({ timeout: 10_000 })
    await input.press('Enter')
    await expect(page.getByTestId('learning-card')).toBeVisible()
  })
})
