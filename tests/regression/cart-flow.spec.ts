import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { CartPage } from '../../src/pages/CartPage';

test.describe('Shopping cart regression @regression', () => {
  test('should add a product to the cart and validate the checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/\/cart\.html/);
    await expect(cartPage.productName).toContainText('Sauce Labs Backpack');
    await expect(cartPage.checkoutButton).toBeVisible();
  });
});
