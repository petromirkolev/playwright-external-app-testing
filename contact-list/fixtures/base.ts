import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { RegistrationPage } from '../pages/register';
import { ContactsPage } from '../pages/contacts';

type BaseFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  contactsPage: ContactsPage;
};

export const test = base.extend<BaseFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  contactsPage: async ({ page }, use) => {
    await use(new ContactsPage(page));
  },
});

export { expect };
