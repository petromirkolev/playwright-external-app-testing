import { APIRequestContext } from '@playwright/test';
import { RegistrationData } from '../types/api';

export const registrationData: RegistrationData = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  password: 'T3stingP4$$',
};

export const BASE_URL = 'https://thinking-tester-contact-list.herokuapp.com';

export const api = {
  async register(request: APIRequestContext, data: Partial<RegistrationData>) {
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
};
