export const validInput = {
  username: 'petromirkolev',
  email: uniqueEmail(),
  password: 'T3stingP4$$',
};

export const invalidInput = {
  invalidEmail: {
    invalidEmptyEmail: '',
    invalidEmailWithoutDomain: 'a@a',
    invalidEmailWithoutName: '@test.com',
    invalidEmailWithoutExt: 'a@a.a',
  },
  invalidPassword: {
    invalidEmptyPassword: '',
    invalidPasswordTooShort: 'abc',
    invalidPasswordTooLong: 'abcde'.repeat(10),
  },
};

export function uniqueEmail(prefix = 'motocare'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
}
