import { test, expect } from '@playwright/test'

test.describe('slice 0 smoke', () => {
  test('header brand is rendered with primary design token', async ({ page }) => {
    await page.goto('/')
    const brand = page.getByTestId('brand')
    await expect(brand).toBeVisible()
    await expect(brand).toHaveText('AIPREMNA.SK')
    const color = await brand.evaluate((el) => getComputedStyle(el).color)
    // #8175fb -> rgb(129, 117, 251)
    expect(color).toBe('rgb(129, 117, 251)')
  })
})
