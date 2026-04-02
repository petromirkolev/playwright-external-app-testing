export const validInput = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  password: 'T3stingP4$$',
};

export const invalidInput = {
  email: 'petromir@test',
  passwordTooShort: '123',
  passwordTooLong: '12345'.repeat(21),
};

export const validContactInputs = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  birthDate: '1990-03-05',
  email: 'petromir@test.com',
  phone: '0888888888',
};

export const invalidContactInputs = {
  birthDate: '1990',
  email: 'petromir@test',
  phone: '123',
};

export const invalidEmail = {
  invalidEmptyEmail: {
    description: 'Sign up with invalid empty email',
    data: '',
    message: 'User validation failed: email: Email is invalid',
  },
  invalidEmailWithoutDomain: {
    description: 'Sign up with invalid email without domain',
    data: 'a@b',
    message: 'User validation failed: email: Email is invalid',
  },
  invalidEmailWithoutName: {
    description: 'Sign up with invalid email without name',
    data: '@abc.com',
    message: 'User validation failed: email: Email is invalid',
  },
  invalidEmailWithoutExt: {
    description: 'Sign up with invalid email without extension',
    data: 'a@b.c',
    message: 'User validation failed: email: Email is invalid',
  },
};

export const invalidPassword = {
  invalidEmptyPassword: {
    description: 'Sign up with invalid empty password',
    data: '',
    message: 'User validation failed: password: Path `password` is required.',
  },
  invalidPasswordTooShort: {
    description: 'Sign up with invalid password too short',
    data: 'abcde',
    message:
      'User validation failed: password: Path `password` (`abcde`) is shorter than the minimum allowed length (7).',
  },
  invalidPasswordTooLong: {
    description: 'Sign up with invalid password too long',
    data: 'abcde'.repeat(21),
    message: `User validation failed: password: Path \`password\` (\`${'abcde'.repeat(21)}\`) is longer than the maximum allowed length (100).`,
  },
};

export function uniqueEmail(prefix = 'contact'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}
