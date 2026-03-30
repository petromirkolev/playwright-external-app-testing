import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { RegistrationPage } from '../pages/register';

type BaseFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<BaseFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { expect };
