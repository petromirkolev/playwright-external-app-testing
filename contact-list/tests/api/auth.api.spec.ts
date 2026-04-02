import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';
import {
  INVALID_EMAIL,
  INVALID_PASSWORD_TOO_LONG,
  INVALID_PASSWORD_TOO_SHORT,
} from '../../utils/constants';
import { invalidInput, uniqueEmail } from '../../utils/test-data';

test.describe('Registration', () => {
  test('Registration with valid credentials is successful', async ({
    request,
    registrationData,
  }) => {
    const email = uniqueEmail();

    const response = await api.register(request, {
      ...registrationData,
      email,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.user.firstName).toBe(registrationData.firstName);
    expect(body.user.lastName).toBe(registrationData.lastName);
    expect(body.user.email).toBe(email);
    expect(body.token).toBeTruthy();
  });

  test('Duplicate registration is rejected', async ({
    request,
    registrationData,
  }) => {
    const email = uniqueEmail();

    const response = await api.register(request, {
      ...registrationData,
      email,
    });

    expect(response.status()).toBe(201);

    const duplicateResponse = await api.register(request, {
      ...registrationData,
      email,
    });

    const duplicateBody = await duplicateResponse.json();

    expect(duplicateResponse.status()).toBe(400);
    expect(duplicateBody.message).toBe('Email address is already in use');
  });

  test('Registration with invalid email is rejected', async ({
    request,
    registrationData,
  }) => {
    const email = invalidInput.email;

    const response = await api.register(request, {
      ...registrationData,
      email,
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toBe(INVALID_EMAIL);
  });

  test('Registration with invalid password too short is rejected', async ({
    request,
    registrationData,
  }) => {
    const response = await api.register(request, {
      ...registrationData,
      password: invalidInput.passwordTooShort,
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toBe(INVALID_PASSWORD_TOO_SHORT);
  });

  test('Registration with invalid password too long rejected', async ({
    request,
    registrationData,
  }) => {
    const response = await api.register(request, {
      ...registrationData,
      password: invalidInput.passwordTooLong,
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toBe(INVALID_PASSWORD_TOO_LONG);
  });
});

test.describe('Login', () => {
  test('Login with registered credentials is successful', async ({
    request,
    registeredUser,
  }) => {
    const response = await api.login(request, {
      email: registeredUser.email,
      password: registeredUser.password,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.user.token).toBe(registeredUser.token);
  });

  test('Login with invalid email is rejected', async ({
    request,
    registeredUser,
  }) => {
    const response = await api.login(request, {
      email: invalidInput.email,
      password: registeredUser.password,
    });

    expect(response.status()).toBe(401);
  });

  test('Login with invalid password is rejected', async ({
    request,
    registeredUser,
  }) => {
    const response = await api.login(request, {
      email: registeredUser.email,
      password: invalidInput.passwordTooShort,
    });

    expect(response.status()).toBe(401);
  });

  test('Login with missing required email is rejected', async ({
    request,
    registeredUser,
  }) => {
    const response = await api.login(request, {
      password: registeredUser.password,
    });

    expect(response.status()).toBe(401);
  });

  test('Login with missing required password is rejected', async ({
    request,
    registeredUser,
  }) => {
    const response = await api.login(request, {
      email: registeredUser.email,
    });

    expect(response.status()).toBe(401);
  });
});
