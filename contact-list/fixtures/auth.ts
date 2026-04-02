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
    const firstName = validUserInput.firstName;
    const lastName = validUserInput.lastName;
    const email = uniqueEmail();
    const password = validUserInput.password;

    await use({ firstName, lastName, email, password });
  },

  registeredUser: async (
    { registrationData, registrationPage, loginPage },
    use,
  ) => {
    const email = registrationData.email;
    const password = registrationData.password;

    await registrationPage.gotoSignUp();

    await registrationPage.signUp({ ...registrationData });

    await registrationPage.logOutButton.click();

    await loginPage.expectLoginFormVisible();

    await use({ email, password });
  },

  loggedInUser: async ({ registeredUser, loginPage }, use) => {
    const email = registeredUser.email;
    const password = registeredUser.password;

    await loginPage.expectLoginFormVisible();

    await loginPage.login(email, password);

    await use({ email, password });
  },
});

export { expect };
