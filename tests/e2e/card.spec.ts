import { test, expect } from '@playwright/test'

test.describe('slice 3 — learning card modal', () => {
  test('clicking a leaf opens the modal and reflects in URL', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-id="leaf:pisanie-emailu"]')).toBeVisible()
    await page.locator('[data-id="leaf:pisanie-emailu"]').dispatchEvent('click')

    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-title')).toContainText('Písanie e-mailov')

    expect(page.url()).toContain('card=pisanie-emailu')
  })

  test('pressing Escape closes the modal and clears URL', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByTestId('learning-card')).toBeHidden()
    await expect.poll(() => page.url()).not.toContain('card=')
  })

  test('opening direct deep link renders the card immediately', async ({ page }) => {
    await page.goto('/?card=chatgpt')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-title')).toContainText('ChatGPT')
  })

  test('card renders core sections from the guide', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('card-goal')).toBeVisible()
    await expect(page.getByTestId('card-workflow')).toBeVisible()
    await expect(page.getByTestId('card-prompts')).toBeVisible()
    await expect(page.getByTestId('card-human-loop')).toBeVisible()
    await expect(page.getByTestId('card-checklist')).toBeVisible()
  })

  test('copy button on a prompt copies the text to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/?card=pisanie-emailu')

    await expect(page.getByTestId('card-prompts')).toBeVisible()
    const firstCopy = page.getByTestId('prompt-copy').first()
    await firstCopy.click()

    await expect(firstCopy).toHaveAttribute('data-state', 'copied')

    const clipboard = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboard.length).toBeGreaterThan(0)
    expect(clipboard.toLowerCase()).toMatch(/vypracuj|prompt|pôsob/i)
  })

  test('close button (×) closes the modal', async ({ page }) => {
    await page.goto('/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.getByTestId('card-close').click()
    await expect(page.getByTestId('learning-card')).toBeHidden()
  })
})
