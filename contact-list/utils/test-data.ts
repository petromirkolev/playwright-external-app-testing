export const validInput = {
  firstName: 'Petromir',
  lastName: 'Kolev',
  email: uniqueEmail(),
  password: 'T3stingP4$$',
};

export const invalidInput = {
  invalidEmail: {
    invalidEmptyEmail: {
      description: 'Invalid empty email',
      data: '',
    },
    invalidEmailWithoutDomain: {
      description: 'Invalid email without domain',
      data: 'a@b',
    },
    invalidEmailWithoutName: {
      description: 'Invalid email without name',
      data: '@abc.com',
    },
    invalidEmailWithoutExt: {
      description: 'Invalid email without extension',
      data: 'a@b.c',
    },
  },

  invalidPassword: {
    invalidEmptyPassword: '',
    invalidPasswordTooShort: 'abc',
    invalidPasswordTooLong: 'abcde'.repeat(10),
  },
};

export function uniqueEmail(prefix = 'contact'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}
