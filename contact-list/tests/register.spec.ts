import { test, expect } from '../fixtures/auth';

test.describe('Register', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoHome();
  });

  test('Sign up with unique valid data succeeds', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(
      registrationData.firstName,
      registrationData.lastName,
      registrationData.email,
      registrationData.password,
    );

    await registrationPage.expectSignUpFormNotVisible();
  });

  test('Sign up with duplicate data is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(
      registrationData.firstName,
      registrationData.lastName,
      registrationData.email,
      registrationData.password,
    );

    await registrationPage.expectSignUpFormNotVisible();

    await registrationPage.logOutButton.click();

    await registrationPage.signUp(
      registrationData.firstName,
      registrationData.lastName,
      registrationData.email,
      registrationData.password,
    );

    await registrationPage.expectError('Email address is already in use');
  });
});

// - required field validation
// - invalid email format
// - password mismatch if supported
