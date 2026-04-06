import { test, expect } from '../../fixtures/api';
import { msg } from '../../utils/constants';
import {
  invalidUserInput,
  uniqueEmail,
  validContactUpdateInput,
  validUserInput,
} from '../../utils/test-data';

test.describe('Contact list - Update user API', () => {
  test('Update first name with valid data succeeds', async ({
    apiClient,
    loggedInUser,
  }) => {
    const response = await apiClient.updateUser(loggedInUser.token, {
      firstName: validContactUpdateInput.firstName,
    });
    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.firstName).toBe(validContactUpdateInput.firstName);
  });

  test('Update last name with valid data succeeds', async ({
    apiClient,
    loggedInUser,
  }) => {
    const response = await apiClient.updateUser(loggedInUser.token, {
      lastName: validContactUpdateInput.lastName,
    });
    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.lastName).toBe(validContactUpdateInput.lastName);
  });

  test('Update email with valid data succeeds', async ({
    apiClient,
    loggedInUser,
  }) => {
    const email = uniqueEmail();
    const response = await apiClient.updateUser(loggedInUser.token, {
      email,
    });
    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.email).toBe(email);
  });

  test('Update password with valid data succeeds', async ({
    apiClient,
    loggedInUser,
  }) => {
    const response = await apiClient.updateUser(loggedInUser.token, {
      password: validUserInput.password,
    });
    expect(response.status()).toBe(200);
  });

  test('Update email with invalid data is rejected', async ({
    apiClient,
    loggedInUser,
  }) => {
    const response = await apiClient.updateUser(loggedInUser.token, {
      email: invalidUserInput.emailNoName,
    });
    expect(response.status()).toBe(400);

    const data = await response.json();

    expect(data.message).toContain(msg.USER_REQ_EMAIL);
  });

  test('Update password with invalid password too short is rejected', async ({
    apiClient,
    loggedInUser,
  }) => {
    const response = await apiClient.updateUser(loggedInUser.token, {
      password: invalidUserInput.passwordTooShort,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toContain(msg.AUTH_INV_PASS_SHORT);
  });

  test('Update password with invalid password too long is rejected', async ({
    apiClient,
    loggedInUser,
  }) => {
    const response = await apiClient.updateUser(loggedInUser.token, {
      password: invalidUserInput.passwordTooLong,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toContain(msg.AUTH_INV_PASS_LONG);
  });
});
