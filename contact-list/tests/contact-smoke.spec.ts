import { test, expect } from '../fixtures/contacts';

test.describe('Contact list - Happy path E2E', () => {
  test.beforeEach(async ({ loggedInUser, contactsPage }) => {
    await contactsPage.contactTableLoaded();
  });

  test('Contact list table is empty', async ({ contactsPage }) => {
    await expect(contactsPage.contactTable).toHaveCount(1);
  });

  test('Contact list updates after contact creation', async ({
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
