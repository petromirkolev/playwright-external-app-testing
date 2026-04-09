import { APIResponse, expect } from '@playwright/test';
import { RegistrationInput } from '../types/user';
import { ProductInput, ProductResponse } from '../types/product';

export async function expectSuccess(
  response: APIResponse,
  registrationData: Partial<RegistrationInput>,
) {
  const body = await response.json();

  expect(body.first_name).toBe(registrationData.first_name);
  expect(body.last_name).toBe(registrationData.last_name);
  expect(body.email).toBe(registrationData.email);
  expect(body.id).toBeDefined();
}

export async function expectError(
  response: APIResponse,
  field: string,
  message: string,
) {
  const body = await response.json();
  expect(body).toHaveProperty(field);

  const messages = Array.isArray(body[field]) ? body[field] : [body[field]];
  expect(messages).toContain(message);
}

export async function expectSuccessAndToken(response: APIResponse) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.access_token).toBeDefined();
}

export async function expectAddProductSuccess(
  response: APIResponse,
  input: ProductInput,
) {
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
  field: string,
  errorMessage: string,
) {
  expect(response.status()).toBe(422);

  const body = await response.json();

  expect(body[field]).toContain(errorMessage);
}
