import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { BASE_URL } from './constants';
import { ContactData, RegisteredUser, UpdateData } from '../types/api';
import { ContactInput } from '../types/contact';
import { RegistrationData } from '../types/auth';

export const registrationData: RegistrationData = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  password: 'T3stingP4$$',
};

export const api = {
  async register(
    request: APIRequestContext,
    data: Partial<RegistrationData>,
  ): Promise<APIResponse> {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });

    return response;
  },

  async login(
    request: APIRequestContext,
    data: Partial<RegisteredUser>,
  ): Promise<APIResponse> {
    const response = await request.post(`${BASE_URL}/users/login`, {
      data: {
        email: data.email,
        password: data.password,
      },
    });

    return response;
  },

  async update(
    request: APIRequestContext,
    token: string,
    data: Partial<UpdateData>,
  ): Promise<APIResponse> {
    const response = await request.patch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });

    return response;
  },

  async delete(
    request: APIRequestContext,
    token: string,
  ): Promise<APIResponse> {
    const response = await request.delete(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },

  async addContact(
    request: APIRequestContext,
    token: string,
    data: Partial<ContactData>,
  ): Promise<APIResponse> {
    const response = await request.post(`${BASE_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        email: data.email,
        phone: data.phone,
      },
    });

    return response;
  },

  async getContact(
    request: APIRequestContext,
    token: string,
    id: string,
  ): Promise<APIResponse> {
    const response = await request.get(`${BASE_URL}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  },

  async updateContact(
    request: APIRequestContext,
    token: string,
    id: string,
    data: Partial<ContactData>,
  ): Promise<APIResponse> {
    const response = await request.put(`${BASE_URL}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthdate: data.birthDate,
        email: data.email,
        phone: data.phone,
      },
    });

    return response;
  },

  async deleteContact(
    request: APIRequestContext,
    token: string,
    id: string,
  ): Promise<APIResponse> {
    const response = await request.delete(`${BASE_URL}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  },

  async verifyContact(input: ContactInput, output: ContactData): Promise<void> {
    expect(output.firstName).toBe(input.firstName);
    expect(output.lastName).toBe(input.lastName);
    if (input.birthDate && output.birthDate)
      expect(output.birthDate).toBe(input.birthDate);
    expect(output.email).toBe(input.email);
    expect(output.phone).toBe(input.phone);
  },
};
