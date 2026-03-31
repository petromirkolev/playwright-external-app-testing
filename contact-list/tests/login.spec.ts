import { test } from '../fixtures/auth';

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

  test('Login with invalid credentials is rejected', async ({ loginPage }) => {
    await loginPage.login('nonexistinguser@testing.com', '12345678');

    await loginPage.expectError('Incorrect username or password');

    await loginPage.expectLoginFormVisible();
  });

  test('Login with empty email is rejected', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login('', registeredUser.password);

    await loginPage.expectError('Incorrect username or password');
  });

  test('Login with empty password is rejected', async ({
    registeredUser,
    loginPage,
  }) => {
    await loginPage.login(registeredUser.email, '');

    await loginPage.expectError('Incorrect username or password');
  });

  test('Logout loads the login screen', async ({
    registeredUser,
    loginPage,
    registrationPage,
  }) => {
    await loginPage.login(registeredUser.email, registeredUser.password);

    await loginPage.expectSuccess();

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
