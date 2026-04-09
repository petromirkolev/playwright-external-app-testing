import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/helpers';

test.describe('Toolshop API - Get user', () => {
  test('Get created user by id succeeds', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.get(
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    expectSuccess(response, registeredAndLoggedInUser);
  });

  test('Get current authenticated user succeeds', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getMe(
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    expectSuccess(response, registeredAndLoggedInUser);
  });

  test('Get current authenticated user with invalid access token returns 401', async ({
    userApi,
  }) => {
    const response = await userApi.getMe('#');
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
  });

  test('Get current authenticated user without access token returns 401', async ({
    userApi,
  }) => {
    const response = await userApi.getMe(undefined);
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
  });

  test('Get non-existing user by id returns 404', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.get(
      '999999999999999',
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(404);

    expectError(response, 'error', msg.UNAUTH_VIEW_USER);
  });

  test('Get user by id without access token returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.get(registeredAndLoggedInUser.id, undefined);
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
  });

  test('Get user by id with invalid access token returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.get(registeredAndLoggedInUser.id, '#');
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
  });
});
