import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';

test.describe('Contacts API - Delete contact', () => {
  test('Delete existing contact succeeds', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.deleteContact(
      request,
      userWithOneContact.token,
      userWithOneContact.contact_id,
    );
    expect(response.status()).toBe(200);

    const contactResponse = await api.getContact(
      request,
      userWithOneContact.token,
      userWithOneContact.contact_id,
    );
    expect(contactResponse.status()).toBe(404);
  });

  test('Delete contact with non-existing id is rejected', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.deleteContact(
      request,
      userWithOneContact.token,
      '123',
    );
    expect(response.status()).toBe(400);
  });
});
