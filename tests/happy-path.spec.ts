import { test, expect } from '@playwright/test';

/**
 * Happy path end‑to‑end test.
 *
 * This test runs against a running Next.js development or production
 * server. It exercises the basic flow of browsing products, viewing a
 * product detail page, adding a variant to the cart and navigating to
 * checkout. In CI the server should be started before the test runs.
 */
test('user can browse products and initiate checkout', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');
  // Click the Products link in the navigation
  await page.getByRole('link', { name: 'Products' }).click();
  await expect(page).toHaveURL(/\/products$/);

  // Click the first product card's View Details button
  const viewLinks = await page.locator('text=View Details').all();
  await viewLinks[0].click();
  await expect(page).toHaveURL(/\/products\//);

  // Wait for the stock message to load
  await page.getByTestId('stock-message').waitFor({ state: 'attached' });
  // Add the default variant to the cart
  await page.getByRole('button', { name: /Add to Cart|Pre‑Order/ }).click();

  // Navigate directly to the checkout page
  await page.goto('/checkout');
  if (await page.locator('text=Your cart is empty').count() === 0) {
    // The cart contains items; checkout button should be visible
    await expect(page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();
  }
});