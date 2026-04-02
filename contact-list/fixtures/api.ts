import { test as base, expect, request } from '@playwright/test';
import {
  ContactData,
  LoggedInUser,
  RegisteredUser,
  RegistrationData,
} from '../types/api';
import { api, registrationData } from '../utils/api-helpers';
import {
  uniqueEmail,
  validContactInput,
  validUserInput,
} from '../utils/test-data';

type ApiFixtures = {
  registrationData: RegistrationData;
  registeredUser: RegisteredUser;
  loggedInUser: LoggedInUser;
  userWithOneContact: {
    token: string;
    contact: ContactData;
  };
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
    const password = validUserInput.password;

    const response = await api.register(request, {
      ...registrationData,
      email,
      password,
    });

    const data = await response.json();
    const token = data.user.token;

    await use({ email, password, token });
  },

  loggedInUser: async ({ registeredUser, request }, use) => {
    const response = await api.login(request, { ...registeredUser });

    const data = await response.json();

    await use(data);
  },

  userWithOneContact: async ({ loggedInUser, request }, use) => {
    const token = loggedInUser.token;

    await api.addContact(request, token, {
      ...validContactInput,
    });

    const response = await api.getContact(request, token);

    const contact = await response.json();

    await use({ token, contact: { ...contact[0] } });
  },
});

export { expect, request };
