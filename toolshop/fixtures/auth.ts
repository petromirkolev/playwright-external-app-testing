import { test as base, expect } from './api';
import { LoginInput, RegistrationInput } from '../types/user';
import { adminInput, uniqueEmail, userInput } from '../utils/user/user-data';

type AuthFixtures = {
  registrationData: RegistrationInput;
  adminData: LoginInput;
  registeredUser: { email: string; password: string; id: string };
  registeredAndLoggedInUser: {
    email: string;
    password: string;
    id: string;
    access_token: string;
  };
  loggedInAdmin: LoginInput & { access_token: string };
};

function makeRegistrationData(): RegistrationInput {
  return {
    ...userInput,
    email: uniqueEmail(),
  };
}

export const test = base.extend<AuthFixtures>({
  registrationData: async ({}, use) => {
    await use(makeRegistrationData());
  },

  adminData: async ({}, use) => {
    await use(adminInput);
  },

  registeredUser: async ({ userApi, loggedInAdmin }, use) => {
    const input = makeRegistrationData();

    const registrationResponse = await userApi.registerUser(input);
    expect(registrationResponse.status()).toBe(201);

    const registrationBody = await registrationResponse.json();

    await use({ ...input, id: registrationBody.id });

    try {
      const deleteResponse = await userApi.deleteUser(
        registrationBody.id,
        loggedInAdmin.access_token,
      );

      const status = deleteResponse.status();

      if (status !== 204 && status !== 404) {
        console.warn(
          `Cleanup failed for user ${registrationBody.id}. Expected 204 or 404, got ${status}`,
        );
      }
    } catch (error) {
      console.warn(
        `Cleanup request failed for user ${registrationBody.id}:`,
        error,
      );
    }
  },

  registeredAndLoggedInUser: async ({ userApi, loggedInAdmin }, use) => {
    const input = makeRegistrationData();

    const registrationResponse = await userApi.registerUser(input);
    expect(registrationResponse.status()).toBe(201);

    const registrationBody = await registrationResponse.json();

    const loginResponse = await userApi.loginUser(input);
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    await use({
      ...input,
      id: registrationBody.id,
      access_token: loginBody.access_token,
    });

    try {
      const deleteResponse = await userApi.deleteUser(
        registrationBody.id,
        loggedInAdmin.access_token,
      );

      const status = deleteResponse.status();

      if (status !== 204 && status !== 404) {
        console.warn(
          `Cleanup failed for user ${registrationBody.id}. Expected 204 or 404, got ${status}`,
        );
      }
    } catch (error) {
      console.warn(
        `Cleanup request failed for user ${registrationBody.id}:`,
        error,
      );
    }
  },

  loggedInAdmin: async ({ userApi }, use) => {
    const response = await userApi.loginUser(adminInput);
    expect(response.status()).toBe(200);

    const body = await response.json();
    await use({ ...adminInput, ...body });
  },
});

export { expect };
