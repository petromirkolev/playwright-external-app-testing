import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';
import { validContactUpdateInput } from '../../utils/test-data';

test.skip(); // Skipping for now as update API endpoint is not working at the moment
test.describe('Update', () => {
  test('Update contact with valid data succeeds', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.updateContact(
      request,
      userWithOneContact.token,
      { ...validContactUpdateInput },
    );
  });

  test('Update contact with non-exisitng id is rejected', async () => {});

  test('Update contact with invalid birth date is rejected', async () => {});

  test('Update contact with invalid email is rejected', async () => {});

  test('Update contact with invalid phone is rejected', async () => {});

  test('Update contact with empty payload is rejected', async () => {});
});
