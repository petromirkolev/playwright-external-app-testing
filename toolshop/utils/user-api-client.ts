import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginInput, RegistrationInput } from '../types/user';

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

  async delete(
    id: string | undefined,
    token: string | undefined,
  ): Promise<APIResponse> {
    return this.request.delete(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async update(
    input: RegistrationInput,
    id: string | undefined,
    token: string | undefined,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async partialUpdate(
    input: RegistrationInput,
    id: string | undefined,
    token: string | undefined,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async get(
    id: string | undefined,
    token: string | undefined,
  ): Promise<APIResponse> {
    return this.request.get(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getMe(token: string | undefined): Promise<APIResponse> {
    return this.request.get('users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async refreshToken(token: string | undefined | null): Promise<APIResponse> {
    return this.request.get('users/refresh', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
