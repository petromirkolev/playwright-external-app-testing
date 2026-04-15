import { test } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/user/user-helpers';

test.describe('Toolshop API - Get user', () => {
  test('Get created user by id succeeds', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getUser(
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );

    expectSuccess(response, 200, registeredAndLoggedInUser);
  });

  test('Get current authenticated user succeeds', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getMe(
      registeredAndLoggedInUser.access_token,
    );

    expectSuccess(response, 200, registeredAndLoggedInUser);
  });

  test('Get current authenticated user with invalid access token returns 401', async ({
    userApi,
  }) => {
    const response = await userApi.getMeWithAuthHeader('Bearer: abc');

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Get current authenticated user with malformed headers returns 401', async ({
    userApi,
  }) => {
    const response = await userApi.getMeWithAuthHeader('abc');

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Get current authenticated user without headers returns 401', async ({
    userApi,
  }) => {
    const response = await userApi.getMeWithoutAuth();

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Get non-existing user by id returns 404', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getUser(
      '999999999999999',
      registeredAndLoggedInUser.access_token,
    );

    expectError(response, 404, 'error', msg.UNAUTH_VIEW_USER);
  });

  test('Get user by id with invalid access token returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getUserWithAuthHeader(
      registeredAndLoggedInUser.id,
      'Bearer: abc',
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Get user by id with malformed headers returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getUserWithAuthHeader(
      registeredAndLoggedInUser.id,
      'abc',
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Get user by id without headers returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getUserWithoutAuth(
      registeredAndLoggedInUser.id,
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });
});
