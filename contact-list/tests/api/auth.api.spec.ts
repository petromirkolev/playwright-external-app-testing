import { test, expect } from '../../fixtures/api';
import { msg } from '../../utils/constants';
import { invalidUserInput, uniqueEmail } from '../../utils/test-data';

test.describe('Contacts API - Register user', () => {
  test('Registration with valid credentials is successful', async ({
    registrationData,
    apiClient,
  }) => {
    const email = uniqueEmail();

    const response = await apiClient.register({
      ...registrationData,
      email,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.user.firstName).toBe(registrationData.firstName);
    expect(body.user.lastName).toBe(registrationData.lastName);
    expect(body.user.email).toBe(email);
    expect(body.token).not.toBe(undefined);
  });

  test('Duplicate registration is rejected', async ({
    registrationData,
    apiClient,
  }) => {
    const email = uniqueEmail();

    const response = await apiClient.register({
      ...registrationData,
      email,
    });

    expect(response.status()).toBe(201);

    const duplicateResponse = await apiClient.register({
      ...registrationData,
      email,
    });

    const duplicateBody = await duplicateResponse.json();

    expect(duplicateResponse.status()).toBe(400);
    expect(duplicateBody.message).toBe(msg.AUTH_DUP_EMAIL);
  });

  test('Registration with invalid email is rejected', async ({
    registrationData,
    apiClient,
  }) => {
    const email = invalidUserInput.emailNoName;

    const response = await apiClient.register({
      ...registrationData,
      email,
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toBe(msg.USER_REQ_EMAIL);
  });

  test('Registration with invalid password too short is rejected', async ({
    registrationData,
    apiClient,
  }) => {
    const response = await apiClient.register({
      ...registrationData,
      password: invalidUserInput.passwordTooShort,
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toContain(msg.AUTH_INV_PASS_SHORT);
  });

  test('Registration with invalid password too long is rejected', async ({
    registrationData,
    apiClient,
  }) => {
    const response = await apiClient.register({
      ...registrationData,
      password: invalidUserInput.passwordTooLong,
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toContain(msg.AUTH_INV_PASS_LONG);
  });
});

test.describe('Contacts API - Login user', () => {
  test('Login with registered credentials is successful', async ({
    registeredUser,
    apiClient,
  }) => {
    const response = await apiClient.login({
      email: registeredUser.email,
      password: registeredUser.password,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBe(registeredUser.token);
  });

  test('Login with invalid email is rejected', async ({
    registeredUser,
    apiClient,
  }) => {
    const response = await apiClient.login({
      ...registeredUser,
      email: invalidUserInput.emailNoName,
    });

    expect(response.status()).toBe(401);
  });

  test('Login with invalid password is rejected', async ({
    registeredUser,
    apiClient,
  }) => {
    const response = await apiClient.login({
      email: registeredUser.email,
      password: invalidUserInput.passwordTooShort,
    });

    expect(response.status()).toBe(401);
  });

  test('Login with missing required email is rejected', async ({
    registeredUser,
    apiClient,
  }) => {
    const response = await apiClient.login({
      password: registeredUser.password,
    });

    expect(response.status()).toBe(401);
  });

  test('Login with missing required password is rejected', async ({
    registeredUser,
    apiClient,
  }) => {
    const response = await apiClient.login({
      email: registeredUser.email,
    });

    expect(response.status()).toBe(401);
  });
});
