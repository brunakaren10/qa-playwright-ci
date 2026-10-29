import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { CartPage } from '../../src/pages/CartPage';
import { logBug } from '../../utils/bugLogger';

test.describe('Cart item removal @regression', () => {
  test('should remove item from cart and show empty cart', async ({ page }, testInfo) => {
    try {
      const loginPage = new LoginPage(page);
      const cartPage = new CartPage(page);

      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');

      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('.shopping_cart_link').click();

      await expect(cartPage.productName).toContainText('Sauce Labs Backpack');

      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

      await expect(page.locator('.cart_item')).toHaveCount(0);
    } catch (error) {
      await logBug({ titulo: 'Falha ao remover item do carrinho', testInfo, error, page });
      throw error;
    }
  });
});
