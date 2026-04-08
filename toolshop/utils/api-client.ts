import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginInput, RegistrationInput } from '../types/user';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(input: Partial<RegistrationInput>): Promise<APIResponse> {
    return this.request.post('users/register', {
      data: input,
    });
  }

  async login(input: LoginInput): Promise<APIResponse> {
    return this.request.post('users/login', {
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
