import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import {
  ContactResponse,
  LoginResponse,
  RegisteredUserResponse,
} from '../types/api-contract';
import {
  ContactInput,
  ContactUpdateInput,
  RegistrationInput,
  UserCredentials,
} from '../types/domain';
import { BASE_URL } from './constants';

function extractToken(body: RegisteredUserResponse | LoginResponse): string {
  const token = body.token ?? body.user?.token;
  if (!token) {
    throw new Error('Token not found in API response');
  }
  return token;
}

// Public Contact List API is inconsistent: Create uses birthDate, Update uses birthdate.
function toCreateContactPayload(input: Partial<ContactInput>) {
  return {
    firstName: input.firstName,
    lastName: input.lastName,
    birthDate: input.birthDate,
    email: input.email,
    phone: input.phone,
  };
}

function toUpdateContactPayload(input: ContactUpdateInput) {
  return {
    firstName: input.firstName,
    lastName: input.lastName,
    birthdate: input.birthDate,
    email: input.email,
    phone: input.phone,
  };
}

function getBirthDate(output: ContactResponse): string | undefined {
  return output.birthDate ?? output.birthdate;
}

export class ContactListApi {
  constructor(private readonly request: APIRequestContext) {}

  async register(input: Partial<RegistrationInput>): Promise<APIResponse> {
    return this.request.post(`${BASE_URL}/users`, { data: input });
  }

  async login(input: Partial<UserCredentials>): Promise<APIResponse> {
    return this.request.post(`${BASE_URL}/users/login`, { data: input });
  }

  async updateUser(
    token: string,
    input: Partial<RegistrationInput>,
  ): Promise<APIResponse> {
    return this.request.patch(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async deleteUser(token: string): Promise<APIResponse> {
    return this.request.delete(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createContact(
    token: string,
    input: Partial<ContactInput>,
  ): Promise<APIResponse> {
    return this.request.post(`${BASE_URL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: toCreateContactPayload(input),
    });
  }

  async getContact(token: string, id: string): Promise<APIResponse> {
    return this.request.get(`${BASE_URL}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateContact(
    token: string,
    id: string,
    input: ContactUpdateInput,
  ): Promise<APIResponse> {
    return this.request.put(`${BASE_URL}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: toUpdateContactPayload(input),
    });
  }

  async deleteContact(token: string, id: string): Promise<APIResponse> {
    return this.request.delete(`${BASE_URL}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async registerAndGetToken(input: RegistrationInput): Promise<{
    email: string;
    password: string;
    token: string;
  }> {
    const response = await this.register(input);
    expect(response.status()).toBe(201);

    const body = (await response.json()) as RegisteredUserResponse;

    return {
      email: input.email,
      password: input.password,
      token: extractToken(body),
    };
  }

  async expectContactMatches(input: ContactInput, output: ContactResponse) {
    expect(output.firstName).toBe(input.firstName);
    expect(output.lastName).toBe(input.lastName);
    expect(output.email).toBe(input.email);
    expect(output.phone).toBe(input.phone);
  }
}
