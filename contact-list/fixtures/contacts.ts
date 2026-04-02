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
    const firstName = validContactInput.firstName;
    const lastName = validContactInput.lastName;
    const birthDate = validContactInput.birthDate;
    const email = validContactInput.email;
    const phone = validContactInput.phone;

    await use({
      firstName,
      lastName,
      birthDate,
      email,
      phone,
    });
  },

  invalidContactInput: async ({}, use) => {
    const birthDate = invalidContactInput.birthDate;
    const email = invalidContactInput.email;
    const phone = invalidContactInput.phone;

    await use({ birthDate, email, phone });
  },

  loggedInUserWithOneContact: async (
    { loggedInUser, validContactInput, contactsPage },
    use,
  ) => {
    const firstName = validContactInput.firstName;
    const lastName = validContactInput.lastName;
    const birthDate = validContactInput.birthDate;
    const email = validContactInput.email;
    const phone = validContactInput.phone;

    await contactsPage.addContact({
      firstName: validContactInput.firstName,
      lastName: validContactInput.lastName,
      birthDate: validContactInput.birthDate,
      email: validContactInput.email,
      phone: validContactInput.phone,
    });

    await expect(contactsPage.contactTableRow).toBeAttached();

    await contactsPage.expectContactVisible(
      validContactInput.firstName,
      validContactInput.lastName,
    );

    await use({ firstName, lastName, birthDate, email, phone });
  },
});

export { expect };
