import { test as base, expect } from './base';
import { uniqueEmail, validInput } from '../utils/test-data';

type AuthFixtures = {
  registrationData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  loginData: {
    email: string;
    password: string;
  };
};

export const test = base.extend<AuthFixtures>({
  registrationData: async ({}, use) => {
    const firstName = validInput.firstName;
    const lastName = validInput.lastName;
    const email = uniqueEmail();
    const password = validInput.password;

    await use({ firstName, lastName, email, password });
  },

  loginData: async ({ registrationData }, use) => {
    const email = registrationData.email;
    const password = registrationData.password;

    await use({ email, password });
  },
});

export { expect };
