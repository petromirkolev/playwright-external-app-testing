import { APIRequestContext, APIResponse } from '@playwright/test';
import {
  LoginInput,
  PartialUpdateInput,
  RegistrationInput,
  UpdateInput,
} from '../../types/user';

export class UserApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async registerUser(input: RegistrationInput): Promise<APIResponse> {
    return this.request.post('users/register', {
      data: input,
    });
  }

  async loginUser(input: LoginInput): Promise<APIResponse> {
    return this.request.post('users/login', {
      data: input,
    });
  }

  async deleteUser(id: string, token: string): Promise<APIResponse> {
    return this.request.delete(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteUserWithoutAuth(id: string): Promise<APIResponse> {
    return this.request.delete(`users/${id}`);
  }

  async deleteUserWithAuthHeader(
    id: string,
    authValue: string,
  ): Promise<APIResponse> {
    return this.request.delete(`users/${id}`, {
      headers: { Authorization: authValue },
    });
  }

  async updateUser(
    input: UpdateInput,
    id: string,
    token: string,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async updateUserWithoutAuth(
    input: UpdateInput,
    id: string,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      data: input,
    });
  }

  async updateUserWithAuthHeader(
    input: UpdateInput,
    id: string,
    authValue: string,
  ): Promise<APIResponse> {
    return this.request.put(`users/${id}`, {
      headers: { Authorization: authValue },
      data: input,
    });
  }

  async partialUserUpdate(
    input: PartialUpdateInput,
    id: string,
    token: string,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async partialUserUpdateWithoutAuth(
    input: PartialUpdateInput,
    id: string,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      data: input,
    });
  }

  async partialUserUpdateWithAuthHeader(
    input: PartialUpdateInput,
    id: string,
    authValue: string,
  ): Promise<APIResponse> {
    return this.request.patch(`users/${id}`, {
      headers: { Authorization: authValue },
      data: input,
    });
  }

  async getUser(id: string, token: string): Promise<APIResponse> {
    return this.request.get(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getUserWithoutAuth(id: string): Promise<APIResponse> {
    return this.request.get(`users/${id}`);
  }

  async getUserWithAuthHeader(
    id: string,
    authValue: string,
  ): Promise<APIResponse> {
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

  async refreshUserToken(token: string): Promise<APIResponse> {
    return this.request.get('users/refresh', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
