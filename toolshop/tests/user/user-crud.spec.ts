import { test, expect } from '../../fixtures/auth';
import { msg } from '../../utils/constants';
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
    const response = await api.register(registrationData);

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.first_name).toBe(registrationData.first_name);
    expect(body.last_name).toBe(registrationData.last_name);
    expect(body.email).toBe(registrationData.email);
    expect(body.id).toBeDefined();
  });

  test('Create user with duplicate email is rejected', async ({
    api,
    registeredUser,
    registrationData,
  }) => {
    const response = await api.register({
      ...registrationData,
      email: registeredUser.email,
    });

    expect(response.status()).toBe(422);

    const body = await response.json();
    expect(body.email).toContain(msg.REG_EMAIL_EXIST);
  });

  test('Create multiple unique users in sequence succeeds', async ({
    api,
    registrationData,
  }) => {
    const numberOfUsers = 3;

    for (let i = 0; i < numberOfUsers; i++) {
      const response = await api.register({
        ...registrationData,
        email: uniqueEmail(),
      });
      expect(response.status()).toBe(201);
    }
  });

  test.describe('Missing required fields', () => {
    for (const key of Object.keys(missingReqFields) as Array<
      keyof typeof missingReqFields
    >) {
      const { value, description, error } = missingReqFields[key];

      test(description, async ({ api, registrationData }) => {
        const response = await api.register({
          ...registrationData,
          [key]: value,
        });
        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body[key]).toContain(error);
      });
    }
  });

  test.describe('Invalid password values', () => {
    for (const key of Object.keys(invalidPassword) as Array<
      keyof typeof invalidPassword
    >) {
      const { value, description, error } = invalidPassword[key];

      test(description, async ({ api, registrationData }) => {
        const response = await api.register({
          ...registrationData,
          password: value,
        });
        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body.password).toContain(error);
      });
    }
  });
});

test.describe('Toolshop API - Get user', () => {
  test('Get created user by id succeeds', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(
      registeredAndLoggedInUser.id,
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.email).toBe(registeredAndLoggedInUser.email);
  });

  test('Get current authenticated user succeeds', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getMe(registeredAndLoggedInUser.access_token);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.email).toBe(registeredAndLoggedInUser.email);
  });

  test('Get current authenticated user with invalid access token is rejected', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getMe('#');
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.message).toContain(msg.UNAUTH);
  });

  test('Get current authenticated user without access token is rejected', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getMe(undefined);
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.message).toContain(msg.UNAUTH);
  });

  test('Get non-existing user by id is rejected', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(
      '999999999999999',
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.error).toContain(msg.UNAUTH_VIEW_USER);
  });

  test('Get user by id without access token is rejected', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(registeredAndLoggedInUser.id, undefined);
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.message).toContain(msg.UNAUTH);
  });

  test('Get user by id with invalid access token is rejected', async ({
    api,
    registeredAndLoggedInUser,
  }) => {
    const response = await api.getUser(registeredAndLoggedInUser.id, '#');
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.message).toContain(msg.UNAUTH);
  });
});

test.describe('Toolshop API - Update user', () => {
  // 4. Update current user/profile with valid payload succeeds.
  // 5. Partial update of current user/profile succeeds, if supported.
  // 13. Update user with invalid email is rejected.
  // 14. Update user with invalid password is rejected.
  // 15. Update another user’s profile as normal customer is rejected.
  // 16. Update another user’s profile as admin behaves as documented or observed.
});

test.describe('Toolshop API - Delete user', () => {
  // 6. Delete created user as allowed role succeeds.
  // 7. Get deleted user is rejected or returns not found.
  // 17. Delete another user as normal customer is rejected.
  // 18. Delete another user as admin behaves as documented or observed.
});

test.describe('Toolshop API - Reset user password', () => {
  // 19. Forgot/reset-password flow succeeds, if exposed.
  // 20. Forgot/reset-password flow does not leak whether email exists, unless intentionally observed otherwise.
});

test.describe('Toolshop API - Reset user password', () => {
  // 19. Forgot/reset-password flow succeeds, if exposed.
  // 20. Forgot/reset-password flow does not leak whether email exists, unless intentionally observed otherwise.
});

// 21. User lookup endpoint does not leak excessive data to unauthenticated callers.
// 30. HTML/script payload in user fields is escaped, rejected, or stored safely.
// 31. SQL-wildcard-like input in user search or lookup behaves safely.
