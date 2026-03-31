import { test } from '../fixtures/auth';
import { invalidEmail, invalidPassword } from '../utils/test-data';

test.describe('Register', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.gotoSignUp();
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

    await registrationPage.gotoSignUp();

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

    await registrationPage.expectError('User validation failed: firstName');
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

    await registrationPage.expectError('User validation failed: lastName');
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

    await registrationPage.expectError('User validation failed: email');
  });

  test('Sign up with missing password is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(
      registrationData.firstName,
      registrationData.lastName,
      registrationData.email,
      '',
    );

    await registrationPage.expectError('User validation failed: password');
  });

  for (const key of Object.keys(invalidEmail) as Array<
    keyof typeof invalidEmail
  >) {
    const { description, data, message } = invalidEmail[key];

    test(description, async ({ registrationPage, registrationData }) => {
      await registrationPage.signUp(
        registrationData.firstName,
        registrationData.lastName,
        data,
        registrationData.password,
      );

      await registrationPage.expectError(message);
    });
  }

  for (const key of Object.keys(invalidPassword) as Array<
    keyof typeof invalidPassword
  >) {
    const { description, data, message } = invalidPassword[key];

    test(description, async ({ registrationPage, registrationData }) => {
      await registrationPage.signUp(
        registrationData.firstName,
        registrationData.lastName,
        registrationData.email,
        data,
      );

      await registrationPage.expectError(message);
    });
  }
});
