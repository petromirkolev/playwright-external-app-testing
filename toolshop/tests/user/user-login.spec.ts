import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccessAndToken } from '../../utils/helpers';
import { invalidInput } from '../../utils/test-data';

test.describe('Toolshop API - Login user', () => {
  test('Login with valid customer credentials returns 200 and access token', async ({
    api,
    registeredUser,
  }) => {
    await expectSuccessAndToken(await api.loginUser(registeredUser));
  });

  test('Login with valid admin credentials returns 200 and access token', async ({
    api,
    adminUser,
  }) => {
    await expectSuccessAndToken(await api.loginUser(adminUser));
  });

  test('Login with wrong password returns 401', async ({
    api,
    registeredUser,
  }) => {
    const response = await api.loginUser({
      email: registeredUser.email,
      password: invalidInput.password,
    });
    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.UNAUTH);
  });

  test('Login with unknown email returns 401', async ({
    api,
    registeredUser,
  }) => {
    const response = await api.loginUser({
      email: invalidInput.email,
      password: registeredUser.password,
    });

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.UNAUTH);
  });

  test('Login with missing email returns 401', async ({
    api,
    registeredUser,
  }) => {
    const response = await api.loginUser({
      email: undefined,
      password: registeredUser.password,
    });

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.ERR_INV_LOGIN_REQ);
  });

  test('Login with missing password returns 401', async ({
    api,
    registeredUser,
  }) => {
    const response = await api.loginUser({
      email: registeredUser.email,
      password: undefined,
    });

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.ERR_INV_LOGIN_REQ);
  });

  test('Login with empty credentials returns 401', async ({ api }) => {
    const response = await api.loginUser({});

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.ERR_INV_LOGIN_REQ);
  });
});
