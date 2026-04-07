import { test, expect } from '../../fixtures/auth';
import { invalidUserInput, validUserUpdateInput } from '../../utils/test-data';

test.describe('Petstore - User CRUD', () => {
  test('Registration with valid data succeeds', async ({
    registrationInput,
    api,
  }) => {
    const response = await api.register(registrationInput);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).not.toBeUndefined();
  });

  test('Get registered user succeeds', async ({ registeredUser, api }) => {
    const response = await api.getUser(registeredUser.username);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.username).toBe(registeredUser.username);
  });

  test('Update registered user with valid data succeeds', async ({
    registeredUser,
    api,
  }) => {
    const response = await api.updateUser(registeredUser.username, {
      ...registeredUser,
      firstName: validUserUpdateInput.firstName,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toBe(registeredUser.id);

    const updatedResponse = await api.getUser(registeredUser.username);
    const updatedBody = await updatedResponse.json();
    expect(updatedBody.firstName).toBe(validUserUpdateInput.firstName);
  });

  test('Delete registered user succeeds', async ({ registeredUser, api }) => {
    const response = await api.deleteUser(registeredUser.username);
    expect(response.status()).toBe(200);

    const getUserResponse = await api.getUser(registeredUser.username);
    expect(getUserResponse.status()).toBe(404);
  });

  test('Get not registered user is rejected', async ({ api }) => {
    const response = await api.getUser(invalidUserInput.username);
    expect(response.status()).toBe(404);
  });

  test('Delete not registered user is rejected', async ({ api }) => {
    const response = await api.deleteUser(invalidUserInput.username);
    expect(response.status()).toBe(404);
  });
});
