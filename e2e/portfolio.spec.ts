import { expect, test, type Page } from '@playwright/test'

async function enterPortfolio(page: Page) {
  await page.goto('/')
  await page.getByRole('button', { name: 'Explore portfolio' }).click()
  await expect(page.getByRole('navigation', { name: 'Navigasi utama' })).toBeVisible({ timeout: 30_000 })
}

test('mounts the Three.js canvas without page errors', async ({ page }) => {
  const pageErrors: Error[] = []
  page.on('pageerror', (error) => pageErrors.push(error))
  await page.goto('/')

  await expect(page.locator('.spatial-background canvas')).toBeAttached()
  await expect(page.locator('.spatial-background canvas')).toBeVisible()
  expect(pageErrors).toEqual([])
})

test('renders glassmorphic project cards', async ({ page }) => {
  await enterPortfolio(page)
  const cards = page.locator('#proyek .project-card')

  await expect(page.locator('.discipline-marquee')).toBeAttached()
  await expect(page.locator('.spatial-atlas')).toBeAttached()
  await expect(page.locator('.spatial-route-stop')).toHaveCount(7)
  await expect(page.locator('.spatial-route-readout strong')).toHaveText('ORIGIN / 00')
  await expect(cards).toHaveCount(2)
  await expect(cards.first()).toHaveCSS('backdrop-filter', 'blur(14px)')
  await expect(cards.first()).toHaveCSS('border-top-color', 'rgba(238, 233, 225, 0.16)')
  await page.locator('#proyek').evaluate((section) => section.scrollIntoView({ block: 'center' }))
  await expect(cards.first()).toBeVisible()
  await cards.first().hover({ position: { x: 24, y: 24 } })
  await expect(cards.first()).toHaveClass(/is-tilting/)
  await expect(cards.first().locator('.project-spatial-layer')).toBeVisible()
  await expect(page.locator('.spatial-scanner')).toHaveClass(/is-visible/)
  await expect(page.locator('.spatial-route-readout strong')).toHaveText('PROJECTS / 02')
  await expect(page.locator('#spatial-atlas-title .heading-image-mask')).toBeAttached()
})

test('reveals words, imagery, and scroll progress across sections', async ({ page }) => {
  await enterPortfolio(page)

  await expect(page.locator('.section-seam')).toHaveCount(8)
  await expect(page.locator('.section-curtain')).toHaveCount(0)
  const heroWords = page.locator('.hero-copy h1 .motion-word')
  await expect(heroWords).toHaveCount(8)
  await page.locator('#proyek').evaluate((section) => {
    window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3, behavior: 'instant' })
  })
  await expect(page.locator('#proyek .section-heading h2 .motion-word').first()).toBeVisible()
  await expect(page.locator('#proyek .section-seam')).toBeVisible()
  const progress = await page.locator('.page-scroll-progress').evaluate(
    (element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m11,
  )
  expect(progress).toBeGreaterThan(0.05)
})
