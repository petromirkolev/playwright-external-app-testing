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
    contact_id: string;
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

    const contactResponse = await api.addContact(request, token, {
      ...validContactInput,
    });

    const contactBody = await contactResponse.json();
    const contact_id = contactBody._id;

    await use({ token, contact_id });
  },
});

export { expect, request };
