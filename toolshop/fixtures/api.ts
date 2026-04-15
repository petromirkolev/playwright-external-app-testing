import { test as base, expect } from '@playwright/test';
import { UserApiClient } from '../utils/user-api-client';
import { ProductApiClient } from '../utils/product-api-client';
import { CartApiClient } from '../utils/cart-api-client';

type AuthFixtures = {
  userApi: UserApiClient;
  productApi: ProductApiClient;
  cartApi: CartApiClient;
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
});

export { expect };
