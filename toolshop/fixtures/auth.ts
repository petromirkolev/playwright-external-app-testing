import { test as base, expect } from '@playwright/test';
import { LoginInput, RegistrationInput, UpdateInput } from '../types/user';

type AuthFixtures = {
  registrationData: RegistrationInput;
  loginData: LoginInput;
  updateData: UpdateInput;
  registeredUser: any;
  loggedInUser: any;
  updatedUser: any;
};

export const test = base.extend<AuthFixtures>({});

export { expect };
