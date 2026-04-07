export type LoginInput = {
  email: string;
  password: string;
};

export type RegistrationInput = LoginInput & {
  first_name: string;
  last_name: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
  phone: string;
  dob: string;
};

export type UpdateInput = Partial<RegistrationInput>;
