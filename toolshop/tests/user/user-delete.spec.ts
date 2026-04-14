import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError } from '../../utils/user-helpers';

test.describe('Toolshop API - Delete user', () => {
  test('Delete created user as an admin succeeds', async ({
    userApi,
    loggedInAdmin,
    registeredUser,
  }) => {
    const response = await userApi.delete(
      registeredUser.id,
      loggedInAdmin.access_token,
    );
    expect(response.status()).toBe(204);

    const deleteResponse = await userApi.get(
      registeredUser.id,
      loggedInAdmin.access_token,
    );
    expect(deleteResponse.status()).toBe(404);
  });

  test('Delete created user without authorization returns 401', async ({
    userApi,
    registeredUser,
  }) => {
    const response = await userApi.delete(registeredUser.id, undefined);
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
  });

  test('Delete created user as a customer returns 403', async ({
    userApi,
    registeredUser,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.delete(
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(403);
  });
});
