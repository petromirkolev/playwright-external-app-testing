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

test.describe('Contact list edit contact', () => {
  test('Contact first name update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact({
      firstName: validContactUpdateInput.firstName,
    });

    await expect(contactsPage.page.locator('span#firstName')).toHaveText(
      validContactUpdateInput.firstName,
    );
  });

  test('Contact last name update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact({
      lastName: validContactUpdateInput.lastName,
    });

    await expect(contactsPage.page.locator('span#lastName')).toHaveText(
      validContactUpdateInput.lastName,
    );
  });

  test('Contact birth date update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact({
      birthDate: validContactUpdateInput.birthDate,
    });

    await expect(contactsPage.page.locator('span#birthdate')).toHaveText(
      validContactUpdateInput.birthDate,
    );
  });

  test('Contact email update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact({
      email: validContactUpdateInput.email,
    });

    await expect(contactsPage.page.locator('span#email')).toHaveText(
      validContactUpdateInput.email,
    );
  });

  test('Contact phone update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact({
      phone: validContactUpdateInput.phone,
    });

    await expect(contactsPage.page.locator('span#phone')).toHaveText(
      validContactUpdateInput.phone,
    );
  });

  test('Contact birth date update with invalid input is rejected', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContactAndExpectError(
      { birthDate: '1234' },
      msg.GENERIC_INV_BDATE,
    );
  });

  test('Contact email update with invalid input is rejected', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContactAndExpectError(
      { email: '1234' },
      msg.GENERIC_INV_EMAIL,
    );
  });

  test('Contact phone update with invalid input is rejected', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContactAndExpectError(
      { phone: 'abc' },
      msg.GENERIC_INV_PHONE,
    );
  });
});

test.describe('Contact list delete contact', () => {
  test('Delete existing contact removes it from the list', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();
    await contactsPage.deleteContact();
    await contactsPage.expectContactNotVisible();
  });

  test('Contact delete persists after page reload', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();
    await contactsPage.deleteContact();
    await contactsPage.expectContactNotVisible();

    await contactsPage.page.reload();

    await contactsPage.expectContactNotVisible();
  });
});
