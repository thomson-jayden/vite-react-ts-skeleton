import { expect, test } from '@playwright/test'

test('shows forecast data returned by the weather API', async ({ page }) => {
  await page.route('**/weatherforecast', (route) =>
    route.fulfill({
      json: [
        {
          date: '2026-10-08',
          temperatureC: 18,
          temperatureF: 64,
          summary: 'Partly cloudy',
        },
      ],
    }),
  )

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Weather forecast' })).toBeVisible()
  await expect(page.getByRole('listitem')).toContainText('Partly cloudy')
  await expect(page.getByText('18°')).toBeVisible()
  await expect(page.getByText('1 DAY', { exact: true })).toBeVisible()
})