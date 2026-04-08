import { test as base, expect } from '@playwright/test';
import { LoginInput, RegistrationInput } from '../types/user';
import { adminInput, uniqueEmail, validInput } from '../utils/test-data';
import { UserApiClient } from '../utils/api-client';

type AuthFixtures = {
  api: UserApiClient;

  registrationData: RegistrationInput;
  adminUser: LoginInput;

  registeredUser: { email: string; password: string; id: string };
  registeredAndLoggedInUser: {
    email: string;
    password: string;
    id: string;
    access_token: string;
  };

  loggedInAsAdmin: LoginInput & { access_token: string };
};

function makeRegistrationData(): RegistrationInput {
  return {
    ...validInput,
    email: uniqueEmail(),
  };
}

export const test = base.extend<AuthFixtures>({
  api: async ({ request }, use) => {
    await use(new UserApiClient(request));
  },

  registrationData: async ({}, use) => {
    await use(makeRegistrationData());
  },

  adminUser: async ({}, use) => {
    await use(adminInput);
  },

  registeredUser: async ({ api }, use) => {
    const input = makeRegistrationData();

    const response = await api.registerUser(input);
    expect(response.status()).toBe(201);

    const data = await response.json();

    await use({ ...input, id: data.id });
  },

  registeredAndLoggedInUser: async ({ api }, use) => {
    const input = makeRegistrationData();

    const registrationResponse = await api.registerUser(input);
    expect(registrationResponse.status()).toBe(201);

    const registrationBody = await registrationResponse.json();

    const loginResponse = await api.loginUser(input);
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    await use({
      ...input,
      id: registrationBody.id,
      access_token: loginBody.access_token,
    });
  },

  loggedInAsAdmin: async ({ api }, use) => {
    const response = await api.loginUser(adminInput);
    expect(response.status()).toBe(200);

    const body = await response.json();
    await use({ ...adminInput, ...body });
  },
});

export { expect };
