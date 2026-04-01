import { test as base, expect, request } from '@playwright/test';
import { RegistrationData } from '../types/api';
import { registrationData } from '../utils/api-helpers';

type ApiFixtures = {
  registrationData: RegistrationData;
};

export const test = base.extend<ApiFixtures>({
  registrationData: async ({}, use) => {
    const firstName = registrationData.firstName;
    const lastName = registrationData.lastName;
    const password = registrationData.password;

    await use({ firstName, lastName, password });
  },
});

export { expect, request };
