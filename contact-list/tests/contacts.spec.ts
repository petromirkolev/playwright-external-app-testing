import { test, expect } from '../fixtures/contacts';
import { msg } from '../utils/constants';
import { validContactUpdateInput } from '../utils/test-data';

test.describe('Contact list happy path', () => {
  test.beforeEach(async ({ loggedInUser, contactsPage }) => {
    await contactsPage.contactTableLoaded();
  });

  test('Contact list table is empty', async ({
    loggedInUser,
    contactsPage,
  }) => {
    await expect(contactsPage.contactTableRow).toHaveCount(0);
  });

  test('Contact list updates after contact creation', async ({
    loggedInUser,
    contactsPage,
    validContactInput,
  }) => {
    await contactsPage.addContact(validContactInput);
    await contactsPage.expectContactVisible(validContactInput);
  });

  test('Contact list keeps created contact after page reload', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.expectContactVisible(loggedInUserWithOneContact);

    await contactsPage.page.reload();

    await contactsPage.expectContactVisible(loggedInUserWithOneContact);
  });
});

test.describe('Contact list add contact', () => {
  test.beforeEach(async ({ loggedInUser, contactsPage }) => {
    await contactsPage.contactTableLoaded();
  });

  test('Cancel add contact returns to contacts page', async ({
    loggedInUser,
    contactsPage,
  }) => {
    await contactsPage.openAddContactForm();
    await contactsPage.cancelSubmitAddContactForm();
    await contactsPage.expectAddContactFormNotVisible();
  });

  test('Add contact without required first name', async ({
    loggedInUser,
    contactsPage,
    validContactInput,
  }) => {
    await contactsPage.createContactAndExpectError(
      { ...validContactInput, firstName: '' },
      msg.PREFIX_CONT_FIRST_NAME,
    );
  });

  test('Add contact without required last name', async ({
    loggedInUser,
    contactsPage,
    validContactInput,
  }) => {
    await contactsPage.createContactAndExpectError(
      { ...validContactInput, lastName: '' },
      msg.PREFIX_CONT_LAST_NAME,
    );
  });

  test('Add contact with invalid birth date', async ({
    loggedInUser,
    validContactInput,
    invalidContactInput,
    contactsPage,
  }) => {
    await contactsPage.createContactAndExpectError(
      {
        ...validContactInput,
        birthDate: invalidContactInput.birthDate,
      },
      msg.PREFIX_CONT_BDATE,
    );
  });

  test('Add contact with invalid email', async ({
    loggedInUser,
    validContactInput,
    invalidContactInput,
    contactsPage,
  }) => {
    await contactsPage.createContactAndExpectError(
      {
        ...validContactInput,
        email: invalidContactInput.email,
      },
      msg.PREFIX_CONT_EMAIL,
    );
  });

  test('Add contact with invalid phone number', async ({
    loggedInUser,
    validContactInput,
    invalidContactInput,
    contactsPage,
  }) => {
    await contactsPage.createContactAndExpectError(
      {
        ...validContactInput,
        phone: invalidContactInput.phone,
      },
      msg.PREFIX_CONT_PHONE,
    );
  });
});
