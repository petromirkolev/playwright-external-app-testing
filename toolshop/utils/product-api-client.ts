import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async create(input: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post('products', {
      data: input,
    });
  }

  async getOne(id: string | undefined): Promise<APIResponse> {
    return this.request.get(`products/${id}`);
  }

  async getAll(): Promise<APIResponse> {
    return this.request.get('products');
  }

  async update(
    input: Record<string, unknown>,
    id: string,
  ): Promise<APIResponse> {
    return this.request.put(`products/${id}`, {
      data: input,
    });
  }

  async partialUpdate(
    input: Record<string, unknown>,
    id: string,
  ): Promise<APIResponse> {
    return this.request.patch(`products/${id}`, {
      data: input,
    });
  }

  async delete(id: string, token: string): Promise<APIResponse> {
    return this.request.delete(`products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async search(q: string, page: number): Promise<APIResponse> {
    return this.request.get(`products/search?q=${q}&page=${page}`);
  }

  async getBrands(): Promise<APIResponse> {
    return this.request.get('brands');
  }

  async getCategories(): Promise<APIResponse> {
    return this.request.get('categories');
  }

  async getImages(): Promise<APIResponse> {
    return this.request.get('images');
  }
}
