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

  test('Sign up with missing first name is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(
      '',
      registrationData.lastName,
      registrationData.email,
      registrationData.password,
    );

    await registrationPage.expectError('User validation failed');
  });

  test('Sign up with missing last name is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(
      registrationData.firstName,
      '',
      registrationData.email,
      registrationData.password,
    );

    await registrationPage.expectError('User validation failed');
  });

  test('Sign up with missing email is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(
      registrationData.firstName,
      registrationData.lastName,
      '',
      registrationData.password,
    );

    await registrationPage.expectError('User validation failed');
  });

  test('Sign up with missing password rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(
      registrationData.firstName,
      registrationData.lastName,
      registrationData.email,
      '',
    );

    await registrationPage.expectError('User validation failed');
  });
});

// - required field validation
// - invalid email format
// - password mismatch if supported
