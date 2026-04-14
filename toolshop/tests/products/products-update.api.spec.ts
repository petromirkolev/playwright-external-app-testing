import { test, expect } from '../../fixtures/products';
import {
  expectUpdateProductError,
  expectUpdateProductSuccess,
} from '../../utils/helpers';
import {
  invalidPartialUpdate,
  validPartialUpdate,
  validUpdateInput,
} from '../../utils/product-data';

test.describe('Toolshop API - Update product', () => {
  test('Update product with valid data returns 201 and updated product', async ({
    productApi,
    customProduct,
  }) => {
    const response = await productApi.update(
      validUpdateInput,
      customProduct.id,
    );
    expect(response.status()).toBe(200);

    const updatedProductResponse = await productApi.getOne(customProduct.id);
    const updatedProductBody = await updatedProductResponse.json();

    expect(updatedProductBody.id).toMatch(customProduct.id);
    expect(updatedProductBody.name).toBe(validUpdateInput.name);
    expect(updatedProductBody.price).toBe(validUpdateInput.price);
  });

  test.describe('Partial valid update', () => {
    for (const { name, data } of validPartialUpdate) {
      test(name, async ({ productApi, customProduct }) => {
        const response = await productApi.partialUpdate(
          { ...data },
          customProduct.id,
        );

        await expectUpdateProductSuccess(
          response,
          productApi,
          customProduct.id,
          data,
        );
      });
    }
  });

  test.describe('Partial invalid update', () => {
    for (const { name, data } of invalidPartialUpdate) {
      test(name, async ({ productApi, customProduct }) => {
        const response = await productApi.partialUpdate(
          { ...data },
          customProduct.id,
        );

        await expectUpdateProductError(
          response,
          productApi,
          customProduct.id,
          data,
          customProduct,
        );
      });
    }
  });
});
