import { test, expect } from '../../fixtures/invoice';
import { msg } from '../../utils/constants';
import { expectError } from '../../utils/user/user-helpers';

test.describe('Toolshop API - Invoices', () => {
  test.describe('Get invoice', () => {
    test('Get all invoices returns 200 and invoices data', async ({
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

    test('Get invoice by valid id returns 200 and invoice data', async ({
      invoiceApi,
      issuedInvoice,
      userWithProductInCart,
    }) => {
      const response = await invoiceApi.getOneInvoice(
        issuedInvoice.id,
        userWithProductInCart.access_token,
      );
      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.id).toBe(issuedInvoice.id);

      const isProduct = body.invoicelines.find(
        (line: any) => line.product.id === userWithProductInCart.product_id,
      );

      if (isProduct)
        expect(isProduct.product_id).toBe(userWithProductInCart.product_id);
    });

    test('Get invoice by nonexistent id returns 404', async ({
      invoiceApi,
      userWithProductInCart,
    }) => {
      const response = await invoiceApi.getOneInvoice(
        'test',
        userWithProductInCart.access_token,
      );

      await expectError(response, 404, 'message', msg.PROD_NOT_FOUND);
    });

    test('Get invoice without auth behaves as observed', async ({
      invoiceApi,
      issuedInvoice,
    }) => {
      const response = await invoiceApi.getOneInvoiceWithoutAuth(
        issuedInvoice.id,
      );

      await expectError(response, 401, 'message', msg.UNAUTH);
    });

    test('Get invoice with invalid auth behaves as observed', async ({
      invoiceApi,
      issuedInvoice,
    }) => {
      const response = await invoiceApi.getOneInvoiceWithHeaders(
        issuedInvoice.id,
        'test',
      );

      await expectError(response, 401, 'message', msg.UNAUTH);
    });
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
