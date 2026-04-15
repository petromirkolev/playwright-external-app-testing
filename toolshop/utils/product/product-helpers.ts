import { APIResponse, expect } from '@playwright/test';
import { ProductInput, ProductResponse } from '../../types/product';
import { ProductApiClient } from './product-api-client';

export async function expectAddProductSuccess(
  response: APIResponse,
  input: ProductInput,
): Promise<void> {
  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.name).toBe(input.name);
  expect(body.price).toBe(input.price);
  expect(body.brand.id).toBe(input.brand_id);
  expect(body.category.id).toBe(input.category_id);
  expect(body.product_image.id).toBe(input.product_image_id);
}

export async function expectAddProductError(
  response: APIResponse,
  status: number,
  field: string,
  errorMessage: string,
): Promise<void> {
  expect(response.status()).toBe(status);

  const body = await response.json();

  expect(body[field]).toContain(errorMessage);
}

export async function expectUpdateProductSuccess(
  response: APIResponse,
  client: ProductApiClient,
  id: string,
  data: Record<string, unknown>,
): Promise<void> {
  expect(response.status()).toBe(200);

  const productResponse = await client.getOneProduct(id);
  expect(productResponse.status()).toBe(200);

  const productBody = await productResponse.json();
  const [field, expectedValue] = Object.entries(data)[0];
  expect(productBody[field]).toBe(expectedValue);
}

export async function expectDeleteProductSuccess(
  response: APIResponse,
  client: ProductApiClient,
  id: string,
): Promise<void> {
  expect(response.status()).toBe(204);

  const getResponse = await client.getOneProduct(id);

  expect(getResponse.status()).toBe(404);
}

export async function expectDeleteProductError(
  response: APIResponse,
  status: number,
  message: string | undefined,
): Promise<void> {
  expect(response.status()).toBe(status);

  const body = await response.json();

  expect(body.message).toBe(message);
}

export async function expectSortProductSuccess(
  response: APIResponse,
  field: string,
  order: string,
): Promise<void> {
  expect(response.status()).toBe(200);

  const body = await response.json();
  const actual = body.data.map((item: any) => item.field);
  let expected;

  if (field === 'name' && order === 'asc') {
    expected = [...actual].sort((a, b) => a.localeCompare(b));
  } else {
    expected = [...actual].sort((a, b) => b.localeCompare(a));
  }

  if (field === 'price' && order === 'asc') {
    expected = [...actual].sort((a, b) => a - b);
  } else {
    expected = [...actual].sort((a, b) => b - a);
  }

  expect(actual).toEqual(expected);
}

export async function expectUpdateProductError(
  response: APIResponse,
  client: ProductApiClient,
  id: string,
  data: Record<string, unknown>,
  product: Record<string, unknown>,
): Promise<void> {
  expect(response.status()).toBe(422);

  const productResponse = await client.getOneProduct(id);
  expect(productResponse.status()).toBe(200);

  const productBody = await productResponse.json();
  const [field] = Object.entries(data)[0];
  expect(productBody[field]).toBe(product[field]);
}

export async function expectGetProductSuccess(
  response: APIResponse,
  id: string,
): Promise<void> {
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(id).toBe(body.id);
}

export async function expectGetProductError(
  response: APIResponse,
  field: string,
  message: string,
): Promise<void> {
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body).toHaveProperty(field);

  const messages = Array.isArray(body[field]) ? body[field] : [body[field]];
  expect(messages).toContain(message);
}

export async function expectAllProductsMatch(
  products: ProductResponse[],
  predicate: (product: any) => boolean,
): Promise<void> {
  expect(products.length).toBeGreaterThan(0);
  expect(products.every(predicate)).toBe(true);
}
