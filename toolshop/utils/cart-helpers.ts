import { APIResponse, expect } from '@playwright/test';
import { RegistrationInput } from '../types/user';
import { UserApiClient } from './user-api-client';
import { CartApiClient } from './cart-api-client';

export async function registerUser(
  input: RegistrationInput,
  api: UserApiClient,
): Promise<any> {
  const userResponse = await api.register(input);

  expect(userResponse.status()).toBe(201);

  const userBody = await userResponse.json();

  return userBody;
}

export async function expectEmptyCartSuccess(
  response: APIResponse,
  cartId: string,
) {
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(cartId);
  expect(Array.isArray(body.cart_items)).toBeTruthy();
  expect(body.cart_items).toHaveLength(0);
}

export async function expectAddItemSuccess(
  response: APIResponse,
  api: CartApiClient,
  cartId: string,
  items: number,
  productId: string,
) {
  expect(response.status()).toBe(200);

  const cartResponse = await api.get(cartId);
  expect(cartResponse.status()).toBe(200);

  const cartBody = await cartResponse.json();

  expect(cartBody.id).toBe(cartId);
  expect(Array.isArray(cartBody.cart_items)).toBeTruthy();
  expect(cartBody.cart_items).toHaveLength(items);

  const isPresent = cartBody.cart_items.some(
    (item) => item.product_id === productId,
  );

  expect(isPresent).toBeTruthy();
}

export async function expectCartQuantity(
  api: CartApiClient,
  cartId: string,
  productId: string,
  quantity: number,
) {
  const response = await api.get(cartId);
  expect(response.status()).toBe(200);

  const body = await response.json();

  const item = body.cart_items.find((item) => item.product_id === productId);

  expect(item.quantity).toBe(quantity);
}

export async function expectCartError(response: APIResponse, cartId: string) {
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(cartId);
  expect(Array.isArray(body.cart_items)).toBeTruthy();
  expect(body.cart_items).toHaveLength(0);
}
