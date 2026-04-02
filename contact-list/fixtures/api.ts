import { test as base, expect, request } from '@playwright/test';
import { RegisteredUser, RegistrationData } from '../types/api';
import { api, registrationData } from '../utils/api-helpers';
import { uniqueEmail, validInput } from '../utils/test-data';

type ApiFixtures = {
  registrationData: RegistrationData;
  registeredUser: RegisteredUser;
};

export const test = base.extend<ApiFixtures>({
  registrationData: async ({}, use) => {
    const firstName = registrationData.firstName;
    const lastName = registrationData.lastName;
    const password = registrationData.password;

    await use({ firstName, lastName, password });
  },

  registeredUser: async ({ registrationData, request }, use) => {
    const email = uniqueEmail();
    const password = validInput.password;

    const response = await api.register(request, {
      ...registrationData,
      email,
      password,
    });

    const data = await response.json();
    const token = data.user.token;

    await use({ email, password, token });
  },
});

export { expect, request };
