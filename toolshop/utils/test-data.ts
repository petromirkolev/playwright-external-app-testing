import { LoginInput, RegistrationInput } from '../types/user';
import { msg } from './constants';

export const adminInput = {
  email: 'admin@practicesoftwaretesting.com',
  password: 'welcome01',
};

export const validInput: RegistrationInput = {
  first_name: 'Petromir',
  last_name: 'Kolev',
  address: {
    street: 'Trakia',
    city: 'Plovdiv',
    state: 'Plovdiv',
    country: 'Bulgaria',
    postal_code: '4000',
  },
  email: 'petromir@kolev.com',
  password: 'T3$tingP4$s!',
  phone: '0888888888',
  dob: '1990-03-05',
};

export const invalidInput: LoginInput = {
  email: 'testingemail@test.com',
  password: 'testingpassword',
};

export const validUpdateInput: Partial<RegistrationInput> = {
  first_name: 'Georgi',
  last_name: 'Petrov',
  address: {
    street: 'Smirnenski',
    city: 'Plovdiv',
    state: 'Plovdiv',
    country: 'Bulgaria',
    postal_code: '4000',
  },
  email: 'georgi@petrov.com',
  password: 'T3$tingP4$s!123',
  phone: '0123456789',
  dob: '1990-01-01',
};

export const missingReqFields = {
  first_name: {
    value: undefined,
    description: 'Register with missing required first name',
    error: msg.REG_REQ_FIRST_NAME,
  },
  last_name: {
    value: undefined,
    description: 'Register with missing required last name',
    error: msg.REG_REQ_LAST_NAME,
  },
  email: {
    value: undefined,
    description: 'Register with missing required email',
    error: msg.REG_REQ_EMAIL,
  },
  password: {
    value: undefined,
    description: 'Register with missing required password',
    error: msg.REG_REQ_PASS,
  },
};

export const invalidPassword = {
  shortPassword: {
    value: 'T3$t',
    description: 'Invalid password too short',
    error: msg.ERR_PASS_SHORT,
  },
  passNoUpper: {
    value: 't3$tingpass',
    description: 'Invalid password no uppercase',
    error: msg.ERR_PASS_UPPER_LOWER,
  },
  passNoLower: {
    value: 't3$tingpass',
    description: 'Invalid password no lowercase',
    error: msg.ERR_PASS_UPPER_LOWER,
  },
  passNoSymbol: {
    value: 'T3stingpass',
    description: 'Invalid password no symbol',
    error: msg.ERR_PASS_SYMBOL,
  },
  passNoNumber: {
    value: 'Te$tingpass',
    description: 'Invalid password no number',
    error: msg.ERR_PASS_NUMBER,
  },
};

export function uniqueEmail(prefix = 'api'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@toolshop.com`;
}
