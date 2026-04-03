import { invalidContactInput, validContactInput } from '../utils/test-data';
import { test as base, expect } from './auth';

type ContactsFixture = {
  validContactInput: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
  };

  invalidContactInput: {
    birthDate: string;
    email: string;
    phone: string;
  };

  loggedInUserWithOneContact: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
  };
};

export const test = base.extend<ContactsFixture>({
  validContactInput: async ({}, use) => {
    await use(validContactInput);
  },

  invalidContactInput: async ({}, use) => {
    await use(invalidContactInput);
  },

  loggedInUserWithOneContact: async (
    { loggedInUser, validContactInput, contactsPage },
    use,
  ) => {
    await contactsPage.addContact(validContactInput);
    await expect(contactsPage.contactTableRow).toBeAttached();
    await contactsPage.expectContactVisible(validContactInput);

    await use(validContactInput);
  },
});

export { expect };
