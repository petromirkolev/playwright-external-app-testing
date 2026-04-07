import { RegistrationInput, UpdateInput } from '../types/user';

export const validUserInput: Omit<RegistrationInput, 'email' | 'username'> = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  password: 't3$tingP4Ss!',
  phone: '0888888888',
};

export const invalidUserInput = {
  username: 'non-existing',
  firstName: '123',
  lastName: '321',
  emailNoName: '@test.com',
  emailNoAt: 'test.test.com',
  emailNoExt: 'test@test',
  emailNoDomain: 'test@',
};

export const validUserUpdateInput: Partial<UpdateInput> = {
  firstName: 'Georgi',
  lastName: 'Petrov',
  phone: '0123456789',
};

export const invalidPassword = {
  empty: '',
  short: 't',
  long: 't3$tingP4Ss!'.repeat(50),
};

export function uniqueUsername(prefix = 'contact'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100)}`;
}

export function uniqueEmail(prefix = 'contact'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100)}@test.com`;
}
