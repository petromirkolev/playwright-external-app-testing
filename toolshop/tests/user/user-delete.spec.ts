import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError } from '../../utils/user/user-helpers';

test.describe('Toolshop API - Delete user', () => {
  test('Delete created user as an admin succeeds', async ({
    userApi,
    loggedInAdmin,
    registeredUser,
  }) => {
    const response = await userApi.deleteUser(
      registeredUser.id,
      loggedInAdmin.access_token,
    );
    expect(response.status()).toBe(204);

    const deleteResponse = await userApi.getUser(
      registeredUser.id,
      loggedInAdmin.access_token,
    );
    expect(deleteResponse.status()).toBe(404);
  });

  test('Delete created user with invalid headers returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.deleteUserWithAuthHeader(
      registeredUser.id,
      'Bearer: abc',
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Delete created user with malformed headers returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.deleteUserWithAuthHeader(
      registeredUser.id,
      'abc',
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Delete created user without headers returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.deleteUserWithoutAuth(registeredUser.id);

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Delete created user as a customer returns 403', async ({
    userApi,
    registeredUser,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.deleteUser(
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(403);
  });
});
