import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginInput, RegistrationInput, UpdateInput } from '../types/user';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(input: Partial<RegistrationInput>): Promise<APIResponse> {
    return this.request.post('user', {
      data: input,
    });
  }

  async login(input: Partial<LoginInput>): Promise<APIResponse> {
    return this.request.post('user', {
      data: {
        input,
      },
    });
  }

  async getUser(username: string): Promise<APIResponse> {
    return this.request.get(`user/${username}`);
  }

  async updateUser(
    username: string,
    input: Partial<UpdateInput>,
  ): Promise<APIResponse> {
    return this.request.put(`user/${username}`, {
      data: input,
    });
  }

  async deleteUser(username: string): Promise<APIResponse> {
    return this.request.delete(`user/${username}`);
  }
}
