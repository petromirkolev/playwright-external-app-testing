import { test as base, expect } from './base';
import { RegistrationInput, UserCredentials } from '../types/domain';
import { uniqueEmail, validUserInput } from '../utils/test-data';

type AuthFixtures = {
  registrationData: RegistrationInput;
  registeredUserCredentials: UserCredentials;
  loggedInUser: UserCredentials;
};

export const test = base.extend<AuthFixtures>({
  registrationData: async ({}, use) => {
    await use({
      ...validUserInput,
      email: uniqueEmail(),
    });
  },

  registeredUserCredentials: async (
    { registrationData, registrationPage, contactsPage },
    use,
  ) => {
    await registrationPage.gotoSignUp();
    await registrationPage.signUp(registrationData);
    await contactsPage.logout();

    await use({
      email: registrationData.email,
      password: registrationData.password,
    });
  },

  loggedInUser: async ({ registeredUserCredentials, loginPage }, use) => {
    await loginPage.gotoHome();
    await loginPage.login(registeredUserCredentials);
    await loginPage.expectSuccess();

    await use(registeredUserCredentials);
  },
});

export { expect };
