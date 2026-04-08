import { APIResponse, expect } from '@playwright/test';
import { RegistrationInput } from '../types/user';

export async function expectSuccess(
  response: APIResponse,
  registrationData: Partial<RegistrationInput>,
) {
  const body = await response.json();

  expect(body.first_name).toBe(registrationData.first_name);
  expect(body.last_name).toBe(registrationData.last_name);
  expect(body.email).toBe(registrationData.email);
  expect(body.id).toBeDefined();
}

export async function expectError(
  response: APIResponse,
  field: string,
  message: string,
) {
  const body = await response.json();
  expect(body).toHaveProperty(field);

  const messages = Array.isArray(body[field]) ? body[field] : [body[field]];
  expect(messages).toContain(message);
}

export async function expectSuccessAndToken(response: APIResponse) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.access_token).toBeDefined();
}
