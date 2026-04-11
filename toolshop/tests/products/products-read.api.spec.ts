import { test, expect } from '../../fixtures/products';
import { msg } from '../../utils/constants';
import {
  expectGetProductError,
  expectGetProductSuccess,
} from '../../utils/helpers';

test.describe('Toolshop API - Read product', () => {
  test('Get all products returns 200 and data', async ({ productApi }) => {
    const response = await productApi.getAll();

    expect(response.status()).toBe(200);
    expect(response.body()).toBeDefined();
  });

  test('Get product with valid id returns 201 and data', async ({
    productApi,
    customProduct,
  }) => {
    const response = await productApi.getOne(customProduct.id);

    expectGetProductSuccess(response, customProduct.id);
  });

  test('Get product with non-existing id returns 201 and data', async ({
    productApi,
    customProduct,
  }) => {
    const nonExistingId = '999999';
    const response = await productApi.getOne(nonExistingId);

    expectGetProductError(response, 'message', msg.PROD_NOT_FOUND);
  });

  test('Get product with invalid id returns 201 and data', async ({
    productApi,
  }) => {
    const nonExistingId = undefined;
    const response = await productApi.getOne(nonExistingId);

    expectGetProductError(response, 'message', msg.PROD_NOT_FOUND);
  });
});
