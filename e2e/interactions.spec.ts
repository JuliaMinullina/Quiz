import { expect, test, type Page } from '@playwright/test'

const MISSIONS = [
  'poehali',
  'chaika',
  'kolybel-razuma',
  'lunnaya',
  'dvenadcat',
  'mir',
  'ekipazh',
  'polusharie',
  'siyanie',
  'sosedka',
] as const

async function startMission(page: Page, missionId: (typeof MISSIONS)[number]) {
  await page.addInitScript((shown) => {
    localStorage.clear()
    localStorage.setItem('orbita-rossii:missions', JSON.stringify(shown))
  }, MISSIONS.filter((id) => id !== missionId))
  await page.goto('/')
  await page.getByTestId('mode-russia').click()
  await expect(page.getByTestId('question-panel')).toBeVisible({ timeout: 12000 })
}

test('match draws a line, can disconnect, then lock in', async ({ page }) => {
  await startMission(page, 'polusharie')
  await expect(page.getByTestId('match-left-ob')).toBeVisible()

  await page.getByTestId('match-left-ob').click()
  await page.getByTestId('match-right-ob').click()
  await expect(page.locator('path.pair-line[d=""], path.pair-line.is-live')).toHaveCount(1)
  await expect(page.locator('path.pair-line:not(.is-live)')).toHaveCount(1)

  await page.getByTestId('match-left-ob').click()
  await expect(page.locator('path.pair-line:not(.is-live)')).toHaveCount(0)

  const lefts = ['ob', 'lena', 'amur', 'neva']
  for (const id of lefts) {
    await page.getByTestId(`match-left-${id}`).click()
    await page.getByTestId(`match-right-${id}`).click()
  }
  await expect(page.locator('path.pair-line:not(.is-live)')).toHaveCount(4)
  await page.getByTestId('lock-in').click()
  await expect(page.getByText('Обь впадает в Обскую губу')).toBeVisible()
  await expect(page.getByTestId('next')).toBeVisible()
})

async function openOrderQuestion(page: Page) {
  await startMission(page, 'siyanie')
  await page.locator('[data-testid^="choice-"]').first().click()
  await page.getByTestId('next').click()
  await page.locator('[data-testid^="choice-"]').first().click()
  await page.getByTestId('next').click()
  await expect(page.getByTestId('order-pool')).toBeVisible()
}

test('order can return a card, then lock in with the fact', async ({ page }) => {
  await openOrderQuestion(page)
  await page.getByTestId('order-item-msu').click()
  await page.getByTestId('order-slot-0').click()
  await expect(page.locator('[data-testid="order-slot-0"] [data-testid="order-item-msu"]')).toBeVisible()

  await page.getByTestId('order-item-msu').click()
  await expect(page.locator('[data-testid="order-pool"] [data-testid="order-item-msu"]')).toBeVisible()

  const ids = ['msu', 'lobachevsky', 'table', 'nobel']
  for (let i = 0; i < ids.length; i += 1) {
    await page.locator('[data-testid="order-pool"] [data-testid^="order-item-"]').first().click()
    await page.getByTestId(`order-slot-${i}`).click()
  }
  await page.getByTestId('lock-in').click()
  await expect(page.getByText('Университет открыли в 1755 году')).toBeVisible()
  await expect(page.getByTestId('next')).toBeVisible()
})

test('order cards fill the leftover height and follow the pointer while dragging', async ({ page }) => {
  await openOrderQuestion(page)

  const card = page.getByTestId('order-item-msu')
  const cardBox = await card.boundingBox()
  expect(cardBox).toBeTruthy()
  expect(cardBox!.height).toBeGreaterThan(140)
  await expect(page.locator('.absolute.top-\\[1\\.35rem\\].h-px')).toHaveCount(0)

  const slot = page.getByTestId('order-slot-3')
  const slotBox = await slot.boundingBox()
  expect(slotBox).toBeTruthy()

  await page.mouse.move(cardBox!.x + cardBox!.width / 2, cardBox!.y + cardBox!.height / 2)
  await page.mouse.down()
  await page.mouse.move(slotBox!.x + slotBox!.width / 2, slotBox!.y + slotBox!.height / 2, { steps: 12 })

  const clone = page.getByTestId('order-drag-clone')
  await expect(clone).toBeVisible()
  const cloneBox = await clone.boundingBox()
  expect(cloneBox).toBeTruthy()
  expect(Math.abs(cloneBox!.x + cloneBox!.width / 2 - (slotBox!.x + slotBox!.width / 2))).toBeLessThan(80)
  expect(Math.abs(cloneBox!.y + cloneBox!.height / 2 - (slotBox!.y + slotBox!.height / 2))).toBeLessThan(80)

  await page.mouse.up()
  await expect(clone).toHaveCount(0)
  await expect(page.locator('[data-testid="order-slot-3"] [data-testid="order-item-msu"]')).toBeVisible()
})

