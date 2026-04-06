import { test as base, expect } from './base';
import { ContactListApi } from '../utils/api-helpers';
import { RegistrationInput } from '../types/domain';
import {
  uniqueEmail,
  validContactInput,
  validUserInput,
} from '../utils/test-data';

type ApiFixtures = {
  apiClient: ContactListApi;
  registrationData: RegistrationInput;
  registeredUser: {
    email: string;
    password: string;
    token: string;
  };
  loggedInUser: {
    email: string;
    password: string;
    token: string;
  };
  userWithOneContact: {
    token: string;
    contact_id: string;
  };
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ContactListApi(request));
  },

  registrationData: async ({}, use) => {
    await use({
      ...validUserInput,
      email: uniqueEmail(),
    });
  },

  registeredUser: async ({ apiClient, registrationData }, use) => {
    const user = await apiClient.registerAndGetToken(registrationData);
    await use(user);
  },

  loggedInUser: async ({ apiClient, registeredUser }, use) => {
    const response = await apiClient.login(registeredUser);
    expect(response.status()).toBe(200);

    const body = await response.json();
    await use({
      ...registeredUser,
      token: body.token ?? body.user?.token,
    });
  },

  userWithOneContact: async ({ apiClient, loggedInUser }, use) => {
    const response = await apiClient.createContact(
      loggedInUser.token,
      validContactInput,
    );
    expect(response.status()).toBe(201);

    const body = await response.json();
    await use({
      token: loggedInUser.token,
      contact_id: body._id,
    });
  },
});

export { expect };
