import { test as base, expect } from '@playwright/test';
import { LoginInput, RegistrationInput } from '../types/user';
import { ApiClient } from '../utils/api-client';
import {
  uniqueEmail,
  uniqueUsername,
  validUserInput,
} from '../utils/test-data';

type AuthFixtures = {
  api: ApiClient;
  registrationInput: RegistrationInput;
  loginInput: LoginInput;
  registeredUser: RegistrationInput & { id: string };
  loggedInUser: { id: string };
};

export const test = base.extend<AuthFixtures>({
  api: async ({ request }, use) => {
    await use(new ApiClient(request));
  },

  registrationInput: async ({}, use) => {
    await use({
      ...validUserInput,
      email: uniqueEmail(),
      username: uniqueUsername(),
    });
  },

  registeredUser: async ({ api, registrationInput }, use) => {
    const response = await api.register(registrationInput);
    const body = await response.json();

    await use({
      ...registrationInput,
      id: body.message,
    });
  },

  loginInput: async ({ registeredUser }, use) => {
    await use({
      username: registeredUser.username,
      password: registeredUser.password,
    });
  },

  loggedInUser: async ({ registeredUser, loginInput, api }, use) => {
    await api.login(loginInput);

    await use({ id: registeredUser.id });
  },
});

export { expect };
