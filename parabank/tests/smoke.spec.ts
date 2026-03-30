import { test, expect } from '@playwright/test';

test('Home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ParaBank/i);
});
