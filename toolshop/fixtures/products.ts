import { test as base, expect } from './auth';
import { ProductInput, ProductResponse } from '../types/product';
import {
  uniqueProductName,
  validProductInput,
  validUpdateInput,
} from '../utils/product-data';

type ProductFixtures = {
  productInput: ProductInput;
  productUpdateInput: ProductInput;
  product: ProductResponse;
  productList: ProductResponse[];
};

export const test = base.extend<ProductFixtures>({
  productInput: async ({ productApi }, use) => {
    const brandsResponse = await productApi.getBrands();
    const brandsBody = await brandsResponse.json();

    const categoryResponse = await productApi.getCategories();
    const categoryBody = await categoryResponse.json();

    const imagesResponse = await productApi.getImages();
    const imagesBody = await imagesResponse.json();

    await use({
      ...validProductInput,
      name: uniqueProductName(),
      brand_id: brandsBody[0].id,
      category_id: categoryBody[0].id,
      product_image_id: imagesBody[0].id,
    });
  },

  productUpdateInput: async ({ productInput }, use) => {
    const input = { ...productInput, ...validUpdateInput };
    await use(input);
  },

  product: async ({ productInput, productApi, loggedInAdmin }, use) => {
    const response = await productApi.create(productInput);
    expect(response.status()).toBe(201);

    const body = await response.json();
    await use(body);

    try {
      const deleteResponse = await productApi.delete(
        body.id,
        loggedInAdmin.access_token,
      );

      const status = deleteResponse.status();

      if (status !== 204 && status !== 404) {
        console.warn(
          `Cleanup failed for product ${body.id}. Expected 204 or 404, got ${status}`,
        );
      }
    } catch (error) {
      console.warn(`Cleanup request failed for product ${body.id}:`, error);
    }
  },

  productList: async ({ productApi }, use) => {
    const listResponse = await productApi.getAll();
    expect(listResponse.status()).toBe(200);

    const listBody = await listResponse.json();
    expect(listBody.data.length).toBeGreaterThan(0);

    await use(listBody.data);
  },
});

export { expect };
