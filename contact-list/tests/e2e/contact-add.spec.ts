import { test } from '../../fixtures/contacts';
import { msg } from '../../utils/constants';

test.describe('Contact list - Add contact E2E', () => {
  test.beforeEach(async ({ loggedInUser, contactsPage }) => {
    await contactsPage.contactTableLoaded();
  });

  test('Cancel add contact returns to contacts page', async ({
    contactsPage,
  }) => {
    await contactsPage.openAddContactForm();
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
    contactsPage,
    validContactInput,
  }) => {
    await contactsPage.addContact({ ...validContactInput, lastName: '' });
    await contactsPage.addForm.expectError(msg.PREFIX_CONT_LAST_NAME);
  });

  test('Add contact with invalid birth date', async ({
    validContactInput,
    invalidContactInput,
    contactsPage,
  }) => {
    await contactsPage.addContact({
      ...validContactInput,
      birthDate: invalidContactInput.birthDate,
    });
    await contactsPage.addForm.expectError(msg.PREFIX_CONT_BDATE);
  });

  test('Add contact with invalid email', async ({
    validContactInput,
    invalidContactInput,
    contactsPage,
  }) => {
    await contactsPage.addContact({
      ...validContactInput,
      email: invalidContactInput.email,
    });
    await contactsPage.addForm.expectError(msg.PREFIX_CONT_EMAIL);
  });

  test('Add contact with invalid phone number', async ({
    validContactInput,
    invalidContactInput,
    contactsPage,
  }) => {
    await contactsPage.addContact({
      ...validContactInput,
      phone: invalidContactInput.phone,
    });
    await contactsPage.addForm.expectError(msg.PREFIX_CONT_PHONE);
  });
});
