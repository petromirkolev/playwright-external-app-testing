import { Cart } from '../types/cart';
import { CartApiClient } from '../utils/cart-api-client';
import { test as base, expect } from './products';

type CartFixtures = {
  cartApi: CartApiClient;
  userWithEmptyCart: Cart & { user_id: string; access_token: string };
};

export const test = base.extend<CartFixtures>({
  cartApi: async ({ request }, use) => {
    await use(new CartApiClient(request));
  },

  userWithEmptyCart: async ({ cartApi, registeredAndLoggedInUser }, use) => {
    const response = await cartApi.create(
      registeredAndLoggedInUser.access_token,
    );
    expect(response.status()).toBe(201);

    const body = await response.json();
    const cartResponse = await cartApi.get(body.id);
    expect(cartResponse.status()).toBe(200);

    const cartBody = await cartResponse.json();

    await use({
      ...cartBody,
      user_id: registeredAndLoggedInUser.id,
      access_token: registeredAndLoggedInUser.access_token,
    });

    try {
      const deleteResponse = await cartApi.delete(
        cartBody.id,
        registeredAndLoggedInUser.access_token,
      );

      const status = deleteResponse.status();

      if (status !== 204 && status !== 404) {
        console.warn(
          `Cleanup failed for product ${body.id}. Expected 204 or 404, got ${status}`,
        );
      }
    } catch (error) {
      console.warn(`Cleanup request failed for product ${body.id}:`, error);
    }
  },
});

export { expect };
