import { test } from '../fixtures/contacts';

test.describe('Contact list delete contact', () => {
  test('Delete existing contact removes it from the list', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditForm();
    await contactsPage.deleteSelectedContact();
    await contactsPage.expectNoContacts();
  });

  test('Contact delete persists after page reload', async ({
    loggedInUserWithOneContact,
    contactsPage,
  }) => {
    await contactsPage.openEditForm();
    await contactsPage.deleteSelectedContact();
    await contactsPage.expectNoContacts();

    await contactsPage.page.reload();

    await contactsPage.expectNoContacts();
  });
});
