import { test as base, expect } from '@playwright/test';
import { UserApiClient } from '../utils/user-api-client';
import { ProductApiClient } from '../utils/product-api-client';

type AuthFixtures = {
  userApi: UserApiClient;
  productApi: ProductApiClient;
};

export const test = base.extend<AuthFixtures>({
  userApi: async ({ request }, use) => {
    await use(new UserApiClient(request));
  },

  productApi: async ({ request }, use) => {
    await use(new ProductApiClient(request));
  },
});

export { expect };
