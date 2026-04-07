import { UpdateInput } from '../types/user';

export const validUserInput: Partial<UpdateInput> = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  password: 't3$tingP4Ss!',
  phone: '0888888888',
};

export const validUserUpdateInput: Partial<UpdateInput> = {
  firstName: 'Georgi',
  lastName: 'Petrov',
  phone: '0123456789',
};

export const invalidUserInput = {
  username: 'non-existing',
  usernameNotString: 123,
  firstName: '123',
  firstNameNotString: 123,
  lastName: '321',
  lastNameNotString: 123,
  emailNotString: 123,
  emailNoName: '@test.com',
  emailNoAt: 'test.test.com',
  emailNoExt: 'test@test',
  emailNoDomain: 'test@',
  phoneNotString: 123,
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
