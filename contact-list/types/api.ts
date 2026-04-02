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

export type LoggedInUser = {
  email: string;
  password: string;
  token: string;
};

export type UpdateData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export type ContactData = {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
};
