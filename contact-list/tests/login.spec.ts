import { test } from '../fixtures/auth';
import { INCORRECT_USERNAME_PASSWORD } from '../utils/constants';
import { invalidUserInput } from '../utils/test-data';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoHome();
  });

  test('Login with valid credentials succeeds', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login(registeredUser.email, registeredUser.password);

    await loginPage.expectSuccess();
  });

  test('Login with invalid email is rejected', async ({
    loginPage,
    registeredUser,
  }) => {
    await loginPage.login(invalidUserInput.email, registeredUser.password);

    await loginPage.expectError(INCORRECT_USERNAME_PASSWORD);

    await loginPage.expectLoginFormVisible();
  });

  test('Login with invalid password is rejected', async ({
    loginPage,
    registeredUser,
  }) => {
    await loginPage.login(registeredUser.email, invalidUserInput.password);

    await loginPage.expectError(INCORRECT_USERNAME_PASSWORD);

    await loginPage.expectLoginFormVisible();
  });

  test('Login with empty email is rejected', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login('', registeredUser.password);

    await loginPage.expectError(INCORRECT_USERNAME_PASSWORD);
  });

  test('Login with empty password is rejected', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login(registeredUser.email, '');

    await loginPage.expectError(INCORRECT_USERNAME_PASSWORD);
  });

  test('Logout loads the login screen', async ({
    registeredUser,
    loginPage,
    registrationPage,
  }) => {
    await loginPage.login(registeredUser.email, registeredUser.password);

    await registrationPage.logOutButton.click();

    await loginPage.expectLoginFormVisible();
  });

  test('Logged in state persists after page reload', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login(registeredUser.email, registeredUser.password);

    await loginPage.expectSuccess();

    await loginPage.page.reload();

    await loginPage.expectSuccess();
  });
});
