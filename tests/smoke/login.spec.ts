import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { logBug } from '../../utils/bugLogger';

test.describe('SauceDemo smoke tests @smoke', () => {
  test('should login successfully with valid credentials', async ({ page }, testInfo) => {
    try {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      const inventoryPage = await loginPage.login('standard_user', 'secret_sauce');

      await expect(inventoryPage.pageTitle).toBeVisible();
      await expect(page).toHaveURL(/\/inventory\.html/);
    } catch (error) {
      await logBug({ titulo: 'Falha no login com credenciais válidas', testInfo, error, page });
      throw error;
    }
  });

  test('should display an error for invalid credentials', async ({ page }, testInfo) => {
    try {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('locked_out_user', 'secret_sauce');

      await expect(loginPage.errorMessage).toContainText('Epic sadface');
    } catch (error) {
      await logBug({ titulo: 'Falha na validação de erro de login bloqueado', testInfo, error, page });
      throw error;
    }
  });
});
