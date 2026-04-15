import { Cart } from '../types/cart';
import { test as base, expect } from './products';

type CartFixtures = {
  userWithEmptyCart: Cart & { user_id: string; access_token: string };
  userWithProductInCart: {
    cart_id: string;
    product_id: string;
    user_id: string;
    access_token: string;
  };
};

export const test = base.extend<CartFixtures>({
  userWithEmptyCart: async ({ cartApi, registeredAndLoggedInUser }, use) => {
    const response = await cartApi.create();
    expect(response.status()).toBe(201);

    const body = await response.json();
    const cartResponse = await cartApi.getCart(body.id);
    expect(cartResponse.status()).toBe(200);

    const cartBody = await cartResponse.json();

    await use({
      ...cartBody,
      user_id: registeredAndLoggedInUser.id,
      access_token: registeredAndLoggedInUser.access_token,
    });

    try {
      const deleteResponse = await cartApi.deleteCart(
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

  userWithProductInCart: async (
    { cartApi, product, userWithEmptyCart },
    use,
  ) => {
    const response = await cartApi.addToCart(userWithEmptyCart.id, {
      product_id: product.id,
      quantity: 1,
    });
    expect(response.status()).toBe(200);

    await use({
      cart_id: userWithEmptyCart.id,
      product_id: product.id,
      user_id: userWithEmptyCart.user_id,
      access_token: userWithEmptyCart.access_token,
    });
  },
});

export { expect };
