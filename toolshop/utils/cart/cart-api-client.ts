import { APIRequestContext, APIResponse } from '@playwright/test';
import { InvalidCartInput, ValidCartInput } from '../../types/cart';

export class CartApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createCart(): Promise<APIResponse> {
    return this.request.post('carts');
  }

  async addToCartValid(
    cartId: string,
    input: ValidCartInput,
  ): Promise<APIResponse> {
    return this.request.post(`carts/${cartId}`, {
      data: input,
    });
  }

  async addToCartInvalid(
    cartId: string,
    input: InvalidCartInput,
  ): Promise<APIResponse> {
    return this.request.post(`carts/${cartId}`, {
      data: input,
    });
  }

  async addToCartRaw(
    cartId: string,
    input: Record<string, unknown>,
  ): Promise<APIResponse> {
    return this.request.post(`carts/${cartId}`, {
      data: input,
    });
  }

  async getCart(cartId: string): Promise<APIResponse> {
    return this.request.get(`carts/${cartId}`);
  }

  async updateCartQuantityValid(
    cartId: string,
    input: ValidCartInput,
  ): Promise<APIResponse> {
    return this.request.put(`carts/${cartId}/product/quantity`, {
      data: input,
    });
  }

  async updateCartQuantityInvalid(
    cartId: string,
    input: InvalidCartInput,
  ): Promise<APIResponse> {
    return this.request.put(`carts/${cartId}/product/quantity`, {
      data: input,
    });
  }

  async updateCartQuantityRaw(
    cartId: string,
    input: Record<string, unknown>,
  ): Promise<APIResponse> {
    return this.request.put(`carts/${cartId}/product/quantity`, {
      data: input,
    });
  }

  async deleteFromCart(
    cartId: string,
    productId: string,
    token: string,
  ): Promise<APIResponse> {
    return this.request.delete(`carts/${cartId}/product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteFromCartWithoutAuth(
    cartId: string,
    productId: string,
  ): Promise<APIResponse> {
    return this.request.delete(`carts/${cartId}/product/${productId}`);
  }

  async deleteFromCartWithHeaders(
    cartId: string,
    productId: string,
    authValue: string,
  ): Promise<APIResponse> {
    return this.request.delete(`carts/${cartId}/product/${productId}`, {
      headers: { Authorization: authValue },
    });
  }

  async deleteCart(id: string, token: string): Promise<APIResponse> {
    return this.request.delete(`carts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
