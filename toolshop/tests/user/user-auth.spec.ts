import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError } from '../../utils/user/user-helpers';
import { userUpdateInput } from '../../utils/user/user-data';

test.describe('Toolshop API - User authentication', () => {
  test('Reusing a valid access token on a protected endpoint succeeds', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getMe(
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    const secondResponse = await userApi.getMe(
      registeredAndLoggedInUser.access_token,
    );
    expect(secondResponse.status()).toBe(200);
  });

  test('Refresh access token provides new token', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.refreshUserToken(
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.access_token).not.toMatch(
      registeredAndLoggedInUser.access_token,
    );
  });

  test('Missing access token on a protected endpoint is rejected', async ({
    userApi,
  }) => {
    const response = await userApi.getMeWithoutAuth();

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Malformed access token returns 500', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const malformedToken = registeredAndLoggedInUser.access_token
      .split('.')
      .slice(0, 2)
      .join('.');

    const response = await userApi.refreshUserToken(malformedToken);
    expect(response.status()).toBe(500);
  });

  test('Two consecutive logins return independently usable tokens', async ({
    userApi,
    registeredUser,
  }) => {
    const firstResponse = await userApi.loginUser(registeredUser);
    const firstBody = await firstResponse.json();
    const firstToken = firstBody.access_token;

    const secondResponse = await userApi.loginUser(registeredUser);
    const secondBody = await secondResponse.json();
    const secondToken = secondBody.access_token;

    expect(firstToken).not.toMatch(secondToken);

    const firstMe = await userApi.getMe(firstToken);
    expect(firstMe.status()).toBe(200);

    const secondMe = await userApi.getMe(secondToken);
    expect(secondMe.status()).toBe(200);
  });

  test('One user token cannot retrieve another user by id and returns 404', async ({
    userApi,
    registeredUser,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.getUser(
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(404);
  });

  test('One user token cannot modify another user by id and returns 403', async ({
    userApi,
    registeredUser,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.partialUserUpdate(
      { first_name: userUpdateInput.first_name },
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );

    expect(response.status()).toBe(403);
  });
});
