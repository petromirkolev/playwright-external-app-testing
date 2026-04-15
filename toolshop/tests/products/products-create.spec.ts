import { test, expect } from '../../fixtures/products';
import { msg } from '../../utils/constants';
import { missingProductInput } from '../../utils/product/product-data';
import {
  expectAddProductError,
  expectAddProductSuccess,
} from '../../utils/product/product-helpers';

test.describe('Toolshop API - Create product', () => {
  test('Create product with valid data returns 201 and the created product', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.createProduct(productInput);

    expectAddProductSuccess(response, productInput);
  });

  test.describe('Missing field:', () => {
    for (const { name, data, field, message } of missingProductInput) {
      test(name, async ({ productApi, productInput }) => {
        const response = await productApi.createProductRaw({
          ...productInput,
          ...data,
        });
        expectAddProductError(response, 422, field, message);
      });
    }
  });

  test('Create product with missing all fields returns 422 and error message', async ({
    productApi,
  }) => {
    const response = await productApi.createProductRaw({});

    expectAddProductError(response, 422, 'name', msg.PROD_REQ_NAME);
  });

  test('Create product with numeric name returns 422 and error message', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.createProductRaw({
      ...productInput,
      name: 1,
    });

    expectAddProductError(response, 422, 'name', msg.PROD_STR_NAME);
  });

  test('Create product with numeric category_id returns 500', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.createProductRaw({
      ...productInput,
      category_id: 1,
    });

    expect(response.status()).toBe(500);
  });

  test('Create product with numeric brand_id returns 500', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.createProductRaw({
      ...productInput,
      brand_id: 1,
    });

    expect(response.status()).toBe(500);
  });

  test('Create product with numeric product_image_id returns 422 and error message', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.createProductRaw({
      ...productInput,
      product_image_id: 1,
    });

    expectAddProductError(response, 422, 'product_image_id', msg.PROD_STR_IMG);
  });

  test('Create product with invalid product_image_id returns 500', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.createProductRaw({
      ...productInput,
      product_image_id: 'invalid-id',
    });

    expect(response.status()).toBe(500);
  });
});
