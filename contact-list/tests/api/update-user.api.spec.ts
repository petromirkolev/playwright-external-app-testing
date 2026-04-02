import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';
import {
  INVALID_EMAIL,
  INVALID_PASSWORD_TOO_LONG,
  INVALID_PASSWORD_TOO_SHORT,
} from '../../utils/constants';
import {
  invalidUserInput,
  uniqueEmail,
  validUserInput,
} from '../../utils/test-data';

test.describe('Update', () => {
  test('Update first name with valid data succeeds', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.update(request, loggedInUser.token, {
      firstName: 'Georgi',
    });

    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.firstName).toBe('Georgi');
  });

  test('Update last name with valid data succeeds', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.update(request, loggedInUser.token, {
      lastName: 'Petrov',
    });

    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.lastName).toBe('Petrov');
  });

  test('Update email with valid data succeeds', async ({
    request,
    loggedInUser,
  }) => {
    const email = uniqueEmail();
    const response = await api.update(request, loggedInUser.token, {
      email,
    });

    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.email).toBe(email);
  });

  test('Update password with valid data succeeds', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.update(request, loggedInUser.token, {
      password: validUserInput.password,
    });

    expect(response.status()).toBe(200);
  });

  test('Update email with invalid data is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.update(request, loggedInUser.token, {
      email: invalidUserInput.emailNoName,
    });

    expect(response.status()).toBe(400);

    const data = await response.json();

    expect(data.message).toContain(INVALID_EMAIL);
  });

  test('Update password with invalid password too short is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.update(request, loggedInUser.token, {
      password: invalidUserInput.passwordTooShort,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toContain(INVALID_PASSWORD_TOO_SHORT);
  });

  test('Update password with invalid password too long is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.update(request, loggedInUser.token, {
      password: invalidUserInput.passwordTooLong,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toContain(INVALID_PASSWORD_TOO_LONG);
  });
});
