import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('SauceDemo smoke tests @smoke', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    const inventoryPage = await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(page).toHaveURL(/\/inventory\.html/);
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('Epic sadface');
  });
});
