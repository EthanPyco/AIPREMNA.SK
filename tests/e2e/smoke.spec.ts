import { test, expect } from '@playwright/test'

test.describe('slice 0 smoke', () => {
  test('homepage renders the brand and copy', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('brand')).toHaveText('AIPREMNA.SK')
    await expect(page.getByText('Vzdelávacia roadmapa AI pre slovenských učiteľov.')).toBeVisible()
  })

  test('design tokens load (primary color on brand heading)', async ({ page }) => {
    await page.goto('/')
    const brand = page.getByTestId('brand')
    await expect(brand).toBeVisible()
    const color = await brand.evaluate((el) => getComputedStyle(el).color)
    // #8175fb -> rgb(129, 117, 251)
    expect(color).toBe('rgb(129, 117, 251)')
  })
})
