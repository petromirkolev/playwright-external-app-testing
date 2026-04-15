import { test, expect } from '../../fixtures/products';
import { expectSortProductSuccess } from '../../utils/product/product-helpers';
import { sortCases } from '../../utils/product/product-data';

test.describe('Toolshop API - Sort products', () => {
  test.describe('Valid sort', () => {
    for (const { name, field, direction } of sortCases) {
      test(name, async ({ productApi }) => {
        const response = await productApi.sortProducts(field, direction);
        await expectSortProductSuccess(response, field, direction);
      });
    }
  });

  test('Invalid sort field returns 500', async ({ productApi }) => {
    const response = await productApi.sortProducts('test', 'desc');

    expect(response.status()).toBe(500);
  });

  test('Invalid sort direction returns 200 and ASC order', async ({
    productApi,
  }) => {
    const response = await productApi.sortProducts('name', 'test');

    await expectSortProductSuccess(response, 'name', 'asc');
  });
});