test('choice fact sits inside the correct card', async ({ page }) => {
  await startMission(page, 'siyanie')
  const panel = page.getByTestId('question-panel')
  const before = await panel.boundingBox()
  await page.getByTestId('choice-wrangel').click()
  const card = page.getByTestId('choice-wrangel')
  const fact = card.locator('.answer-fact')
  await expect(fact).toBeVisible()
  await expect(fact).toContainText('объект ЮНЕСКО')
  await expect(page.getByTestId('next')).toBeVisible()
  const after = await panel.boundingBox()
  const cardBox = await card.boundingBox()
  const factBox = await fact.boundingBox()
  expect(before).toBeTruthy()
  expect(after).toBeTruthy()
  expect(cardBox).toBeTruthy()
  expect(factBox).toBeTruthy()
  expect(Math.abs((after?.height ?? 0) - (before?.height ?? 0))).toBeLessThan(2)
  expect(factBox!.y + factBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height + 1)
  const overflow = await fact.evaluate((el) => el.scrollHeight - el.clientHeight)
  expect(overflow).toBeLessThanOrEqual(2)
})

test('map does not name the place before an answer', async ({ page }) => {
  await startMission(page, 'mir')
  await expect(page.getByText('Самая северная материковая точка')).toBeVisible()
  await expect(page.getByText('мыс Челюскин')).toHaveCount(0)
  await page.getByTestId('choice-chelyuskin').click()
  await expect(page.locator('svg text', { hasText: 'мыс Челюскин' })).toBeVisible()
})

test('map recedes after an answer so the fact fits in the card', async ({ page }) => {
  await startMission(page, 'mir')
  const stage = page.getByTestId('choice-map-stage')
  const before = await stage.boundingBox()
  expect(before).toBeTruthy()

  await page.getByTestId('choice-chelyuskin').click()
  const fact = page.getByTestId('choice-chelyuskin').locator('.answer-fact')
  await expect(fact).toBeVisible()
  await expect(page.getByTestId('choice-map')).toHaveClass(/choice-map--revealed/)
  await page.waitForTimeout(520)

  const after = await stage.boundingBox()
  const card = page.getByTestId('choice-chelyuskin')
  const cardBox = await card.boundingBox()
  const factBox = await fact.boundingBox()
  expect(after).toBeTruthy()
  expect(cardBox).toBeTruthy()
  expect(factBox).toBeTruthy()
  expect(after!.height).toBeLessThan(before!.height - 40)
  expect(factBox!.y + factBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height + 1)
  const overflow = await fact.evaluate((el) => el.scrollHeight - el.clientHeight)
  expect(overflow).toBeLessThanOrEqual(2)
})

test('match panel height stays put when Done appears', async ({ page }) => {
  await startMission(page, 'polusharie')
  const panel = page.getByTestId('question-panel')
  const before = await panel.boundingBox()
  for (const id of ['ob', 'lena', 'amur', 'neva'] as const) {
    await page.getByTestId(`match-left-${id}`).click()
    await page.getByTestId(`match-right-${id}`).click()
  }
  await expect(page.getByTestId('lock-in')).toBeVisible()
  const mid = await panel.boundingBox()
  await page.getByTestId('lock-in').click()
  await expect(page.getByTestId('next')).toBeVisible()
  const after = await panel.boundingBox()
  expect(Math.abs((mid?.height ?? 0) - (before?.height ?? 0))).toBeLessThan(2)
  expect(Math.abs((after?.height ?? 0) - (before?.height ?? 0))).toBeLessThan(2)
})
