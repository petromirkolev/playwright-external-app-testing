import { APIResponse, expect } from '@playwright/test';
import { RegistrationInput } from '../types/user';
import { UserApiClient } from './user-api-client';

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

export async function expectCartError(response: APIResponse, cartId: string) {
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(cartId);
  expect(Array.isArray(body.cart_items)).toBeTruthy();
  expect(body.cart_items).toHaveLength(0);
}
