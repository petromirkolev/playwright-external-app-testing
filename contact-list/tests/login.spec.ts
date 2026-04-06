import { test } from '../fixtures/auth';
import { msg } from '../utils/constants';
import { invalidUserInput } from '../utils/test-data';

test.describe('User login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoHome();
  });

  test('Login with valid credentials succeeds', async ({
    registeredUserCredentials,
    loginPage,
  }) => {
    await loginPage.login(registeredUserCredentials);
    await loginPage.expectSuccess();
  });

  test('Login with invalid email is rejected', async ({
    loginPage,
    registeredUserCredentials,
  }) => {
    await loginPage.login({
      ...registeredUserCredentials,
      email: invalidUserInput.emailNoName,
    });

    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
    await loginPage.expectLoginFormVisible();
  });

  test('Login with invalid password is rejected', async ({
    loginPage,
    registeredUserCredentials,
  }) => {
    await loginPage.login({
      ...registeredUserCredentials,
      password: invalidUserInput.password,
    });

    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
    await loginPage.expectLoginFormVisible();
  });

  test('Login with empty email is rejected', async ({
    registeredUserCredentials,
    loginPage,
  }) => {
    await loginPage.login({ ...registeredUserCredentials, email: '' });
    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
  });

  test('Login with empty password is rejected', async ({
    registeredUserCredentials,
    loginPage,
  }) => {
    await loginPage.login({ ...registeredUserCredentials, password: '' });
    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
  });

  test('Logout loads the login screen', async ({
    loggedInUser,
    loginPage,
    contactsPage,
  }) => {
    await contactsPage.logout();
    await loginPage.expectLoginFormVisible();
  });

  test('Logged in state persists after page reload', async ({
    loggedInUser,
    loginPage,
  }) => {
    await loginPage.expectSuccess();
    await loginPage.page.reload();
    await loginPage.expectSuccess();
  });
});
