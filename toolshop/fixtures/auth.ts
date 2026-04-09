import { test as base, expect } from './api';
import { LoginInput, RegistrationInput } from '../types/user';
import { adminInput, uniqueEmail, validInput } from '../utils/test-data';

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
    ...validInput,
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

    const response = await userApi.register(input);
    expect(response.status()).toBe(201);

    const data = await response.json();

    await use({ ...input, id: data.id });

    await userApi.delete(data.id, loggedInAdmin.access_token);
  },

  registeredAndLoggedInUser: async ({ userApi, loggedInAdmin }, use) => {
    const input = makeRegistrationData();

    const registrationResponse = await userApi.register(input);
    expect(registrationResponse.status()).toBe(201);

    const registrationBody = await registrationResponse.json();

    const loginResponse = await userApi.login(input);
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    await use({
      ...input,
      id: registrationBody.id,
      access_token: loginBody.access_token,
    });

    await userApi.delete(registrationBody.id, loggedInAdmin.access_token);
  },

  loggedInAdmin: async ({ userApi }, use) => {
    const response = await userApi.login(adminInput);
    expect(response.status()).toBe(200);

    const body = await response.json();
    await use({ ...adminInput, ...body });
  },
});

export { expect };
