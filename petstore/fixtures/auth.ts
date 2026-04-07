import { test as base } from '@playwright/test';
import { UserInput } from '../types/user';
import { ApiClient } from '../utils/api-client';

type AuthFixtures = {
  api: ApiClient;
  userInput: UserInput;
  registrationInput: Partial<UserInput>;
  loginCredentials: Partial<UserInput>;
};

export const test = base.extend<AuthFixtures>({});
