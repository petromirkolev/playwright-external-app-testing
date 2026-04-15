import { test } from '../../fixtures/products';
import { msg } from '../../utils/constants';
import {
  expectDeleteProductError,
  expectDeleteProductSuccess,
} from '../../utils/product/product-helpers';

test.describe('Toolshop API - Update product', () => {
  test('Delete product with admin access token returns 200', async ({
    productApi,
    product,
    loggedInAdmin,
  }) => {
    const response = await productApi.deleteProduct(
      product.id,
      loggedInAdmin.access_token,
    );

    await expectDeleteProductSuccess(response, productApi, product.id);
  });

  test('Delete product with invalid access token returns 401', async ({
    productApi,
    product,
  }) => {
    const response = await productApi.deleteProduct(product.id, 'invalidtoken');

    await expectDeleteProductError(response, 401, msg.UNAUTH);
  });

  test('Delete product with customer access token returns 403', async ({
    productApi,
    product,
    registeredAndLoggedInUser,
  }) => {
    const response = await productApi.deleteProduct(
      product.id,
      registeredAndLoggedInUser.access_token,
    );

    await expectDeleteProductError(response, 403, msg.FORBIDDEN);
  });

  test('Delete non-existent product returns 404', async ({
    productApi,
    loggedInAdmin,
  }) => {
    const response = await productApi.deleteProduct(
      'nonexistent-product-id',
      loggedInAdmin.access_token,
    );

    await expectDeleteProductError(response, 422, undefined);
  });
});
