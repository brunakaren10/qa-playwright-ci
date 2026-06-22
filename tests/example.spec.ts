import { test, expect } from '@playwright/test';

test('Home page deve carregar', async ({ page }) => {

  await page.goto('https://playwright.dev');

  await expect(page).toHaveTitle(/Playwright/);

});