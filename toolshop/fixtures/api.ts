import { test as base, expect } from '@playwright/test';
import { UserApiClient } from '../utils/user/user-api-client';
import { ProductApiClient } from '../utils/product/product-api-client';
import { CartApiClient } from '../utils/cart/cart-api-client';
import { PaymentApiClient } from '../utils/payment/payment-api-client';
import { InvoiceApiClient } from '../utils/invoice/invoice-api-client';

type AuthFixtures = {
  userApi: UserApiClient;
  productApi: ProductApiClient;
  cartApi: CartApiClient;
  paymentApi: PaymentApiClient;
  invoiceApi: InvoiceApiClient;
};

export const test = base.extend<AuthFixtures>({
  userApi: async ({ request }, use) => {
    await use(new UserApiClient(request));
  },

  productApi: async ({ request }, use) => {
    await use(new ProductApiClient(request));
  },

  cartApi: async ({ request }, use) => {
    await use(new CartApiClient(request));
  },

  paymentApi: async ({ request }, use) => {
    await use(new PaymentApiClient(request));
  },

  invoiceApi: async ({ request }, use) => {
    await use(new InvoiceApiClient(request));
  },
});

export { expect };
