import { test, expect } from '../../fixtures/auth';

test.describe('Petstore - User auth', () => {
  test('Login with valid registered credentials succeeds', async ({
    loginInput,
    api,
  }) => {
    const response = await api.login(loginInput);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toMatch(new RegExp('logged in user session:'));
  });

  test('Logout succeeds', async ({ api }) => {
    const response = await api.logout();
    expect(response.status()).toBe(200);
  });
});
