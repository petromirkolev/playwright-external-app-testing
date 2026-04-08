import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/helpers';

test.describe('Toolshop API - Get user', () => {
  test('Get created user by id succeeds', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectSuccess(body, registeredAndLoggedInUser);
  });

  test('Get current authenticated user succeeds', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getMe(registeredAndLoggedInUser.access_token);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectSuccess(body, registeredAndLoggedInUser);
  });

  test('Get current authenticated user with invalid access token returns 401', async ({
    api,
  }) => {
    const response = await api.getMe('#');
    expect(response.status()).toBe(401);

    const body = await response.json();
    expectError(body, 'message', msg.UNAUTH);
  });

  test('Get current authenticated user without access token returns 401', async ({
    api,
  }) => {
    const response = await api.getMe(undefined);
    expect(response.status()).toBe(401);

    const body = await response.json();
    expectError(body, 'message', msg.UNAUTH);
  });

  test('Get non-existing user by id returns 404', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(
      '999999999999999',
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(404);

    const body = await response.json();
    expectError(body, 'error', msg.UNAUTH_VIEW_USER);
  });

  test('Get user by id without access token returns 401', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(registeredAndLoggedInUser.id, undefined);
    expect(response.status()).toBe(401);

    const body = await response.json();
    expectError(body, 'message', msg.UNAUTH);
  });

  test('Get user by id with invalid access token returns 401', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(registeredAndLoggedInUser.id, '#');
    expect(response.status()).toBe(401);

    const body = await response.json();
    expectError(body, 'message', msg.UNAUTH);
  });
});
