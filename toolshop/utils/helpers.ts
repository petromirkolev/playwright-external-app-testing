import { expect } from '@playwright/test';
import { RegistrationInput } from '../types/user';

export function expectSuccess(
  body: any,
  registrationData: Partial<RegistrationInput>,
) {
  expect(body.first_name).toBe(registrationData.first_name);
  expect(body.last_name).toBe(registrationData.last_name);
  expect(body.email).toBe(registrationData.email);
  expect(body.id).toBeDefined();
}

export function expectError(body: any, field: string, message: string) {
  expect(body).toHaveProperty(field);
  const messages = Array.isArray(body[field]) ? body[field] : [body[field]];
  expect(messages).toContain(message);
}
