import { test } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
import { expectError, expectSuccess } from '../../utils/user/user-helpers';
import {
  invalidPasswordInput,
  missingReqFieldsInput,
  uniqueEmail,
} from '../../utils/user/user-data';

test.describe('Toolshop API - Create user', () => {
  test('Create user with valid unique data returns 201', async ({
    userApi,
    registrationData,
  }) => {
    const response = await userApi.registerUser(registrationData);

    expectSuccess(response, 201, registrationData);
  });

  test('Create user with duplicate email returns 409', async ({
    userApi,
    registeredUser,
    registrationData,
  }) => {
    const response = await userApi.registerUser({
      ...registrationData,
      email: registeredUser.email,
    });

    expectError(response, 409, 'email', msg.REG_EMAIL_EXIST);
  });

  test('Create multiple unique users in sequence succeeds', async ({
    userApi,
    registrationData,
  }) => {
    const numberOfUsers = 3;

    for (let i = 0; i < numberOfUsers; i++) {
      const email = uniqueEmail();
      const response = await userApi.registerUser({
        ...registrationData,
        email,
      });

      await expectSuccess(response, 201, { ...registrationData, email });
    }
  });

  test.describe('Missing required fields', () => {
    for (const key of Object.keys(missingReqFieldsInput) as Array<
      keyof typeof missingReqFieldsInput
    >) {
      const { value, description, error } = missingReqFieldsInput[key];

      test(description, async ({ userApi, registrationData }) => {
        const response = await userApi.registerUser({
          ...registrationData,
          [key]: value,
        });

        expectError(response, 422, key, error);
      });
    }
  });

  test.describe('Invalid password values', () => {
    for (const key of Object.keys(invalidPasswordInput) as Array<
      keyof typeof invalidPasswordInput
    >) {
      const { value, description, error } = invalidPasswordInput[key];

      test(description, async ({ userApi, registrationData }) => {
        const response = await userApi.registerUser({
          ...registrationData,
          password: value,
        });

        expectError(response, 422, 'password', error);
      });
    }
  });
});
