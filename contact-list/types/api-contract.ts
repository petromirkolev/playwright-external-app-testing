export type RegisteredUserResponse = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    token?: string;
  };
  token?: string;
};

export type LoginResponse = {
  user?: {
    email?: string;
    token?: string;
  };
  token?: string;
};

export type ContactResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  birthdate?: string;
  email: string;
  phone: string;
};
