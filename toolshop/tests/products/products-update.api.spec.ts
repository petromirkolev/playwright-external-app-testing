import { test, expect } from '../../fixtures/products';
import { validUpdateInput } from '../../utils/product-data';

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

  test('Partial update product with valid data returns 201 and updated product', async () => {});

  test('Partial update product with invalid data returns 401 and original product', async () => {});
});
