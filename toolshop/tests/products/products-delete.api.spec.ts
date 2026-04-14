import { test } from '../../fixtures/products';
import { msg } from '../../utils/constants';
import {
  expectDeleteProductError,
  expectDeleteProductSuccess,
} from '../../utils/helpers';

test.describe('Toolshop API - Update product', () => {
  test('Delete product as admin returns 200', async ({
    productApi,
    customProduct,
    loggedInAdmin,
  }) => {
    const response = await productApi.delete(
      customProduct.id,
      loggedInAdmin.access_token,
    );

    await expectDeleteProductSuccess(response, productApi, customProduct.id);
  });

  test('Delete product as admin with invalid access token returns 401', async ({
    productApi,
    customProduct,
    loggedInAdmin,
  }) => {
    const response = await productApi.delete(customProduct.id, 'invalidtoken');

    await expectDeleteProductError(response, 401, msg.UNAUTH);
  });

  test('Delete product as customer returns 403', async ({
    productApi,
    customProduct,
    registeredAndLoggedInUser,
  }) => {
    const response = await productApi.delete(
      customProduct.id,
      registeredAndLoggedInUser.access_token,
    );

    await expectDeleteProductError(response, 403, msg.FORBIDDEN);
  });

  test('Delete nonexistent product returns 404', async ({
    productApi,
    loggedInAdmin,
  }) => {
    const response = await productApi.delete(
      'nonexistent-product-id',
      loggedInAdmin.access_token,
    );

    await expectDeleteProductError(response, 422, undefined);
  });
});
