export type LoginInput = {
  username: string;
  password: string;
};

export type RegistrationInput = LoginInput & {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type UpdateInput = Partial<RegistrationInput>;
