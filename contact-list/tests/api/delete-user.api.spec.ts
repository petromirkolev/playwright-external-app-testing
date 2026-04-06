import { test, expect } from '../../fixtures/api';

test.describe('Contacts API - Delete user', () => {
  test('Delete registered user succeeds', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.deleteUser(loggedInUser.token);

    expect(response.status()).toBe(200);
  });

  test('Delete already deleted user is rejected', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.deleteUser(loggedInUser.token);

    expect(response.status()).toBe(200);

    const deleteResponse = await apiClient.deleteUser(loggedInUser.token);

    expect(deleteResponse.status()).toBe(401);
  });
});
