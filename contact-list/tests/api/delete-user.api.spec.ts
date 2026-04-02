import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';

test.describe('Delete', () => {
  test('Delete registered user succeeds', async ({ request, loggedInUser }) => {
    const response = await api.delete(request, loggedInUser.token);

    expect(response.status()).toBe(200);
  });

  test('Delete already deleted user is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.delete(request, loggedInUser.token);

    expect(response.status()).toBe(200);

    const deleteResponse = await api.delete(request, loggedInUser.token);

    expect(deleteResponse.status()).toBe(401);
  });
});
