import { APIRequestContext, APIResponse } from '@playwright/test';
import { RegisteredUser, RegistrationData } from '../types/api';

export const registrationData: RegistrationData = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  password: 'T3stingP4$$',
};

export const BASE_URL = 'https://thinking-tester-contact-list.herokuapp.com';

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
};
