import { test, expect } from '@playwright/test'

test.describe('slice 4 — progress tracking', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  })

  test('checklist renders one item per mastery bullet', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('card-checklist')).toBeVisible()
    const items = page.getByTestId('checklist-item')
    await expect(items).toHaveCount(6)
  })

  test('checking an item updates the progress ring percentage', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const ring = page.getByTestId('progress-ring')
    await expect(ring).toBeVisible()
    await expect(ring).toHaveAttribute('data-percent', '0')

    const items = page.getByTestId('checklist-item')
    await items.nth(0).click()
    await expect(ring).toHaveAttribute('data-percent', '17')

    await items.nth(1).click()
    await items.nth(2).click()
    await expect(ring).toHaveAttribute('data-percent', '50')
  })

  test('check state persists across page reload', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const items = page.getByTestId('checklist-item')
    await items.nth(0).click()
    await items.nth(1).click()
    await expect(items.nth(0)).toHaveAttribute('data-checked', 'true')
    await expect(items.nth(1)).toHaveAttribute('data-checked', 'true')

    await page.reload()
    await expect(page.getByTestId('card-checklist')).toBeVisible()
    const itemsAfter = page.getByTestId('checklist-item')
    await expect(itemsAfter.nth(0)).toHaveAttribute('data-checked', 'true')
    await expect(itemsAfter.nth(1)).toHaveAttribute('data-checked', 'true')
    await expect(itemsAfter.nth(2)).toHaveAttribute('data-checked', 'false')
  })

  test('completing all items takes percent to 100', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('card-checklist')).toBeVisible()
    const items = page.getByTestId('checklist-item')
    const count = await items.count()
    for (let i = 0; i < count; i++) {
      await items.nth(i).click()
      await expect(items.nth(i)).toHaveAttribute('data-checked', 'true')
    }
    await expect(page.getByTestId('progress-ring')).toHaveAttribute('data-percent', '100')
  })

  test('toggling an item off reduces the percent', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const items = page.getByTestId('checklist-item')
    await items.nth(0).click()
    await expect(page.getByTestId('progress-ring')).toHaveAttribute('data-percent', '17')
    await items.nth(0).click()
    await expect(page.getByTestId('progress-ring')).toHaveAttribute('data-percent', '0')
  })

  test('opening a card sets aipremna:seen entry for the slug', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    const seen = await page.evaluate(() => localStorage.getItem('aipremna:seen'))
    expect(seen).toBeTruthy()
    const parsed = JSON.parse(seen ?? '{}')
    expect(parsed['pisanie-emailu']).toBeGreaterThan(0)
  })
})
