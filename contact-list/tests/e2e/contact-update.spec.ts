import { test, expect } from '../../fixtures/contacts';
import { msg } from '../../utils/constants';
import { validContactUpdateInput } from '../../utils/test-data';

test.describe('Contact list - Update contact E2E', () => {
  const validCases = [
    {
      title: 'first name',
      input: { firstName: validContactUpdateInput.firstName },
      locator: 'span#firstName',
      expected: validContactUpdateInput.firstName,
    },
    {
      title: 'last name',
      input: { lastName: validContactUpdateInput.lastName },
      locator: 'span#lastName',
      expected: validContactUpdateInput.lastName,
    },
    {
      title: 'birth date',
      input: { birthDate: validContactUpdateInput.birthDate },
      locator: 'span#birthdate',
      expected: validContactUpdateInput.birthDate,
    },
    {
      title: 'email',
      input: { email: validContactUpdateInput.email },
      locator: 'span#email',
      expected: validContactUpdateInput.email,
    },
    {
      title: 'phone',
      input: { phone: validContactUpdateInput.phone },
      locator: 'span#phone',
      expected: validContactUpdateInput.phone,
    },
  ] as const;

  for (const testCase of validCases) {
    test(`Contact ${testCase.title} update is accepted`, async ({
      loggedInUserWithOneContact,
      contactsPage,
    }) => {
      await contactsPage.openEditContactForm();
      await contactsPage.editContact(testCase.input);
      await expect(contactsPage.page.locator(testCase.locator)).toHaveText(
        testCase.expected,
      );
    });
  }

  const invalidCases = [
    {
      title: 'birth date',
      input: { birthDate: '1234' },
      message: msg.GENERIC_INV_BDATE,
    },
    {
      title: 'email',
      input: { email: '1234' },
      message: msg.GENERIC_INV_EMAIL,
    },
    {
      title: 'phone',
      input: { phone: 'abc' },
      message: msg.GENERIC_INV_PHONE,
    },
  ] as const;

  for (const testCase of invalidCases) {
    test(`Contact ${testCase.title} update with invalid input is rejected`, async ({
      loggedInUserWithOneContact,
      contactsPage,
    }) => {
      await contactsPage.openEditContactForm();
      await contactsPage.openEditForm();
      await contactsPage.editForm.fill(testCase.input);
      await contactsPage.editForm.submit();
      await contactsPage.editForm.expectError(testCase.message);
    });
  }
});
