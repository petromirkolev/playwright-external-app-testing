import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/user-helpers';
import { uniqueEmail, userUpdateInput } from '../../utils/user-data';

test.describe('Toolshop API - Update user', () => {
  let email: string;

  test.beforeEach(() => {
    email = uniqueEmail();
  });

  test('Update current user with valid data succeeds', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.update(
      { ...userUpdateInput, email },
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBeTruthy();

    const updatedResponse = await userApi.get(
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );

    expectSuccess(updatedResponse, 200, { ...userUpdateInput, email });
  });

  test('Update current user with invalid access token returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.updateWithAuthHeader(
      { ...userUpdateInput, email },
      registeredAndLoggedInUser.id,
      'Bearer: abc',
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Update current user with malformed headers returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.updateWithAuthHeader(
      { ...userUpdateInput, email },
      registeredAndLoggedInUser.id,
      'abc',
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Update current user without headers returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.updateWithoutAuth(
      { ...userUpdateInput, email },
      registeredAndLoggedInUser.id,
    );

    expectError(response, 401, 'message', msg.UNAUTH);
  });

  test('Update current user with partial valid data succeeds', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.partialUpdate(
      { email },
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBeTruthy();

    const updatedResponse = await userApi.get(
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(updatedResponse.status()).toBe(200);

    const updatedBody = await updatedResponse.json();
    expect(updatedBody.email).toBe(email);
  });

  test('Update another user as an admin succeeds', async ({
    userApi,
    registeredUser,
    loggedInAdmin,
  }) => {
    const response = await userApi.update(
      { ...userUpdateInput, email },
      registeredUser.id,
      loggedInAdmin.access_token,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBeTruthy();

    const updatedResponse = await userApi.get(
      registeredUser.id,
      loggedInAdmin.access_token,
    );

    expectSuccess(updatedResponse, 200, { ...userUpdateInput, email });
  });

  test('Update non-existing user as an admin returns 403', async ({
    userApi,
    loggedInAdmin,
  }) => {
    const response = await userApi.update(
      { ...userUpdateInput, email },
      '99999',
      loggedInAdmin.access_token,
    );

    expect(response.status()).toBe(403);
  });

  test('Update another user as a customer returns 403', async ({
    userApi,
    registeredUser,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.update(
      { ...userUpdateInput, email },
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );

    expectError(response, 403, 'error', msg.UNAUTH_UPDATE);
  });

  test('Partially update another user as a customer returns 403', async ({
    userApi,
    registeredUser,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.partialUpdate(
      { email },
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );

    expectError(response, 403, 'error', msg.UNAUTH_UPDATE);
  });
});
