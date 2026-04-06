import { test } from '../fixtures/contacts';
import { msg } from '../utils/constants';

test.describe('Contact list add contact', () => {
  test.beforeEach(async ({ loggedInUser, contactsPage }) => {
    await contactsPage.expectLoaded();
  });

  test('Cancel add contact returns to contacts page', async ({
    contactsPage,
  }) => {
    await contactsPage.openAddForm();
    await contactsPage.addForm.cancel();
    await contactsPage.addForm.expectNotVisible();
  });

  test('Add contact without required first name', async ({
    contactsPage,
    validContactInput,
  }) => {
    await contactsPage.addContact({ ...validContactInput, firstName: '' });
    await contactsPage.addForm.expectError(msg.PREFIX_CONT_FIRST_NAME);
  });

  test('Add contact without required last name', async ({
    loggedInUser,
    contactsPage,
    validContactInput,
  }) => {
    await contactsPage.addContact({ ...validContactInput, lastName: '' });
    await contactsPage.addForm.expectError(msg.PREFIX_CONT_LAST_NAME);
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
