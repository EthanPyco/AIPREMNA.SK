import { test, expect } from '@playwright/test'

test.describe('slice 7 — last used', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  })

  test('lastused page shows empty state initially', async ({ page }) => {
    await page.goto('/naposledy')
    await expect(page.getByTestId('lastused-empty')).toBeVisible()
  })

  test('a guide opened for at least 10s and then closed appears on /naposledy', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.waitForTimeout(10_500)
    await page.getByTestId('card-close').click()
    await expect(page.getByTestId('learning-card')).toBeHidden()

    await page.goto('/naposledy')
    const item = page.locator('[data-testid="lastused-item"][data-slug="pisanie-emailu"]')
    await expect(item).toBeVisible()
    await expect(item).toContainText('Písanie e-mailov')
  })

  test('a guide closed before 10s does NOT appear on /naposledy', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.waitForTimeout(2000)
    await page.getByTestId('card-close').click()

    await page.goto('/naposledy')
    await expect(page.getByTestId('lastused-empty')).toBeVisible()
  })

  test('clear-all empties the list', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.waitForTimeout(10_500)
    await page.getByTestId('card-close').click()
    await expect(page.getByTestId('learning-card')).toBeHidden()

    await page.goto('/naposledy')
    await expect(page.getByTestId('lastused-item')).toHaveCount(1)
    await page.getByTestId('lastused-clear').click()
    await expect(page.getByTestId('lastused-empty')).toBeVisible()
  })

  test('opening the same guide twice dedupes to a single entry', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.waitForTimeout(10_500)
    await page.getByTestId('card-close').click()
    await expect(page.getByTestId('learning-card')).toBeHidden()

    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.waitForTimeout(10_500)
    await page.getByTestId('card-close').click()
    await expect(page.getByTestId('learning-card')).toBeHidden()

    await page.goto('/naposledy')
    await expect(page.getByTestId('lastused-item')).toHaveCount(1)
  })
})
