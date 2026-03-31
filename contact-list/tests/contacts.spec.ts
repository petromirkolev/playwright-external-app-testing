import { test, expect } from '../fixtures/contacts';
// ready
test.describe('Contact list happy path', () => {
  test.beforeEach(async ({ loggedInUser, contactsPage }) => {
    await contactsPage.contactListLoaded();
  });

  test('Contact list table is empty', async ({
    loggedInUser,
    contactsPage,
  }) => {
    await expect(contactsPage.contactTableBody).toHaveCount(0);
  });

  test('Contact list updates after contact creation', async ({
    loggedInUser,
    contactsPage,
    validContactInputs,
  }) => {
    await contactsPage.openAddContactForm();

    await contactsPage.fillContactForm({
      firstName: validContactInputs.firstName,
      lastName: validContactInputs.lastName,
      birthDate: validContactInputs.birthDate,
      email: validContactInputs.email,
      phone: validContactInputs.phone,
    });

    await contactsPage.submitContactForm();

    await contactsPage.expectContactVisible(
      validContactInputs.firstName,
      validContactInputs.lastName,
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
// ready
test.describe('Contact list add contact', () => {
  test.beforeEach(async ({ loggedInUser, contactsPage }) => {
    await contactsPage.contactListLoaded();
  });

  test('Cancel add contact returns to contacts page', async ({
    loggedInUser,
    contactsPage,
  }) => {
    await contactsPage.openAddContactForm();
    await contactsPage.cancelSubmitContactForm();
    await contactsPage.expectAddContactFormNotVisible();
  });

  test('Submit contact form without required first name', async ({
    loggedInUser,
    contactsPage,
    validContactInputs,
  }) => {
    await contactsPage.createContactAndExpectError(
      { firstName: '', lastName: validContactInputs.lastName },
      'Contact validation failed: firstName:',
    );
  });

  test('Submit contact form without required last name', async ({
    loggedInUser,
    contactsPage,
    validContactInputs,
  }) => {
    await contactsPage.createContactAndExpectError(
      { firstName: validContactInputs.firstName, lastName: '' },
      'Contact validation failed: lastName:',
    );
  });

  test('Create contact with invalid birth date', async ({
    loggedInUser,
    validContactInputs,
    invalidContactInputs,
    contactsPage,
  }) => {
    await contactsPage.createContactAndExpectError(
      {
        firstName: validContactInputs.firstName,
        lastName: validContactInputs.lastName,
        birthDate: invalidContactInputs.birthDate,
      },
      'Contact validation failed: birthdate:',
    );
  });

  test('Create contact with invalid email', async ({
    loggedInUser,
    validContactInputs,
    invalidContactInputs,
    contactsPage,
  }) => {
    await contactsPage.createContactAndExpectError(
      {
        firstName: validContactInputs.firstName,
        lastName: validContactInputs.lastName,
        email: invalidContactInputs.email,
      },
      'Contact validation failed: email:',
    );
  });

  test('Create contact with invalid phone number', async ({
    loggedInUser,
    validContactInputs,
    invalidContactInputs,
    contactsPage,
  }) => {
    await contactsPage.createContactAndExpectError(
      {
        firstName: validContactInputs.firstName,
        lastName: validContactInputs.lastName,
        phone: invalidContactInputs.phone,
      },
      'Contact validation failed: phone:',
    );
  });
});
// not ready
test.describe('Contact list edit contact', () => {
  test('Contact name update is accepted', async () => {});

  test('Contact name update is accepted', async () => {});

  // - update one field
  // - update multiple fields
  // - validation on invalid edits
  // - refresh persistence after save
});
// not ready
test.describe('Contact list delete contact', () => {
  // - delete existing contact
  // - deleted contact disappears from list
  // - delete persists after refresh
});
// not ready
test.describe('Contact list integrity', () => {
  // - contact detail view matches created data
  // - edits are reflected in detail/list views
  // - deleted contact is not accessible afterward
});
