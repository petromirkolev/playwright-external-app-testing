import { test, expect } from '../../fixtures/cart';
import { addProductCases, updateQuantityCases } from '../../utils/cart-data';
import {
  expectAddItemSuccess,
  expectCartQuantity,
  expectEmptyCart,
} from '../../utils/cart-helpers';
import { msg } from '../../utils/constants';
import { expectError } from '../../utils/user-helpers';

test.describe('Toolshop API - Cart', () => {
  test.describe('Get cart', () => {
    test('Get cart for authenticated customer returns 200 and valid cart shape', async ({
      cartApi,
      userWithEmptyCart,
    }) => {
      const response = await cartApi.getCart(userWithEmptyCart.id);
      await expectEmptyCart(response, 200, userWithEmptyCart.id);
    });

    test('Newly created cart is empty', async ({ cartApi }) => {
      const cartResponse = await cartApi.create();
      expect(cartResponse.status()).toBe(201);

      const cartBody = await cartResponse.json();

      const getCartResponse = await cartApi.getCart(cartBody.id);
      await expectEmptyCart(getCartResponse, 200, cartBody.id);
    });

    test('Repeated cart fetch without changes returns the same cart state', async ({
      cartApi,
      userWithEmptyCart,
    }) => {
      const firstResponse = await cartApi.getCart(userWithEmptyCart.id);
      await expectEmptyCart(firstResponse, 200, userWithEmptyCart.id);

      const secondResponse = await cartApi.getCart(userWithEmptyCart.id);
      await expectEmptyCart(secondResponse, 200, userWithEmptyCart.id);
    });

    test('Get card with invalid cart id returns 404', async ({ cartApi }) => {
      const response = await cartApi.getCart('testing');

      await expectError(response, 404, 'message', msg.PROD_NOT_FOUND);
    });
  });

  test.describe('Add valid product', () => {
    test('Add valid product to cart returns 200 and updates cart', async ({
      cartApi,
      product,
      userWithEmptyCart,
    }) => {
      const response = await cartApi.addToCart(userWithEmptyCart.id, {
        product_id: product.id,
        quantity: 1,
      });
      expect(response.status()).toBe(200);

      await expectCartQuantity(cartApi, userWithEmptyCart.id, product.id, 1);
    });

    test('Add same product returns 200 and updates cart quantity', async ({
      cartApi,
      product,
      userWithEmptyCart,
    }) => {
      await cartApi.addToCart(userWithEmptyCart.id, {
        product_id: product.id,
        quantity: 1,
      });

      await cartApi.addToCart(userWithEmptyCart.id, {
        product_id: product.id,
        quantity: 2,
      });

      await expectCartQuantity(cartApi, userWithEmptyCart.id, product.id, 3);
    });

    test('Add two different valid products results in both appearing in cart', async ({
      cartApi,
      productApi,
      productInput,
      product,
      userWithEmptyCart,
    }) => {
      const createResponse = await productApi.create(productInput);
      expect(createResponse.status()).toBe(201);

      const createdProduct = await createResponse.json();

      const addFirstResponse = await cartApi.addToCart(userWithEmptyCart.id, {
        product_id: createdProduct.id,
        quantity: 1,
      });
      expect(addFirstResponse.status()).toBe(200);

      const addSecondResponse = await cartApi.addToCart(userWithEmptyCart.id, {
        product_id: product.id,
        quantity: 1,
      });
      expect(addSecondResponse.status()).toBe(200);

      const cartResponse = await cartApi.getCart(userWithEmptyCart.id);
      expect(cartResponse.status()).toBe(200);

      const cartBody = await cartResponse.json();
      const productIds = cartBody.cart_items.map(
        (item: { product_id: string }) => item.product_id,
      );

      expect(cartBody.cart_items).toHaveLength(2);
      expect(productIds).toContain(createdProduct.id);
      expect(productIds).toContain(product.id);
    });
  });

  test.describe('Add invalid product', () => {
    test('Add product with nonexistent product_id returns 404', async ({
      cartApi,
      userWithEmptyCart,
    }) => {
      const response = await cartApi.addToCart(userWithEmptyCart.id, {
        product_id: 'testingid',
        quantity: 1,
      });

      await expectError(response, 404, 'message', msg.RES_NOT_FOUND);
    });

    test('Add product with missing product_id returns 404', async ({
      cartApi,
      userWithEmptyCart,
    }) => {
      const response = await cartApi.addToCart(userWithEmptyCart.id, {
        quantity: 1,
      });
      await expectError(response, 404, 'message', msg.RES_NOT_FOUND);
    });

    test.describe('Add product with', () => {
      for (const { name, quantity } of addProductCases) {
        test(name, async ({ cartApi, product, userWithEmptyCart }) => {
          const response = await cartApi.addToCartRaw(userWithEmptyCart.id, {
            product_id: product.id,
            quantity,
          });
          await expectError(response, 404, 'message', msg.RES_NOT_FOUND);
        });
      }
    });
  });

  test.describe('Update product quantity', () => {
    test('Update cart item quantity to a higher valid value returns 200', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const quantity = 5;

      await cartApi.updateCartQuantity(userWithProductInCart.cart_id, {
        product_id: userWithProductInCart.product_id,
        quantity,
      });

      await expectCartQuantity(
        cartApi,
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        quantity,
      );
    });

    test('Update cart item quantity to a lower valid value returns 200', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const quantity = 5;

      await cartApi.updateCartQuantity(userWithProductInCart.cart_id, {
        product_id: userWithProductInCart.product_id,
        quantity,
      });

      await expectCartQuantity(
        cartApi,
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        quantity,
      );

      await cartApi.updateCartQuantity(userWithProductInCart.cart_id, {
        product_id: userWithProductInCart.product_id,
        quantity: 3,
      });

      await expectCartQuantity(
        cartApi,
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        3,
      );
    });

    test.describe('Update cart item quantity', () => {
      for (const { name, quantity } of updateQuantityCases) {
        test(name, async ({ cartApi, userWithProductInCart }) => {
          const response = await cartApi.updateCartQuantityRaw(
            userWithProductInCart.cart_id,
            {
              product_id: userWithProductInCart.product_id,
              quantity,
            },
          );
          await expectError(response, 404, 'message', msg.RES_NOT_FOUND);
        });
      }
    });

    test('Updated quantity is reflected in subsequent cart fetch', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const quantity = 5;

      await cartApi.updateCartQuantity(userWithProductInCart.cart_id, {
        product_id: userWithProductInCart.product_id,
        quantity,
      });

      await expectCartQuantity(
        cartApi,
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        quantity,
      );

      await expectCartQuantity(
        cartApi,
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        quantity,
      );
    });

    test('Update quantity for nonexistent cart item returns 404', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const response = await cartApi.updateCartQuantity(
        userWithProductInCart.cart_id,
        { product_id: 'test', quantity: 1 },
      );

      await expectError(response, 404, 'message', msg.RES_NOT_FOUND);
    });
  });

  test.describe('Remove item', () => {
    test('Remove existing cart item returns 204', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const response = await cartApi.deleteFromCart(
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        userWithProductInCart.access_token,
      );
      expect(response.status()).toBe(204);
    });

    test('Removed item no longer appears in cart', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const response = await cartApi.deleteFromCart(
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        userWithProductInCart.access_token,
      );
      expect(response.status()).toBe(204);

      const cartResponse = await cartApi.getCart(userWithProductInCart.cart_id);

      await expectEmptyCart(cartResponse, 200, userWithProductInCart.cart_id);
    });

    test('Remove one item from multi-item cart leaves remaining items intact', async ({
      cartApi,
      productApi,
      productInput,
      userWithProductInCart,
    }) => {
      const createProductResponse = await productApi.create(productInput);
      expect(createProductResponse.status()).toBe(201);

      const createdProduct = await createProductResponse.json();

      const addToCartResponse = await cartApi.addToCart(
        userWithProductInCart.cart_id,
        { product_id: createdProduct.id, quantity: 1 },
      );

      await expectAddItemSuccess(
        addToCartResponse,
        cartApi,
        userWithProductInCart.cart_id,
        2,
        createdProduct.id,
      );

      const removeResponse = await cartApi.deleteFromCart(
        userWithProductInCart.cart_id,
        createdProduct.id,
        userWithProductInCart.access_token,
      );
      expect(removeResponse.status()).toBe(204);

      const cartResponse = await cartApi.getCart(userWithProductInCart.cart_id);
      expect(cartResponse.status()).toBe(200);

      const cartBody = await cartResponse.json();
      const productIds = cartBody.cart_items.map(
        (item: { product_id: string }) => item.product_id,
      );

      expect(productIds).not.toContain(createdProduct.id);
      await expectCartQuantity(
        cartApi,
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        1,
      );
    });

    test('Remove nonexistent cart item returns 204', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const response = await cartApi.deleteFromCart(
        userWithProductInCart.cart_id,
        'testing',
        userWithProductInCart.access_token,
      );
      expect(response.status()).toBe(204);
    });

    test('Remove item without authentication returns 204', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const response = await cartApi.deleteFromCartWithoutAuth(
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
      );
      expect(response.status()).toBe(204);
    });

    test('Remove item with invalid token returns 204', async ({
      cartApi,
      userWithProductInCart,
    }) => {
      const response = await cartApi.deleteFromCartWithHeaders(
        userWithProductInCart.cart_id,
        userWithProductInCart.product_id,
        'testing',
      );
      expect(response.status()).toBe(204);
    });
  });
});
