import { ProductInput } from '../types/product';
import { validProductInput } from '../utils/product-data';
import { test as base, expect } from './auth';

type ProductFixtures = {
  productData: ProductInput;
  productInput: ProductInput;
};

export const test = base.extend<ProductFixtures>({
  productData: async ({}, use) => {
    await use(validProductInput);
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
});

export { expect };
