import { expect, test, type Page } from '@playwright/test'

async function answer(page: Page) {
  const tf = page.getByTestId('tf-true')
  const matchLeft = page.locator('[data-testid^="match-left-"]')
  const orderItem = page.locator('[data-testid^="order-item-"]')
  const choice = page.locator('button[data-testid^="choice-"]')

  if (await tf.count()) {
    await tf.click()
  } else if (await matchLeft.count()) {
    const n = await matchLeft.count()
    const rights = page.locator('[data-testid^="match-right-"]')
    for (let i = 0; i < n; i += 1) {
      await matchLeft.nth(i).click()
      await rights.nth(i).click()
    }
    await page.getByTestId('lock-in').click()
  } else if (await orderItem.count()) {
    const n = await orderItem.count()
    for (let i = 0; i < n; i += 1) {
      await page.locator('[data-testid="order-pool"] [data-testid^="order-item-"]').first().click()
      await page.getByTestId(`order-slot-${i}`).click()
    }
    await page.getByTestId('lock-in').click()
  } else {
    await choice.first().click()
  }
  await page.getByTestId('next').click()
}

test('start, five questions, quote, play again', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto('/')
  await expect(page.getByTestId('mode-russia')).toBeVisible()
  await expect(page.getByTestId('mode-neanderthal')).toBeVisible()
  await expect(page.getByTestId('mode-teacher')).toBeVisible()
  await expect(page.getByTestId('mode-cyber')).toBeVisible()
  await expect(page.getByTestId('brand-mark')).toBeVisible()
  await expect(page.getByTestId('brand-pattern')).toBeVisible()
  await expect(page.getByTestId('brand-mark')).not.toHaveAttribute('data-progress')
  await page.getByTestId('lang-en').click()
  await expect(page.getByTestId('mode-russia')).toHaveText('Quiz about Russia')
  await page.getByTestId('mode-russia').click()
  await expect(
    page.locator('button[data-testid^="choice-"], [data-testid="tf-true"], [data-testid^="match-left-"], [data-testid^="order-item-"]').first(),
  ).toBeVisible({ timeout: 12000 })
  await expect(page.getByTestId('brand-mark')).toHaveAttribute('data-progress', '1')
  await expect(page.locator('[data-body-state="ask"]')).toHaveCSS('opacity', '0')
  for (let i = 0; i < 5; i += 1) {
    await answer(page)
  }
  await expect(page.getByTestId('again')).toBeVisible()
  await expect(page.getByTestId('home')).toHaveText('Back to home')
  await page.getByTestId('again').click()
  await expect(
    page.locator('button[data-testid^="choice-"], [data-testid="tf-true"], [data-testid^="match-left-"], [data-testid^="order-item-"]').first(),
  ).toBeVisible({ timeout: 12000 })
})

test('selected body grows toward the camera without oscillating', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto('/')
  await page.getByTestId('mode-russia').click()
  const body = page.locator('[data-body-state="zoom"]')
  await expect(body).toBeVisible()

  const widths: number[] = []
  for (let i = 0; i < 14; i += 1) {
    const box = await body.boundingBox()
    if (box) widths.push(box.width)
    await page.waitForTimeout(70)
  }

  expect(widths.length).toBeGreaterThan(8)
  const first = widths[0]!
  const last = widths[widths.length - 1]!
  expect(last).toBeGreaterThan(first + 6)

  let reversals = 0
  for (let i = 1; i < widths.length; i += 1) {
    if (widths[i]! + 2 < widths[i - 1]!) reversals += 1
  }
  expect(reversals).toBe(0)
})

test('film grain stays over a planet while it zooms in', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto('/')
  await page.getByTestId('mode-russia').click()
  const body = page.locator('[data-body-state="zoom"]')
  await expect(body).toBeVisible()
  await expect(page.getByTestId('mode-overlay')).toBeVisible()
  await expect(page.getByTestId('mode-overlay')).toContainText('Викторина о России')
  await expect(page.getByTestId('mode-overlay')).toContainText('5 вопросов')

  const [grainZ, bodyZ, titleZ] = await page.evaluate(() => {
    const grain = document.querySelector('[data-testid="film-grain"]')
    const zoom = document.querySelector('[data-body-state="zoom"]')
    const title = document.querySelector('[data-testid="mode-overlay"]')
    const z = (el: Element | null) => Number(el ? getComputedStyle(el).zIndex : NaN)
    return [z(grain), z(zoom?.parentElement ?? null), z(title)]
  })

  expect(grainZ).toBeGreaterThan(bodyZ)
  expect(grainZ).toBeGreaterThan(titleZ)
})

test('restart returns to the start screen', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto('/')
  await page.getByTestId('mode-russia').click()
  await expect(page.getByTestId('restart')).toBeVisible({ timeout: 12000 })
  await page.getByTestId('restart').click()
  await expect(page.getByTestId('mode-russia')).toBeVisible()
})

test('neanderthal mode reaches questions and can leave', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto('/')
  await page.getByTestId('mode-neanderthal').click()
  await expect(page.getByTestId('mode-overlay')).toContainText('Мифы о неандертальцах')
  await expect(page.getByTestId('restart')).toBeVisible()
  await expect(page.getByTestId('tf-true')).toBeVisible({ timeout: 12000 })
  await expect(page.getByTestId('tf-false')).toHaveText('Миф')
  await expect(page.locator('button[data-testid^="choice-"]')).toHaveCount(0)
  await page.getByTestId('restart').click()
  await expect(page.getByTestId('mode-russia')).toBeVisible()
})

test('teacher mode shows a stub then returns home', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto('/')
  await page.getByTestId('mode-teacher').click()
  await expect(page.getByTestId('stub')).toBeVisible({ timeout: 12000 })
  await page.getByTestId('home').click()
  await expect(page.getByTestId('mode-russia')).toBeVisible()
})

test('orbit tracks leave after the home screen', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto('/')
  await expect(page.getByTestId('orbit-path-a')).toBeVisible()
  await page.getByTestId('mode-cyber').click()
  await expect(page.getByTestId('question-panel')).toBeVisible({ timeout: 12000 })
  await expect(page.getByTestId('orbit-path-a')).toHaveCount(0)
  await expect(page.getByTestId('orbit-path-b')).toHaveCount(0)
})
