import { test, expect } from '@playwright/test'

async function gotoAndHydrate(page: import('@playwright/test').Page, url: string) {
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
}

test.describe('learning card modal', () => {
  test('clicking a roadmap card opens the modal and reflects in URL', async ({ page }) => {
    await gotoAndHydrate(page, '/')
    const card = page.locator('[data-testid="roadmap-card"][data-slug="pisanie-emailu"]')
    await expect(card).toBeVisible()
    await card.click()

    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-title')).toContainText(/e-?mail|písanie/i)

    expect(page.url()).toContain('card=pisanie-emailu')
  })

  test('pressing Escape closes the modal and clears URL', async ({ page }) => {
    await gotoAndHydrate(page, '/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByTestId('learning-card')).toBeHidden()
    await expect.poll(() => page.url()).not.toContain('card=')
  })

  test('opening direct deep link renders the card immediately', async ({ page }) => {
    await gotoAndHydrate(page, '/?card=chatgpt')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await expect(page.getByTestId('card-title')).toContainText('ChatGPT')
  })

  test('card renders core sections from the guide', async ({ page }) => {
    await gotoAndHydrate(page, '/?card=pisanie-emailu')
    await expect(page.getByTestId('card-goal')).toBeVisible()
    await expect(page.getByTestId('card-workflow')).toBeVisible()
    await expect(page.getByTestId('card-prompts')).toBeVisible()
    await expect(page.getByTestId('card-human-loop')).toBeVisible()
    await expect(page.getByTestId('card-checklist')).toBeVisible()
  })

  test('copy button on a prompt copies the text to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await gotoAndHydrate(page, '/?card=pisanie-emailu')

    await expect(page.getByTestId('card-prompts')).toBeVisible()
    const firstCopy = page.getByTestId('prompt-copy').first()
    await firstCopy.click()

    await expect(firstCopy).toHaveAttribute('data-state', 'copied')

    const clipboard = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboard.length).toBeGreaterThan(0)
    expect(clipboard.toLowerCase()).toMatch(/vypracuj|prompt|pôsob/i)
  })

  test('close button (×) closes the modal', async ({ page }) => {
    await gotoAndHydrate(page, '/?card=pisanie-emailu')
    await expect(page.getByTestId('learning-card')).toBeVisible()
    await page.getByTestId('card-close').click()
    await expect(page.getByTestId('learning-card')).toBeHidden()
  })
})
