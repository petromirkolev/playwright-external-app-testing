import { test } from '../../fixtures/products';
import {
  expectUpdateProductError,
  expectUpdateProductSuccess,
} from '../../utils/product/product-helpers';
import {
  invalidPartialUpdate,
  validPartialUpdate,
  validUpdateInput,
} from '../../utils/product/product-data';

test.describe('Toolshop API - Update product', () => {
  test('Update product with valid data returns 201 and updated product', async ({
    productApi,
    product,
    productUpdateInput,
  }) => {
    const response = await productApi.update(productUpdateInput, product.id);

    await expectUpdateProductSuccess(
      response,
      productApi,
      product.id,
      validUpdateInput,
    );
  });

  test.describe('Partial valid update', () => {
    for (const { name, data } of validPartialUpdate) {
      test(name, async ({ productApi, product }) => {
        const response = await productApi.partialUpdate(
          { ...data },
          product.id,
        );

        await expectUpdateProductSuccess(
          response,
          productApi,
          product.id,
          data,
        );
      });
    }
  });

  test.describe('Partial invalid update', () => {
    for (const { name, data } of invalidPartialUpdate) {
      test(name, async ({ productApi, product }) => {
        const response = await productApi.partialUpdateRaw(
          { ...data },
          product.id,
        );

        await expectUpdateProductError(
          response,
          productApi,
          product.id,
          data,
          product,
        );
      });
    }
  });
});
