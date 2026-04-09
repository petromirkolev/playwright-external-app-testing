import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/helpers';
import { uniqueEmail, validUpdateInput } from '../../utils/test-data';

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
      { ...validUpdateInput, email },
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

    expectSuccess(updatedResponse, { ...validUpdateInput, email });
  });

  test('Update current user with invalid access token returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.update(
      { ...validUpdateInput, email },
      registeredAndLoggedInUser.id,
      '99999',
    );
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
  });

  test('Update current user without access token returns 401', async ({
    userApi,
    registeredAndLoggedInUser,
  }) => {
    const response = await userApi.update(
      { ...validUpdateInput, email },
      registeredAndLoggedInUser.id,
      undefined,
    );
    expect(response.status()).toBe(401);

    expectError(response, 'message', msg.UNAUTH);
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
      { ...validUpdateInput, email },
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
    expect(updatedResponse.status()).toBe(200);

    expectSuccess(updatedResponse, { ...validUpdateInput, email });
  });

  test('Update non-existing user as an admin returns 403', async ({
    userApi,
    loggedInAdmin,
  }) => {
    const response = await userApi.update(
      { ...validUpdateInput, email },
      '9999999',
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
      { ...validUpdateInput, email },
      registeredUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(403);

    expectError(response, 'error', msg.UNAUTH_UPDATE);
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
    expect(response.status()).toBe(403);

    expectError(response, 'error', msg.UNAUTH_UPDATE);
  });
});
