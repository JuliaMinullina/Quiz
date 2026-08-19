import { expect, test, type Page } from '@playwright/test'

async function bodyCentersOnTracks(page: Page) {
  return page.evaluate(() => {
    const stage = document.querySelector('[data-testid="orbit-stage"]')
    const svg = stage?.querySelector('svg')
    if (!stage || !svg) return { ok: false, reason: 'missing stage', rows: [] as const }

    const paths = {
      a: document.querySelector('[data-testid="orbit-path-a"]') as SVGGeometryElement | null,
      b: document.querySelector('[data-testid="orbit-path-b"]') as SVGGeometryElement | null,
    }
    if (!paths.a || !paths.b) return { ok: false, reason: 'missing paths', rows: [] as const }

    const onA = new Set(['kedra', 'alta', 'selena', 'mira', 'efir', 'par'])
    const skip = new Set(['kolybel'])

    const screenToSvg = (x: number, y: number) => {
      const pt = svg.createSVGPoint()
      pt.x = x
      pt.y = y
      const ctm = svg.getScreenCTM()
      if (!ctm) return { x, y }
      return pt.matrixTransform(ctm.inverse())
    }

    const distToPath = (path: SVGGeometryElement, x: number, y: number) => {
      const len = path.getTotalLength()
      const svgInv = svg.getScreenCTM()?.inverse()
      const pathCtm = path.getScreenCTM()
      if (!svgInv || !pathCtm) return Infinity
      let min = Infinity
      for (let i = 0; i <= 240; i += 1) {
        const p = path.getPointAtLength((i / 240) * len)
        const pt = svg.createSVGPoint()
        pt.x = p.x
        pt.y = p.y
        const u = pt.matrixTransform(pathCtm).matrixTransform(svgInv)
        min = Math.min(min, Math.hypot(u.x - x, u.y - y))
      }
      return min
    }

    const rows = [...stage.querySelectorAll('[data-testid^="body-"]')].map((el) => {
      const id = el.getAttribute('data-testid')?.replace('body-', '') ?? ''
      const box = el.getBoundingClientRect()
      const c = screenToSvg(box.left + box.width / 2, box.top + box.height / 2)
      const path = onA.has(id) ? paths.a! : paths.b!
      return { id, dist: distToPath(path, c.x, c.y), r: Math.min(box.width, box.height) / 2 }
    })

    const checked = rows.filter((row) => !skip.has(row.id))
    const worst = Math.max(...checked.map((row) => row.dist))
    return { ok: worst < 0.6, reason: `worst ${worst.toFixed(2)}`, rows: checked }
  })
}

test('field planets sit on the orbit paths in a wide window', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 541 })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')
  await expect(page.getByTestId('orbit-stage')).toBeVisible()
  const result = await bodyCentersOnTracks(page)
  expect(result, result.reason).toMatchObject({ ok: true })
})

test('field planets sit on the orbit paths at 16:9', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')
  await expect(page.getByTestId('orbit-stage')).toBeVisible()
  const result = await bodyCentersOnTracks(page)
  expect(result, result.reason).toMatchObject({ ok: true })
})

test('Kolybel crossing orbits wrap the planet, not a 300×150 stamp in the corner', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 541 })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')
  const orbit = page.getByTestId('kolybel-orbit-front')
  const body = page.getByTestId('body-kolybel')
  await expect(orbit).toBeVisible()
  const [orbitBox, bodyBox] = await Promise.all([orbit.boundingBox(), body.boundingBox()])
  expect(orbitBox).toBeTruthy()
  expect(bodyBox).toBeTruthy()
  const oc = { x: orbitBox!.x + orbitBox!.width / 2, y: orbitBox!.y + orbitBox!.height / 2 }
  const bc = { x: bodyBox!.x + bodyBox!.width / 2, y: bodyBox!.y + bodyBox!.height / 2 }
  expect(Math.abs(oc.x - bc.x)).toBeLessThan(8)
  expect(Math.abs(oc.y - bc.y)).toBeLessThan(8)
  expect(orbitBox!.width).toBeGreaterThan(bodyBox!.width * 1.15)
  expect(orbitBox!.height).toBeGreaterThan(bodyBox!.height * 1.15)
  expect(Math.abs(orbitBox!.width - orbitBox!.height)).toBeLessThan(12)
})
