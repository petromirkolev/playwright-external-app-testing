import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginInput, RegistrationInput, UpdateInput } from '../types/user';
import { PetInput } from '../types/pet';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(input: RegistrationInput): Promise<APIResponse> {
    return await this.request.post('user', {
      data: input,
    });
  }

  async login(input: LoginInput): Promise<APIResponse> {
    return await this.request.get('user/login', {
      data: {
        input,
      },
    });
  }

  async logout(): Promise<APIResponse> {
    return await this.request.get('user/logout');
  }

  async getUser(username: string): Promise<APIResponse> {
    return await this.request.get(`user/${username}`);
  }

  async updateUser(username: string, input: UpdateInput): Promise<APIResponse> {
    return await this.request.put(`user/${username}`, {
      data: input,
    });
  }

  async deleteUser(username: string): Promise<APIResponse> {
    return await this.request.delete(`user/${username}`);
  }

  async createPet(input: PetInput): Promise<APIResponse> {
    return await this.request.post('pet', {
      data: input,
    });
  }

  async getPet(id: number): Promise<APIResponse> {
    return await this.request.get(`pet/${id}`);
  }
}
