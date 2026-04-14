import { test, expect } from '../../fixtures/cart';
import {
  expectAddItemSuccess,
  expectCartQuantity,
  expectEmptyCartSuccess,
  registerUser,
} from '../../utils/cart-helpers';

test.describe('Toolshop API - Cart', () => {
  test.describe('Get cart', () => {
    test('Get cart for authenticated customer returns 200 and valid cart shape', async ({
      cartApi,
      userWithEmptyCart,
    }) => {
      const response = await cartApi.get(userWithEmptyCart.id);
      await expectEmptyCartSuccess(response, userWithEmptyCart.id);
    });

    test('Newly created customer account returns an empty cart', async ({
      userApi,
      cartApi,
      registrationData,
    }) => {
      const user = await registerUser(registrationData, userApi);

      const cartResponse = await cartApi.create(user.access_token);
      expect(cartResponse.status()).toBe(201);

      const cartBody = await cartResponse.json();
      const getCartResponse = await cartApi.get(cartBody.id);
      await expectEmptyCartSuccess(getCartResponse, cartBody.id);
    });

    test('Repeated cart fetch without changes returns the same cart state', async ({
      cartApi,
      userWithEmptyCart,
    }) => {
      const firstResponse = await cartApi.get(userWithEmptyCart.id);
      await expectEmptyCartSuccess(firstResponse, userWithEmptyCart.id);

      const secondResponse = await cartApi.get(userWithEmptyCart.id);
      await expectEmptyCartSuccess(secondResponse, userWithEmptyCart.id);
    });
  });

  test.describe('Add product', () => {
    test('Add valid product to cart returns 200 and updates cart', async ({
      cartApi,
      customProduct,
      userWithEmptyCart,
    }) => {
      const response = await cartApi.add(
        userWithEmptyCart.id,
        customProduct.id,
        1,
        userWithEmptyCart.access_token,
      );
      expect(response.status()).toBe(200);

      await expectCartQuantity(
        cartApi,
        userWithEmptyCart.id,
        customProduct.id,
        1,
      );
    });

    test('Add same product returns 200 and updates cart quantity', async ({
      cartApi,
      customProduct,
      userWithEmptyCart,
    }) => {
      await cartApi.add(
        userWithEmptyCart.id,
        customProduct.id,
        1,
        userWithEmptyCart.access_token,
      );

      await cartApi.add(
        userWithEmptyCart.id,
        customProduct.id,
        2,
        userWithEmptyCart.access_token,
      );

      await expectCartQuantity(
        cartApi,
        userWithEmptyCart.id,
        customProduct.id,
        3,
      );
    });

    test('Add two different valid products results in both appearing in cart', async ({
      cartApi,
      productApi,
      productInput,
      customProduct,
      userWithEmptyCart,
    }) => {
      const createResponse = await productApi.create(productInput);
      expect(createResponse.status()).toBe(201);

      const createdProduct = await createResponse.json();

      const addFirstResponse = await cartApi.add(
        userWithEmptyCart.id,
        createdProduct.id,
        1,
        userWithEmptyCart.access_token,
      );
      expect(addFirstResponse.status()).toBe(200);

      const addSecondResponse = await cartApi.add(
        userWithEmptyCart.id,
        customProduct.id,
        1,
        userWithEmptyCart.access_token,
      );
      expect(addSecondResponse.status()).toBe(200);

      const cartResponse = await cartApi.get(userWithEmptyCart.id);
      expect(cartResponse.status()).toBe(200);

      const cartBody = await cartResponse.json();
      const productIds = cartBody.cart_items.map((item) => item.product_id);

      expect(cartBody.cart_items).toHaveLength(2);
      expect(productIds).toContain(createdProduct.id);
      expect(productIds).toContain(customProduct.id);
    });
  });

  test.describe('Reject invalid product input', () => {
    // Add nonexistent product id is rejected.
    // Add malformed product id is rejected.
    // Add product with missing product identifier is rejected.
    // Add product with missing quantity is rejected, if quantity is required.
    // Add product with zero quantity is rejected.
    // Add product with negative quantity is rejected.
    // Add product with non-numeric quantity is rejected.
    // Add product with excessively large quantity is rejected or handled consistently.
    // Add product without authentication returns 401.
    // Add product with invalid token returns 401.
  });

  test.describe('Update quantity', () => {
    // Update existing cart item quantity to a higher valid value succeeds.
    // Update existing cart item quantity to a lower valid value succeeds.
    // Updated quantity is reflected in subsequent cart fetch.
    // Cart totals/subtotals update correctly after quantity change.
    // Update quantity for nonexistent cart item is rejected or handled consistently.
    // Update quantity with zero is rejected or removes item according to actual runtime behavior.
    // Update quantity with negative value is rejected.
    // Update quantity with non-numeric value is rejected.
    // Update quantity without authentication returns 401.
    // Update quantity with invalid token returns 401.
  });

  test.describe('Remove item', () => {
    // Remove existing cart item succeeds.
    // Removed item no longer appears in subsequent cart fetch.
    // Cart totals/subtotals update correctly after item removal.
    // Remove one item from multi-item cart leaves remaining items intact.
    // Remove nonexistent cart item is rejected or handled idempotently according to actual runtime behavior.
    // Remove item without authentication returns 401.
    // Remove item with invalid token returns 401.
  });

  test.describe('Totals and user isolation', () => {
    // Cart subtotal equals the sum of item price × quantity for all items.
    // Cart total remains consistent after add, update, and remove sequence.
    // Customer A cart changes do not affect Customer B cart.
    // Customer B cannot see items added by Customer A.
    // Customer A and Customer B maintain independent cart totals.
    // Re-fetching each user cart after both perform actions preserves correct isolation.
  });
});
