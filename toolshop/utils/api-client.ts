import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginInput, RegistrationInput } from '../types/user';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(input: RegistrationInput): Promise<APIResponse> {
    return this.request.get('/users/register', {
      data: input,
    });
  }

  // async login(input: LoginInput): Promise<APIResponse> {}
}
