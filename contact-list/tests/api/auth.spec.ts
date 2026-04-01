import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';
import { uniqueEmail } from '../../utils/test-data';

test.describe('Registration', () => {
  test('User registration is successful', async ({
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

    const body = await response.json();

    expect(response.status()).toBe(201);

    expect(body.user.firstName).toBe(registrationData.firstName);
    expect(body.user.lastName).toBe(registrationData.lastName);
    expect(body.user.email).toBe(email);

    const duplicateResponse = await api.register(request, {
      ...registrationData,
      email,
    });

    const duplicateBody = await duplicateResponse.json();

    expect(duplicateResponse.status()).toBe(400);
    expect(duplicateBody.message).toBe('Email address is already in use');
  });
});

// register duplicate user reject with expected error
// login valid user > success > token/user payload
// login invalid password > reject
// login missing required fields > reject
