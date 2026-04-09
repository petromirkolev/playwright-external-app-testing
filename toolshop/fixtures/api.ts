import { test as base, expect } from '@playwright/test';
import { UserApiClient } from '../utils/api-client';

type AuthFixtures = {
  api: UserApiClient;
};

export const test = base.extend<AuthFixtures>({
  api: async ({ request }, use) => {
    await use(new UserApiClient(request));
  },
});

export { expect };
