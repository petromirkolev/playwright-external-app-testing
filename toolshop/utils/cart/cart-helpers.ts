import { APIResponse, expect } from '@playwright/test';
import { CartApiClient } from './cart-api-client';

export async function expectEmptyCart(
  response: APIResponse,
  status: number,
  cartId: string,
): Promise<void> {
  expect(response.status()).toBe(status);

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
): Promise<void> {
  expect(response.status()).toBe(200);

  const cartResponse = await api.getCart(cartId);
  expect(cartResponse.status()).toBe(200);

  const cartBody = await cartResponse.json();

  expect(cartBody.id).toBe(cartId);
  expect(Array.isArray(cartBody.cart_items)).toBeTruthy();
  expect(cartBody.cart_items).toHaveLength(items);

  const isPresent = cartBody.cart_items.some(
    (item: { product_id: string }) => item.product_id === productId,
  );
  expect(isPresent).toBeTruthy();
}

export async function expectCartQuantity(
  api: CartApiClient,
  cartId: string,
  productId: string,
  quantity: number,
): Promise<void> {
  const response = await api.getCart(cartId);
  expect(response.status()).toBe(200);

  const body = await response.json();

  const item = body.cart_items.find(
    (item: { product_id: string }) => item.product_id === productId,
  );
  expect(item.quantity).toBe(quantity);
}
