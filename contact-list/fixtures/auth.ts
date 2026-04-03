import { test as base, expect } from './base';
import { uniqueEmail, validUserInput } from '../utils/test-data';

type AuthFixtures = {
  registrationData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  registeredUser: {
    email: string;
    password: string;
  };

  loggedInUser: {
    email: string;
    password: string;
  };
};

export const test = base.extend<AuthFixtures>({
  registrationData: async ({}, use) => {
    await use({
      firstName: validUserInput.firstName,
      lastName: validUserInput.lastName,
      email: uniqueEmail(),
      password: validUserInput.password,
    });
  },

  registeredUser: async (
    { registrationData, registrationPage, loginPage },
    use,
  ) => {
    await registrationPage.gotoSignUp();
    await registrationPage.signUp(registrationData);
    await registrationPage.logOutButton.click();
    await loginPage.expectLoginFormVisible();

    await use(registrationData);
  },

  loggedInUser: async ({ registeredUser, loginPage }, use) => {
    await loginPage.expectLoginFormVisible();
    await loginPage.login(registeredUser);

    await use(registeredUser);
  },
});

export { expect };
