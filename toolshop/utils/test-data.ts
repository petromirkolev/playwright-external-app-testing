import { RegistrationInput } from '../types/user';

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

export function uniqueEmail(prefix = 'api'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10)}@toolshop.com`;
}
