import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/helpers';
import {
  invalidPassword,
  missingReqFields,
  uniqueEmail,
} from '../../utils/test-data';

test.describe('Toolshop API - Create user', () => {
  test('Create user with valid unique data succeeds', async ({
    api,
    registrationData,
  }) => {
    const response = await api.registerUser(registrationData);
    expect(response.status()).toBe(201);

    expectSuccess(response, registrationData);
  });

  test('Create user with duplicate email returns 422', async ({
    api,
    registeredUser,
    registrationData,
  }) => {
    const response = await api.registerUser({
      ...registrationData,
      email: registeredUser.email,
    });
    expect(response.status()).toBe(422);

    expectError(response, 'email', msg.REG_EMAIL_EXIST);
  });

  test('Create multiple unique users in sequence succeeds', async ({
    api,
    registrationData,
  }) => {
    const numberOfUsers = 3;

    for (let i = 0; i < numberOfUsers; i++) {
      const response = await api.registerUser({
        ...registrationData,
        email: uniqueEmail(),
      });
      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.id).toBeDefined();
    }
  });

  test.describe('Missing required fields', () => {
    for (const key of Object.keys(missingReqFields) as Array<
      keyof typeof missingReqFields
    >) {
      const { value, description, error } = missingReqFields[key];

      test(description, async ({ api, registrationData }) => {
        const response = await api.registerUser({
          ...registrationData,
          [key]: value,
        });
        expect(response.status()).toBe(422);

        expectError(response, key, error);
      });
    }
  });

  test.describe('Invalid password values', () => {
    for (const key of Object.keys(invalidPassword) as Array<
      keyof typeof invalidPassword
    >) {
      const { value, description, error } = invalidPassword[key];

      test(description, async ({ api, registrationData }) => {
        const response = await api.registerUser({
          ...registrationData,
          password: value,
        });
        expect(response.status()).toBe(422);

        expectError(response, 'password', error);
      });
    }
  });
});
