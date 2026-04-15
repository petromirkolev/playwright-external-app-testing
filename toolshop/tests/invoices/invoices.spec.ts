import { test, expect } from '../../fixtures/invoice';

test.describe('Toolshop API - Invoices', () => {
  test.describe('Get invoice', () => {
    test('Get all invoices succeeds', async ({
      invoiceApi,
      registeredAndLoggedInUser,
    }) => {
      const response = await invoiceApi.getAllInvoices(
        registeredAndLoggedInUser.access_token,
      );
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body.data)).toBeTruthy();
      expect(body.data.length).toBe(0);
    });

    test('Get invoice by valid id succeeds', async () => {});

    test('Get invoice by nonexistent id is rejected', async () => {});

    test('Get invoice by malformed id is rejected', async () => {});

    test('Get invoice without auth behaves as observed', async () => {});

    test('Get invoice with invalid auth behaves as observed', async () => {});
  });

  test.describe('Search invoice', () => {
    test('Search invoices with valid query succeeds', async () => {});

    test('Search with no matches returns empty valid shape', async () => {});

    test('Search without required query behaves as observed', async () => {});
  });

  test.describe('Update invoice', () => {
    test('Update invoice status with valid payload succeeds', async () => {});

    test('Update invoice status with invalid status is rejected', async () => {});

    test('Update invoice status without auth behaves as observed', async () => {});
  });

  test.describe('Download invoice', () => {
    test('Download PDF for valid invoice number succeeds', async () => {});

    test('Download PDF for nonexistent invoice number is rejected', async () => {});

    test('PDF status endpoint for valid invoice number succeeds', async () => {});
  });

  test.describe('Guest invoice', () => {
    test('Create guest invoice with valid payload succeeds', async () => {});

    test('Create guest invoice with invalid payload is rejected', async () => {});
  });
});
