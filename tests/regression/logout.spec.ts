import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { logBug } from '../../utils/bugLogger';

test.describe('Logout flow @regression', () => {
  test('should logout successfully and redirect to login page', async ({ page }, testInfo) => {
    try {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');

      await page.locator('#react-burger-menu-btn').click();
      await page.locator('#logout_sidebar_link').click();

      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.locator('#login-button')).toBeVisible();
    } catch (error) {
      await logBug({ titulo: 'Falha no fluxo de logout', testInfo, error, page });
      throw error;
    }
  });
});
