import { test as base, expect, request } from '@playwright/test';
import { LoginInput, RegistrationInput, UpdateInput } from '../types/user';
import { uniqueEmail, validInput } from '../utils/test-data';
import { ApiClient } from '../utils/api-client';
import { loadavg } from 'node:os';

type AuthFixtures = {
  api: ApiClient;
  registrationData: RegistrationInput;
  loginData: LoginInput;
  updateData: UpdateInput;
  registeredUser: { email: string; password: string; id: string };
  registeredAndLoggedInUser: {
    email: string;
    password: string;
    id: string;
    access_token: string;
  };
  updatedUser: any;
};

export const test = base.extend<AuthFixtures>({
  api: async ({ request }, use) => {
    await use(new ApiClient(request));
  },

  registrationData: async ({}, use) => {
    await use({ ...validInput, email: uniqueEmail() });
  },

  registeredUser: async ({ api, registrationData }, use) => {
    const response = await api.register(registrationData);
    const data = await response.json();

    await use({ ...registrationData, id: data.id });
  },

  registeredAndLoggedInUser: async ({ api, registeredUser }, use) => {
    const response = await api.login(registeredUser);
    const data = await response.json();

    await use({ ...registeredUser, access_token: data.access_token });
  },
});

export { expect };
