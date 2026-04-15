import { APIRequestContext, APIResponse } from '@playwright/test';
import {
  LoginInput,
  PartialUpdateInput,
  RegistrationInput,
  UpdateInput,
} from '../../types/user';

export class UserApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(input: RegistrationInput): Promise<APIResponse> {
    return this.request.post('users/register', {
      data: input,
    });
  }

  async login(input: LoginInput): Promise<APIResponse> {
    return this.request.post('users/login', {
      data: input,
    });
  }

  async delete(id: string, token: string): Promise<APIResponse> {
    return this.request.delete(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteWithoutAuth(id: string): Promise<APIResponse> {
    return this.request.delete(`users/${id}`);
  }

  async deleteWithAuthHeader(
    id: string,
    authValue: string,
  ): Promise<APIResponse> {
    return this.request.delete(`users/${id}`, {
      headers: { Authorization: authValue },
    });
  }

  async update(
    input: UpdateInput,
    id: string,
    token: string,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async updateWithoutAuth(
    input: UpdateInput,
    id: string,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      data: input,
    });
  }

  async updateWithAuthHeader(
    input: UpdateInput,
    id: string,
    authValue: string,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      headers: { Authorization: authValue },
      data: input,
    });
  }

  async partialUpdate(
    input: PartialUpdateInput,
    id: string,
    token: string,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async partialUpdateWithoutAuth(
    input: PartialUpdateInput,
    id: string,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      data: input,
    });
  }

  async partialUpdateWithAuthHeader(
    input: PartialUpdateInput,
    id: string,
    authValue: string,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      headers: { Authorization: authValue },
      data: input,
    });
  }

  async get(id: string, token: string): Promise<APIResponse> {
    return this.request.get(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getWithoutAuth(id: string): Promise<APIResponse> {
    return this.request.get(`users/${id}`);
  }

  async getWithAuthHeader(id: string, authValue: string): Promise<APIResponse> {
    return this.request.get(`users/${id}`, {
      headers: { Authorization: authValue },
    });
  }

  async getMe(token: string): Promise<APIResponse> {
    return this.request.get('users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getMeWithoutAuth(): Promise<APIResponse> {
    return this.request.get('users/me');
  }

  async getMeWithAuthHeader(authValue: string): Promise<APIResponse> {
    return this.request.get('users/me', {
      headers: { Authorization: authValue },
    });
  }

  async refreshToken(token: string): Promise<APIResponse> {
    return this.request.get('users/refresh', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
