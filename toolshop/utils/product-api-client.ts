import { APIRequestContext, APIResponse } from '@playwright/test';
import {
  PartialProductUpdateInput,
  ProductFilters,
  ProductInput,
  ProductUpdateInput,
} from '../types/product';

export class ProductApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async create(input: ProductInput): Promise<APIResponse> {
    return this.request.post('products', {
      data: input,
    });
  }

  async createRaw(input: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post('products', {
      data: input,
    });
  }

  async getOne(id: string): Promise<APIResponse> {
    return this.request.get(`products/${id}`);
  }

  async getOneRaw(
    id: string | number | null | undefined,
  ): Promise<APIResponse> {
    return this.request.get(`products/${id}`);
  }

  async getAll(): Promise<APIResponse> {
    return this.request.get('products');
  }

  async update(input: ProductUpdateInput, id: string): Promise<APIResponse> {
    return this.request.put(`products/${id}`, {
      data: input,
    });
  }

  async updateRaw(
    input: Record<string, unknown>,
    id: string,
  ): Promise<APIResponse> {
    return this.request.put(`products/${id}`, {
      data: input,
    });
  }

  async partialUpdate(
    input: PartialProductUpdateInput,
    id: string,
  ): Promise<APIResponse> {
    return this.request.patch(`products/${id}`, {
      data: input,
    });
  }

  async partialUpdateRaw(
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

  async sort(
    query: 'name' | 'price' | string,
    order: 'asc' | 'desc' | string,
  ): Promise<APIResponse> {
    return this.request.get(`products/?sort=${query}%2C${order}`);
  }

  async filter(filters: ProductFilters): Promise<APIResponse> {
    const params = new URLSearchParams();

    if (filters.by_brand) params.set('by_brand', filters.by_brand);
    if (filters.by_category) params.set('by_category', filters.by_category);
    if (filters.is_rental !== undefined) {
      params.set('is_rental', String(filters.is_rental));
    }
    if (filters.between) params.set('between', filters.between);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.page !== undefined) params.set('page', String(filters.page));

    const query = params.toString();

    return this.request.get(query ? `products?${query}` : 'products');
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
