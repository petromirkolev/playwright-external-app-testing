import { invalidContactInputs, validContactInputs } from '../utils/test-data';
import { test as base, expect } from './auth';

type ContactsFixture = {
  validContactInputs: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
  };

  invalidContactInputs: {
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
  validContactInputs: async ({}, use) => {
    const firstName = validContactInputs.firstName;
    const lastName = validContactInputs.lastName;
    const birthDate = validContactInputs.birthDate;
    const email = validContactInputs.email;
    const phone = validContactInputs.phone;

    await use({
      firstName,
      lastName,
      birthDate,
      email,
      phone,
    });
  },

  invalidContactInputs: async ({}, use) => {
    const birthDate = invalidContactInputs.birthDate;
    const email = invalidContactInputs.email;
    const phone = invalidContactInputs.phone;

    await use({ birthDate, email, phone });
  },

  loggedInUserWithOneContact: async (
    { loggedInUser, validContactInputs, contactsPage },
    use,
  ) => {
    const firstName = validContactInputs.firstName;
    const lastName = validContactInputs.lastName;
    const birthDate = validContactInputs.birthDate;
    const email = validContactInputs.email;
    const phone = validContactInputs.phone;

    await contactsPage.addContact({
      firstName: validContactInputs.firstName,
      lastName: validContactInputs.lastName,
      birthDate: validContactInputs.birthDate,
      email: validContactInputs.email,
      phone: validContactInputs.phone,
    });

    await expect(contactsPage.contactTableRow).toBeAttached();

    await contactsPage.expectContactVisible(
      validContactInputs.firstName,
      validContactInputs.lastName,
    );

    await use({ firstName, lastName, birthDate, email, phone });
  },
});

export { expect };
