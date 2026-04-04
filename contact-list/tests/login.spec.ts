import { test } from '../fixtures/auth';
import { msg } from '../utils/constants';
import { invalidUserInput } from '../utils/test-data';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoHome();
  });

  test('Login with valid credentials succeeds', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login(registeredUser);
    await loginPage.expectSuccess();
  });

  test('Login with invalid email is rejected', async ({
    loginPage,
    registeredUser,
  }) => {
    await loginPage.login({
      ...registeredUser,
      password: invalidUserInput.password,
    });

    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
    await loginPage.expectLoginFormVisible();
  });

  test('Login with invalid password is rejected', async ({
    loginPage,
    registeredUser,
  }) => {
    await loginPage.login({
      ...registeredUser,
      password: invalidUserInput.password,
    });

    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
    await loginPage.expectLoginFormVisible();
  });

  test('Login with empty email is rejected', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login({ ...registeredUser, email: '' });
    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
  });

  test('Login with empty password is rejected', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login({ ...registeredUser, password: '' });
    await loginPage.expectError(msg.AUTH_INV_USER_PASS);
  });

  test('Logout loads the login screen', async ({
    loggedInUser,
    loginPage,
    contactsPage,
  }) => {
    await contactsPage.logOutButton.click();
    await loginPage.expectLoginFormVisible();
  });

  test.only('Logged in state persists after page reload', async ({
    loggedInUser,
    loginPage,
  }) => {
    await loginPage.expectSuccess();

    await loginPage.page.reload();

    await loginPage.expectSuccess();
  });
});
