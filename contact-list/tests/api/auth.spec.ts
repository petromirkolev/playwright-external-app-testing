import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';
import { INVALID_EMAIL } from '../../utils/constants';
import { invalidContactInputs, uniqueEmail } from '../../utils/test-data';

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
    const email = invalidContactInputs.email;

    const response = await api.register(request, {
      ...registrationData,
      email,
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toBe(INVALID_EMAIL);
  });

  test('Registration with invalid passwrod too short is rejected', async ({
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

  test('Registration with invalid password too long rejected', async ({
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
});

test.describe('Login', () => {
  test('Login with registered credentials is successful', async () => {});

  test('Login with invalid email is rejected', async () => {});

  test('Login with invalid password is rejected', async () => {});

  test('Login with missing required email is rejected', async () => {});

  test('Login with missing required password is rejected', async () => {});
});

// login valid user > success > token/user payload
// login invalid password > reject
// login missing required fields > reject
