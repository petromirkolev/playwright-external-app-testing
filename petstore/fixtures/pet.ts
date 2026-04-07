import { PetInput } from '../types/pet';
import { validPetInput } from '../utils/test-data';
import { test as base, expect } from './auth';

type PetFixtures = {
  petInput: PetInput;
};

export const test = base.extend<PetFixtures>({
  petInput: async ({}, use) => {
    await use(validPetInput);
  },
});

export { expect };
