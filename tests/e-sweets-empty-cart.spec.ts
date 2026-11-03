import { test, expect } from '@playwright/test';
import { cartLink } from '../page-objects/e-sweets-selectors';

// Свой адрес для этого набора: общая конфигурация относится к другому сайту.
test.use({ baseURL: 'https://vladivostok.e-sweets.ru/' });

test('ES-CART-01: переход в пустую корзину из шапки', async ({ page }) => {
  await test.step('Открыть главную страницу в новой сессии', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Проверить нулевое количество товаров и открыть корзину', async () => {
    const cart = page.locator(cartLink);
    await expect(cart).toBeVisible();
    await expect(cart).toContainText(/Корзина\s*\(0\)/);
    await cart.click();
  });

  await test.step('Проверить адрес и сообщение пустой корзины', async () => {
    await expect(page).toHaveURL('https://vladivostok.e-sweets.ru/cart/');
    await expect(page.getByText('Ваша корзина пуста.', { exact: true })).toBeVisible();
  });
});
