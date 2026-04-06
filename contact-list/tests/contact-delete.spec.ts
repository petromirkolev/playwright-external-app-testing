import { test } from '../fixtures/contacts';

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
