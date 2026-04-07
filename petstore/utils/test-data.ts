import { UserInput } from '../types/user';

export const validUserInput: Partial<UserInput> = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  email: 'asd',
  password: 't3$tingP4Ss!',
  phone: '0888888888',
};

export const invalidUserInput = {
  firstName: '123',
  lastName: '321',
  emailNoName: '@test.com',
  emailNoAt: 'test.test.com',
  emailNoExt: 'test@test',
  emailNoDomain: 'test@',
  phone: 'abcd',
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
