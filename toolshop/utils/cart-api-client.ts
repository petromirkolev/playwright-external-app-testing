import { APIRequestContext, APIResponse } from '@playwright/test';

export class CartApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async create(token: string): Promise<APIResponse> {
    return this.request.post('carts', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async add(
    cartId: string,
    product_id: string,
    quantity: number,
    token: string,
  ): Promise<APIResponse> {
    return this.request.post(`carts/${cartId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        product_id,
        quantity,
      },
    });
  }

  async get(id: string | undefined): Promise<APIResponse> {
    return this.request.get(`carts/${id}`);
  }

  async delete(id: string, token: string): Promise<APIResponse> {
    return this.request.delete(`carts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
