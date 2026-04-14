import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/helpers';
import {
  invalidPasswordInput,
  missingReqFieldsInput,
  uniqueEmail,
} from '../../utils/user-data';

test.describe('Toolshop API - Create user', () => {
  test('Create user with valid unique data succeeds', async ({
    userApi,
    registrationData,
  }) => {
    const response = await userApi.register(registrationData);
    expect(response.status()).toBe(201);

    expectSuccess(response, registrationData);
  });

  test('Create user with duplicate email returns 409', async ({
    userApi,
    registeredUser,
    registrationData,
  }) => {
    const response = await userApi.register({
      ...registrationData,
      email: registeredUser.email,
    });
    expect(response.status()).toBe(409);

    expectError(response, 'email', msg.REG_EMAIL_EXIST);
  });

  test('Create multiple unique users in sequence succeeds', async ({
    userApi,
    registrationData,
  }) => {
    const numberOfUsers = 3;

    for (let i = 0; i < numberOfUsers; i++) {
      const response = await userApi.register({
        ...registrationData,
        email: uniqueEmail(),
      });
      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.id).toBeDefined();
    }
  });

  test.describe('Missing required fields', () => {
    for (const key of Object.keys(missingReqFieldsInput) as Array<
      keyof typeof missingReqFieldsInput
    >) {
      const { value, description, error } = missingReqFieldsInput[key];

      test(description, async ({ userApi, registrationData }) => {
        const response = await userApi.register({
          ...registrationData,
          [key]: value,
        });
        expect(response.status()).toBe(422);

        expectError(response, key, error);
      });
    }
  });

  test.describe('Invalid password values', () => {
    for (const key of Object.keys(invalidPasswordInput) as Array<
      keyof typeof invalidPasswordInput
    >) {
      const { value, description, error } = invalidPasswordInput[key];

      test(description, async ({ userApi, registrationData }) => {
        const response = await userApi.register({
          ...registrationData,
          password: value,
        });
        expect(response.status()).toBe(422);

        expectError(response, 'password', error);
      });
    }
  });
});
