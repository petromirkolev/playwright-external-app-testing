import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginInput, RegistrationInput } from '../types/user';

export class UserApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async registerUser(input: Partial<RegistrationInput>): Promise<APIResponse> {
    return this.request.post('users/register', {
      data: input,
    });
  }

  async loginUser(input: LoginInput): Promise<APIResponse> {
    return this.request.post('users/login', {
      data: input,
    });
  }

  async deleteUser(
    id: string | undefined,
    token: string | undefined,
  ): Promise<APIResponse> {
    return this.request.delete(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateUser(
    input: Partial<RegistrationInput>,
    id: string | undefined,
    token: string | undefined,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async partialUpdateUser(
    input: Partial<RegistrationInput>,
    id: string | undefined,
    token: string | undefined,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async getUser(
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
}
