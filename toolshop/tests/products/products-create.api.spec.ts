import { test, expect } from '../../fixtures/products';
import { msg } from '../../utils/constants';
import {
  expectAddProductError,
  expectAddProductSuccess,
} from '../../utils/helpers';

test.describe('Toolshop API - Create product', () => {
  test('Create product with valid data returns 200 and the created product', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create(productInput);

    expectAddProductSuccess(response, productInput);
  });

  test('Create product with missing required name returns 422 and error message', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create({
      ...productInput,
      name: undefined,
    });

    expectAddProductError(response, 'name', msg.PROD_REQ_NAME);
  });

  test('Create product with missing required price returns 422 and error message', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create({
      ...productInput,
      price: undefined,
    });

    expectAddProductError(response, 'price', msg.PROD_REQ_PRICE);
  });

  test('Create product with missing required category_id returns 422 and error message', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create({
      ...productInput,
      category_id: undefined,
    });

    expectAddProductError(response, 'category_id', msg.PROD_REQ_CAT);
  });

  test('Create product with missing required brand_id returns 422 and error message', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create({
      ...productInput,
      brand_id: undefined,
    });

    expectAddProductError(response, 'brand_id', msg.PROD_REQ_BRAND);
  });

  test('Create product with missing required is_location_offer returns 422 and error message', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create({
      ...productInput,
      is_location_offer: undefined,
    });

    expectAddProductError(response, 'is_location_offer', msg.PROD_REQ_LOC);
  });

  test('Create product with missing required is_rental returns 422 and error message', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create({
      ...productInput,
      is_rental: undefined,
    });

    expectAddProductError(response, 'is_rental', msg.PROD_REQ_RENT);
  });

  test('Create product with missing required product_image_id returns 422 and error message', async ({
    productApi,
    productInput,
  }) => {
    const response = await productApi.create({
      ...productInput,
      product_image_id: undefined,
    });

    expectAddProductError(response, 'product_image_id', msg.PROD_REQ_IMG);
  });

  test('Create product with missing all fields returns 422 and error message', async ({
    productApi,
  }) => {
    const response = await productApi.create({});

    expectAddProductError(response, 'name', msg.PROD_REQ_NAME);
  });

  test('Create product with numeric name returns 422 and error message', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.create({ ...productInput, name: 1 });

    expectAddProductError(response, 'name', msg.PROD_STR_NAME);
  });

  test('Create product with numeric category_id returns 500', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.create({
      ...productInput,
      category_id: 1,
    });

    expect(response.status()).toBe(500);
  });

  test('Create product with numeric brand_id returns 500', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.create({ ...productInput, brand_id: 1 });

    expect(response.status()).toBe(500);
  });

  test('Create product with numeric product_image_id returns 422 and error message', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.create({
      ...productInput,
      product_image_id: 1,
    });

    expectAddProductError(response, 'product_image_id', msg.PROD_STR_IMG);
  });

  test('Create product with invalid product_image_id returns 500', async ({
    productInput,
    productApi,
  }) => {
    const response = await productApi.create({
      ...productInput,
      product_image_id: 'invalid-id',
    });

    expect(response.status()).toBe(500);
  });
});
