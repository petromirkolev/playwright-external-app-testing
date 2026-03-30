import { test, expect } from '../fixtures/base';

test.describe('Register', () => {
  test('Registration page is loaded', async ({ registrationPage }) => {
    await registrationPage.gotoSignUp();

    await expect(registrationPage.page.getByText(/Add User/)).toBeVisible();
  });
});
