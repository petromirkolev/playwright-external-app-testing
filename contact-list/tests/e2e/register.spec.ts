import { test } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { invalidEmail, invalidPassword } from '../../utils/test-data';

test.describe('Contact list - User register E2E', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.gotoSignUp();
  });

  test('Sign up with unique valid data succeeds', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp(registrationData);
    await registrationPage.expectSignUpFormNotVisible();
  });

  test('Sign up with duplicate data is rejected', async ({
    registrationPage,
    contactsPage,
    registrationData,
  }) => {
    await registrationPage.signUp(registrationData);
    await registrationPage.expectSignUpFormNotVisible();

    await contactsPage.logout();

    await registrationPage.gotoSignUp();
    await registrationPage.signUp(registrationData);

    await registrationPage.expectError(msg.AUTH_DUP_EMAIL);
  });

  test('Sign up with missing first name is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, firstName: '' });
    await registrationPage.expectError(msg.USER_REQ_FIRST_NAME);
  });

  test('Sign up with missing last name is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, lastName: '' });
    await registrationPage.expectError(msg.USER_REQ_LAST_NAME);
  });

  test('Sign up with missing email is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, email: '' });
    await registrationPage.expectError(msg.USER_REQ_EMAIL);
  });

  test('Sign up with missing password is rejected', async ({
    registrationPage,
    registrationData,
  }) => {
    await registrationPage.signUp({ ...registrationData, password: '' });
    await registrationPage.expectError(msg.USER_REQ_PASS);
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
