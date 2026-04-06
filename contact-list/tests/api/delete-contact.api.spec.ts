import { test, expect } from '../../fixtures/api';

test.describe('Contact list - Delete contact API', () => {
  test('Delete existing contact succeeds', async ({
    userWithOneContact,
    apiClient,
  }) => {
    const response = await apiClient.deleteContact(
      userWithOneContact.token,
      userWithOneContact.contact_id,
    );
    expect(response.status()).toBe(200);

    const contactResponse = await apiClient.getContact(
      userWithOneContact.token,
      userWithOneContact.contact_id,
    );
    expect(contactResponse.status()).toBe(404);
  });

  test('Delete contact with non-existing id is rejected', async ({
    userWithOneContact,
    apiClient,
  }) => {
    const response = await apiClient.deleteContact(
      userWithOneContact.token,
      '123',
    );
    expect(response.status()).toBe(400);
  });
});
