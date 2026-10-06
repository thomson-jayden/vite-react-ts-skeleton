import { expect, test } from '@playwright/test'

test('shows the Vite starter page and increments the counter', async ({ page }) => {
  const apiRequests: string[] = []
  page.on('request', (request) => {
    if (request.resourceType() === 'fetch' || request.resourceType() === 'xhr') {
      apiRequests.push(request.url())
    }
  })

  await page.goto('/')

  await expect(page).toHaveTitle('Vite + React')
  await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible()
  for (const name of ['Vite logo', 'React logo']) {
    const logo = page.getByRole('img', { name })
    await expect(logo).toBeVisible()
    await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
  }

  await page.getByRole('button', { name: 'count is 0', exact: true }).click()
  await expect(page.getByRole('button', { name: 'count is 1', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'count is 1', exact: true }).click()
  await expect(page.getByRole('button', { name: 'count is 2', exact: true })).toBeVisible()
  expect(apiRequests).toEqual([])
})