import {
  INVALID_EMAIL,
  INVALID_PASSWORD_TOO_LONG,
  INVALID_PASSWORD_TOO_SHORT,
  REQUIRED_PASSWORD,
} from './constants';

export const validUserInput = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  password: 'T3stingP4$$',
};

export const invalidUserInput = {
  email: 'invalidtestingemail@test.com',
  emailEmpty: '',
  emailNoExt: 'a@b',
  emailNoName: '@abc.com',
  emailInvalidExt: 'a@b.c',
  password: 'invalidtestingpassword',
  passwordEmpty: '',
  passwordTooShort: '123',
  passwordTooLong: '12345'.repeat(21),
};

export const validContactInput = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  birthDate: '1990-03-05',
  email: 'petromir@test.com',
  phone: '0888888888',
};

export const validContactUpdateInput = {
  firstName: 'Georgi',
  lastName: 'Petrov',
  birthDate: '1990-04-04',
  email: 'georgi@test.com',
  phone: '0888888889',
};

export const invalidContactInput = {
  firstName: '',
  lastName: '',
  birthDate: '1990',
  email: 'petromir@test',
  phone: '123',
};

export const invalidEmail = {
  invalidEmptyEmail: {
    description: 'Sign up with invalid empty email',
    data: invalidUserInput.emailEmpty,
    message: INVALID_EMAIL,
  },
  invalidEmailWithoutDomainExt: {
    description: 'Sign up with invalid email without domain extension',
    data: invalidUserInput.emailNoExt,
    message: INVALID_EMAIL,
  },
  invalidEmailWithoutName: {
    description: 'Sign up with invalid email without name',
    data: invalidUserInput.emailNoName,
    message: INVALID_EMAIL,
  },
  invalidEmailDomainExt: {
    description: 'Sign up with invalid email with invalid domain extension',
    data: invalidUserInput.emailInvalidExt,
    message: INVALID_EMAIL,
  },
};

export const invalidPassword = {
  invalidEmptyPassword: {
    description: 'Sign up with invalid empty password',
    data: invalidUserInput.passwordEmpty,
    message: REQUIRED_PASSWORD,
  },
  invalidPasswordTooShort: {
    description: 'Sign up with invalid password too short',
    data: invalidUserInput.passwordTooShort,
    message: INVALID_PASSWORD_TOO_SHORT,
  },
  invalidPasswordTooLong: {
    description: 'Sign up with invalid password too long',
    data: invalidUserInput.passwordTooLong,
    message: INVALID_PASSWORD_TOO_LONG,
  },
};

export function uniqueEmail(prefix = 'contact'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}
