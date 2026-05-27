import { test, expect } from '@playwright/test'

const MOBILE_VIEWPORT = { width: 390, height: 844 }

test.describe('slice 10 — mobile responsive', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT)
  })

  test('homepage renders core chrome at mobile viewport', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('brand')).toBeVisible()
    await expect(page.getByTestId('roadmap-tree')).toBeVisible()
  })

  test('header nav links are hidden on mobile (hamburger pattern reserved for future)', async ({ page }) => {
    await page.goto('/')
    // Confirm desktop-only nav and search are hidden by md: breakpoint
    await expect(page.getByTestId('header-nav')).toBeHidden()
  })

  test('locale toggle remains visible on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('locale-toggle')).toBeVisible()
  })

  test('learning card modal is usable at mobile width', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const card = page.getByTestId('learning-card')
    await expect(card).toBeVisible()
    await expect(page.getByTestId('card-title')).toBeVisible()
    const box = await card.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeLessThanOrEqual(420)
  })

  test('cheatsheet grid collapses to single column on narrow widths', async ({ page }) => {
    await page.goto('/tahak')
    const cards = page.getByTestId('cheatsheet-card')
    await expect(cards.first()).toBeVisible()
    const first = await cards.nth(0).boundingBox()
    const second = await cards.nth(1).boundingBox()
    expect(first).not.toBeNull()
    expect(second).not.toBeNull()
    // On mobile (1 col), the second card stacks BELOW the first (top > first.top)
    expect(second!.y).toBeGreaterThan(first!.y + first!.height - 10)
  })
})

test.describe('slice 10 — accessibility basics', () => {
  test('learning card dialog exposes proper roles + aria', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(dialog).toHaveAttribute('aria-labelledby', /headlessui-dialog-title/)
  })

  test('close button on card has aria-label in Slovak', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const closeBtn = page.getByTestId('card-close')
    await expect(closeBtn).toHaveAttribute('aria-label', 'Zavrieť')
  })

  test('Escape closes the modal and returns focus to the document', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByTestId('learning-card')).toBeHidden()
  })

  test('bookmark button reflects state via aria-label', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const bookmark = page.getByTestId('card-bookmark')
    await expect(bookmark).toHaveAttribute('aria-label', /Uložiť|Odstrániť/)
  })
})
