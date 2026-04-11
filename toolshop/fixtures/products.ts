import { ProductInput, ProductResponse } from '../types/product';
import { uniqueProductName, validProductInput } from '../utils/product-data';
import { test as base, expect } from './auth';

type ProductFixtures = {
  productData: ProductInput;
  productInput: ProductInput;
  customProduct: ProductResponse;
};

export const test = base.extend<ProductFixtures>({
  productData: async ({}, use) => {
    await use({ ...validProductInput, name: uniqueProductName() });
  },

  productInput: async ({ productApi, productData }, use) => {
    const brandsResponse = await productApi.getBrands();
    const brandsBody = await brandsResponse.json();

    const categoryResponse = await productApi.getCategories();
    const categoryBody = await categoryResponse.json();

    const imagesResponse = await productApi.getImages();
    const imagesBody = await imagesResponse.json();

    await use({
      ...productData,
      brand_id: brandsBody[0].id,
      category_id: categoryBody[0].id,
      product_image_id: imagesBody[0].id,
    });
  },

  customProduct: async ({ productInput, productApi, loggedInAdmin }, use) => {
    const response = await productApi.create(productInput);
    expect(response.status()).toBe(201);

    const body = await response.json();
    await use(body);

    const deleteResponse = await productApi.delete(
      body.id,
      loggedInAdmin.access_token,
    );
    expect(deleteResponse.status()).toBe(204);
  },
});

export { expect };
