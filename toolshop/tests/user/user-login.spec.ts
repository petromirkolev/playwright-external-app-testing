import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccessAndToken } from '../../utils/helpers';
import { invalidUserInput, validUserInput } from '../../utils/test-data';

test.describe('Toolshop API - Login user', () => {
  test('Login with valid customer credentials returns 200 and access token', async ({
    userApi,
    registeredUser,
  }) => {
    await expectSuccessAndToken(await userApi.login(registeredUser));
  });

  test('Login with valid admin credentials returns 200 and access token', async ({
    userApi,
    adminData,
  }) => {
    await expectSuccessAndToken(await userApi.login(adminData));
  });

  test('Login with wrong password returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.login({
      email: registeredUser.email,
      password: invalidUserInput.password,
    });
    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.UNAUTH);
  });

  test('Login with unknown email returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.login({
      email: validUserInput.email,
      password: registeredUser.password,
    });

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.UNAUTH);
  });

  test('Login with missing email returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.login({
      email: undefined,
      password: registeredUser.password,
    });

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.ERR_INV_LOGIN_REQ);
  });

  test('Login with missing password returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.login({
      email: registeredUser.email,
      password: undefined,
    });

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.ERR_INV_LOGIN_REQ);
  });

  test('Login with empty credentials returns 401', async ({ userApi }) => {
    const response = await userApi.login({});

    expect(response.status()).toBe(401);

    expectError(response, 'error', msg.ERR_INV_LOGIN_REQ);
  });
});
