import { test, expect } from '@playwright/test';

test('Home page loads', async ({ request }) => {
  const response = await request.get('/');

  expect(response.status()).toBe(200);
});
