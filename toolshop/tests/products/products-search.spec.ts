import { test, expect } from '../../fixtures/products';

test.describe('Toolshop API - Search products', () => {
  test('Valid search item returns 200 and expected fields', async ({
    productApi,
  }) => {
    const page = 1;

    const listResponse = await productApi.getAll();
    expect(listResponse.status()).toBe(200);

    const listBody = await listResponse.json();
    expect(listBody.data.length).toBeGreaterThan(0);

    const product = listBody.data[0];

    const searchResponse = await productApi.search(product.name, page);
    expect(searchResponse.status()).toBe(200);

    const searchBody = await searchResponse.json();

    const searchProduct = searchBody.data.find(
      (data: any) => data.name === product.name,
    );

    expect(searchProduct).toBeDefined();
    expect(searchBody.current_page).toBe(page);
    expect(searchProduct.name).toBe(product.name);
    expect(searchProduct.id).toBe(product.id);
  });

  test('Invalid search item returns 200 and no results', async ({
    productApi,
  }) => {
    const page = 1;

    const searchResponse = await productApi.search(
      'testing-query-non-existing',
      page,
    );
    expect(searchResponse.status()).toBe(200);

    const body = await searchResponse.json();
    expect(body.data.length).toBe(0);
  });
});
