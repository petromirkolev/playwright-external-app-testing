export type RegistrationData = {
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
};

export type RegisteredUser = {
  email: string;
  password: string;
  token: string;
};
