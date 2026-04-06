import { test, expect } from '../fixtures/base';

test.describe('Contact list - App smoke tests E2E', () => {
  test('Home page loads', async ({ loginPage }) => {
    await loginPage.gotoHome();
    await expect(loginPage.page).toHaveTitle(/Contact List App/);
  });

  test('Login form is visible', async ({ loginPage }) => {
    await loginPage.gotoHome();
    await loginPage.expectLoginFormVisible();
  });

  test('Sign up link works', async ({ loginPage, registrationPage }) => {
    await loginPage.gotoHome();
    await registrationPage.gotoSignUp();
    await registrationPage.expectSignUpFormVisible();
  });

  test('API Docs link is visible', async ({ loginPage }) => {
    await loginPage.gotoHome();
    await expect(loginPage.apiDocsLink).toBeVisible();
    await expect(loginPage.apiDocsLink).toHaveAttribute(
      'href',
      /documenter\.getpostman\.com/,
    );
  });
});
