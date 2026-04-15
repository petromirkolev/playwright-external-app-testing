import { test, expect } from '../../fixtures/products';
import { expectAllProductsMatch } from '../../utils/product/product-helpers';

test.describe('Toolshop API - Filter products', () => {
  test('Valid brand_id filter returns 200 and matching products only', async ({
    productApi,
    productList,
  }) => {
    const brandId = productList[0].brand.id;

    const response = await productApi.filter({ by_brand: brandId });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(
      body.data,
      (product) => product.brand.id === brandId,
    );
  });

  test('Valid category_id filter returns 200 and matching products only', async ({
    productApi,
    productList,
  }) => {
    const categoryId = productList[0].category.id;

    const response = await productApi.filter({ by_category: categoryId });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(
      body.data,
      (product) => product.category.id === categoryId,
    );
  });

  test('Non-existent brand_id filter returns 200 and no matching products', async ({
    productApi,
  }) => {
    const response = await productApi.filter({ by_brand: 'non-existing' });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBe(0);
  });

  test('Non-existent category_id filter returns 200 and no matching products', async ({
    productApi,
  }) => {
    const response = await productApi.filter({ by_category: 'non-existing' });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBe(0);
  });

  test('is_rental=true filter returns 200 and matching products', async ({
    productApi,
  }) => {
    const response = await productApi.filter({
      is_rental: true,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(body.data, (product) => product.is_rental === true);
  });

  test('is_rental=false filter returns 200 and matching products', async ({
    productApi,
  }) => {
    const response = await productApi.filter({
      is_rental: false,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(body.data, (product) => product.is_rental === false);
  });

  test('Valid price range returns 200 and in range results', async ({
    productApi,
  }) => {
    const response = await productApi.filter({ between: 'price,10,30' });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(
      body.data,
      (product) => product.price > 10 && product.price < 30,
    );
  });

  test('Invalid price range returns 200 and all products', async ({
    productApi,
    productList,
  }) => {
    const response = await productApi.filter({ between: '10,30' });
    expect(response.status()).toBe(200);

    const body = await response.json();

    const defaultIds = productList.map((product: any) => product.id);
    const filteredIds = body.data.map((product: any) => product.id);

    expect(filteredIds).toEqual(defaultIds);
  });

  test('brand_id + category_id filter returns 200 and matching products', async ({
    productApi,
    productList,
  }) => {
    const brandId = productList[0].brand.id;
    const categoryId = productList[0].category.id;

    const response = await productApi.filter({
      by_brand: brandId,
      by_category: categoryId,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(
      body.data,
      (product) =>
        product.brand.id === brandId && product.category.id === categoryId,
    );
  });

  test('category_id + price range returns 200 and matching products', async ({
    productApi,
    productList,
  }) => {
    const categoryId = productList[0].category.id;

    const response = await productApi.filter({
      by_category: categoryId,
      between: 'price,10,30',
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(
      body.data,
      (product) =>
        product.category.id === categoryId &&
        product.price > 10 &&
        product.price < 30,
    );
  });

  test('brand_id + price range returns 200 and matching products', async ({
    productApi,
    productList,
  }) => {
    const brandId = productList[0].brand.id;

    const response = await productApi.filter({
      by_brand: brandId,
      between: 'price,10,30',
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expectAllProductsMatch(
      body.data,
      (product) =>
        product.brand.id === brandId &&
        product.price > 10 &&
        product.price < 30,
    );
  });
});
