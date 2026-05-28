import { test, expect } from '@playwright/test'

test.describe('smoke', () => {
  test('header brand renders with logo + tagline', async ({ page }) => {
    await page.goto('/')
    const brand = page.getByTestId('brand')
    await expect(brand).toBeVisible()
    await expect(brand.locator('img')).toBeVisible()
    await expect(brand).toContainText(/AI PREMNA/)
  })

  test('all main routes return 200', async ({ page }) => {
    for (const route of ['/', '/tahak', '/ulozene', '/naposledy', '/mapa-dopadu']) {
      const res = await page.goto(route)
      expect(res?.status(), `${route}`).toBe(200)
    }
  })
})
