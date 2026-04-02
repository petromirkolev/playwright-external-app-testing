import { test } from '../fixtures/auth';
import {
  EMAIL_IN_USE,
  REQUIRED_EMAIL,
  REQUIRED_FIRST_NAME,
  REQUIRED_LAST_NAME,
  REQUIRED_PASSWORD,
} from '../utils/constants';
import { invalidEmail, invalidPassword } from '../utils/test-data';

test.describe('Register', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.gotoSignUp();
  });

  test('Sign up with unique valid data succeeds', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData });

    await registrationPage.expectSignUpFormNotVisible();
  });

  test('Sign up with duplicate data is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData });

    await registrationPage.expectSignUpFormNotVisible();

    await registrationPage.logOutButton.click();

    await registrationPage.gotoSignUp();

    await registrationPage.signUp({ ...registrationData });

    await registrationPage.expectError(EMAIL_IN_USE);
  });

  test('Sign up with missing first name is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, firstName: '' });

    await registrationPage.expectError(REQUIRED_FIRST_NAME);
  });

  test('Sign up with missing last name is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, lastName: '' });

    await registrationPage.expectError(REQUIRED_LAST_NAME);
  });

  test('Sign up with missing email is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, email: '' });

    await registrationPage.expectError(REQUIRED_EMAIL);
  });

  test('Sign up with missing password is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, password: '' });

    await registrationPage.expectError(REQUIRED_PASSWORD);
  });

  for (const key of Object.keys(invalidEmail) as Array<
    keyof typeof invalidEmail
  >) {
    const { description, data, message } = invalidEmail[key];

    test(description, async ({ registrationPage, registrationData }) => {
      await registrationPage.signUp({ ...registrationData, email: data });

      await registrationPage.expectError(message);
    });
  }

  for (const key of Object.keys(invalidPassword) as Array<
    keyof typeof invalidPassword
  >) {
    const { description, data, message } = invalidPassword[key];

    test(description, async ({ registrationPage, registrationData }) => {
      await registrationPage.signUp({ ...registrationData, password: data });

      await registrationPage.expectError(message);
    });
  }
});
