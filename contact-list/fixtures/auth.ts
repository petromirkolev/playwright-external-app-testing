import { test as base, expect } from './api';
import { RegistrationInput, UserCredentials } from '../types/domain';

type AuthFixtures = {
  registrationData: RegistrationInput;
  registeredUserCredentials: UserCredentials & { token?: string };
  loggedInUser: UserCredentials;
};

export const test = base.extend<AuthFixtures>({
  loggedInUser: async ({ registeredUser, loginPage }, use) => {
    await loginPage.gotoHome();
    await loginPage.login(registeredUser);
    await loginPage.expectSuccess();

    await use(registeredUser);
  },
});

export { expect };
