import { test as base, expect, request } from '@playwright/test';
import { LoggedInUser, RegisteredUser } from '../types/api';
import { RegistrationData } from '../types/auth';
import { api, registrationData } from '../utils/api-helpers';
import { uniqueEmail, validContactInput } from '../utils/test-data';

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
    await use(registrationData);
  },

  registeredUser: async ({ registrationData, request }, use) => {
    const email = uniqueEmail();
    const password = registrationData.password!;
    const response = await api.register(request, {
      ...registrationData,
      email,
      password,
    });

    const data = await response.json();

    await use({ email, password, token: data.user.token });
  },

  loggedInUser: async ({ registeredUser, request }, use) => {
    const response = await api.login(request, registeredUser);

    const data = await response.json();

    await use(data);
  },

  userWithOneContact: async ({ loggedInUser, request }, use) => {
    const token = loggedInUser.token;

    const contactResponse = await api.addContact(
      request,
      token,
      validContactInput,
    );

    const contactBody = await contactResponse.json();

    await use({ token, contact_id: contactBody._id });
  },
});

export { expect, request };
