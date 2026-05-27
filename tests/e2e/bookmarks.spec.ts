import { test, expect } from '@playwright/test'

test.describe('slice 6 — bookmarks', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  })

  test('bookmarks page shows empty state when nothing saved', async ({ page }) => {
    await page.goto('/ulozene')
    await expect(page.getByTestId('bookmarks-empty')).toBeVisible()
  })

  test('bookmarking a card from the modal adds it to /ulozene', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    const bookmark = page.getByTestId('card-bookmark')
    await expect(bookmark).toBeVisible()
    await expect(bookmark).toHaveAttribute('data-state', 'off')
    await bookmark.click()
    await expect(bookmark).toHaveAttribute('data-state', 'on')

    await page.goto('/ulozene')
    const item = page.locator('[data-testid="bookmark-card-item"][data-slug="pisanie-emailu"]')
    await expect(item).toBeVisible()
    await expect(item).toContainText('Písanie e-mailov')
  })

  test('unbookmarking removes the entry', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await page.getByTestId('card-bookmark').click()
    await page.goto('/ulozene')
    await expect(page.locator('[data-testid="bookmark-card-item"]')).toHaveCount(1)
    await page.getByTestId('bookmark-card-remove').click()
    await expect(page.getByTestId('bookmarks-empty')).toBeVisible()
  })

  test('bookmarking a prompt shows it under the Prompts tab', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('card-prompts')).toBeVisible()
    const firstPromptBookmark = page.getByTestId('prompt-bookmark').first()
    await firstPromptBookmark.click()
    await expect(firstPromptBookmark).toHaveAttribute('data-state', 'on')

    await page.goto('/ulozene')
    await page.getByTestId('bookmarks-tab-prompts').click()
    const item = page.getByTestId('bookmark-prompt-item').first()
    await expect(item).toBeVisible()
    await expect(item).toContainText('Písanie e-mailov')
  })

  test('switching tabs filters which sections are shown', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await page.getByTestId('card-bookmark').click()
    const firstPromptBookmark = page.getByTestId('prompt-bookmark').first()
    await firstPromptBookmark.click()

    await page.goto('/ulozene')
    await expect(page.getByTestId('bookmarks-cards')).toBeVisible()
    await expect(page.getByTestId('bookmarks-prompts')).toBeVisible()

    await page.getByTestId('bookmarks-tab-cards').click()
    await expect(page.getByTestId('bookmarks-cards')).toBeVisible()
    await expect(page.getByTestId('bookmarks-prompts')).toBeHidden()

    await page.getByTestId('bookmarks-tab-prompts').click()
    await expect(page.getByTestId('bookmarks-cards')).toBeHidden()
    await expect(page.getByTestId('bookmarks-prompts')).toBeVisible()
  })
})
