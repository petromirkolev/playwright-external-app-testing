import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError } from '../../utils/helpers';

test.describe('Toolshop API - Delete user', () => {
  test('Delete created user as an admin succeeds', async ({
    api,
    loggedInAsAdmin,
    registeredUser,
  }) => {
    const response = await api.deleteUser(
      registeredUser.id,
      loggedInAsAdmin.access_token,
    );
    expect(response.status()).toBe(204);

    const deleteResponse = await api.getUser(
      registeredUser.id,
      loggedInAsAdmin.access_token,
    );
    expect(deleteResponse.status()).toBe(404);
  });

  test('Delete created user without authorization returns 401', async ({
    api,
    registeredUser,
  }) => {
    const response = await api.deleteUser(registeredUser.id, undefined);
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
  });

  test('Delete created user as a customer returns 403', async ({
    api,
    registeredUser,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.deleteUser(
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(403);
  });
});
