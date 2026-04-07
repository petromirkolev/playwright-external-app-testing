import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserInput } from '../types/user';
import { validUserInput } from './test-data';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(input: Partial<UserInput>): Promise<APIResponse> {
    return this.request.post('/user', {
      data: {
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        phone: input.phone,
      },
    });
  }

  async login(input: Partial<UserInput>): Promise<APIResponse> {
    return this.request.post('/user', {
      data: {
        username: input.username,
        password: input.password,
      },
    });
  }
}
