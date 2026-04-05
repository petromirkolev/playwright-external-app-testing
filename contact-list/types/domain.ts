export type UserCredentials = {
  email: string;
  password: string;
};

export type RegistrationInput = UserCredentials & {
  firstName: string;
  lastName: string;
};

export type UserUpdateInput = Partial<RegistrationInput>;

export type ContactInput = {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
};

export type ContactUpdateInput = Partial<ContactInput>;
