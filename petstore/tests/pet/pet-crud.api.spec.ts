import { test, expect } from '../../fixtures/pet';

test.describe('Petstore - Pet CRUD', () => {
  test('Create pet with valid data succeeds', async ({ petInput, api }) => {
    const response = await api.createPet(petInput);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(petInput.name);
  });

  test.fixme('Get created pet by ID succeeds', async ({ petInput, api }) => {
    const response = await api.createPet(petInput);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const petId = Number(body.id);

    console.log(petId);

    const petResponse = await api.getPet(petId);
    expect(petResponse.status()).toBe(200);
  });

  test('Update created pet with valid data succeeds', async () => {});

  test('Delete created pet succeeds', async () => {});
});
