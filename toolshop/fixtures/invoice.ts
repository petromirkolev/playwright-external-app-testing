import { InvoiceData } from '../types/invoice';
import { validInvoiceData } from '../utils/invoice/invoice-data';
import { test as base, expect } from './payment';

type InvoiceFixtures = {
  invoiceInput: InvoiceData;
  issuedInvoice: { id: string };
};

export const test = base.extend<InvoiceFixtures>({
  invoiceInput: async ({ userWithProductInCart }, use) => {
    await use({ ...validInvoiceData, cart_id: userWithProductInCart.cart_id });
  },

  issuedInvoice: async (
    { invoiceApi, invoiceInput, userWithProductInCart },
    use,
  ) => {
    const response = await invoiceApi.createInvoice(
      invoiceInput,
      userWithProductInCart.access_token,
    );
    expect(response.status()).toBe(201);

    const body = await response.json();

    await use(body);
  },
});

export { expect };
