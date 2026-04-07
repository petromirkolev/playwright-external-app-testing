export type LoginInput = {
  username: string;
  password: string;
};

export type RegistrationInput = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

export type UpdateInput = {
  username: string | number;
  firstName: string | number;
  lastName: string | number;
  email: string | number;
  password: string;
  phone: string | number;
};
