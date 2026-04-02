import { test, expect } from '../fixtures/contacts';

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
    await contactsPage.addContact({ ...validContactInput });

    await contactsPage.expectContactVisible(
      validContactInput.firstName,
      validContactInput.lastName,
    );
  });

  test('Contact list keeps created contact after page reload', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.expectContactVisible(
      loggedInUserWithOneContact.firstName,
      loggedInUserWithOneContact.lastName,
    );

    await contactsPage.page.reload();

    await contactsPage.expectContactVisible(
      loggedInUserWithOneContact.firstName,
      loggedInUserWithOneContact.lastName,
    );
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
      'Contact validation failed: firstName:',
    );
  });

  test('Add contact without required last name', async ({
    loggedInUser,
    contactsPage,
    validContactInput,
  }) => {
    await contactsPage.createContactAndExpectError(
      { ...validContactInput, lastName: '' },
      'Contact validation failed: lastName:',
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
      'Contact validation failed: birthdate:',
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
      'Contact validation failed: email:',
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
      'Contact validation failed: phone:',
    );
  });
});

test.describe('Contact list edit contact', () => {
  test('Contact first name update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact(loggedInUserWithOneContact.firstName, {
      firstName: 'Georgi',
    });

    await expect(contactsPage.page.locator('span#firstName')).toHaveText(
      'Georgi',
    );
  });

  test('Contact last name update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact(loggedInUserWithOneContact.lastName, {
      lastName: 'Petrov',
    });

    await expect(contactsPage.page.locator('span#lastName')).toHaveText(
      'Petrov',
    );
  });

  test('Contact birth date update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact(loggedInUserWithOneContact.birthDate, {
      birthDate: '1993-04-04',
    });

    await expect(contactsPage.page.locator('span#birthdate')).toHaveText(
      '1993-04-04',
    );
  });

  test('Contact email update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact(loggedInUserWithOneContact.email, {
      email: 'test@test.com',
    });

    await expect(contactsPage.page.locator('span#email')).toHaveText(
      'test@test.com',
    );
  });

  test('Contact phone update is accepted', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContact(loggedInUserWithOneContact.phone, {
      phone: '12345678',
    });

    await expect(contactsPage.page.locator('span#phone')).toHaveText(
      '12345678',
    );
  });

  test('Contact birth date update with invalid input is rejected', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContactAndExpectError(
      { birthDate: '1234' },
      loggedInUserWithOneContact.birthDate,
      'Birthdate is invalid',
    );
  });

  test('Contact email update with invalid input is rejected', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContactAndExpectError(
      { email: '1234' },
      loggedInUserWithOneContact.email,
      'Email is invalid',
    );
  });

  test('Contact phone update with invalid input is rejected', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditContactForm();

    await contactsPage.editContactAndExpectError(
      { phone: 'abc' },
      loggedInUserWithOneContact.phone,
      'Phone number is invalid',
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
