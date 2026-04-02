import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';
import {
  EMPTY_PAYLOAD,
  INVALID_CONTACT_EMAIL,
  INVALID_CONTACT_PHONE,
  REQUIRED_CONTACT_FIRST_NAME,
  REQUIRED_CONTACT_LAST_NAME,
} from '../../utils/constants';
import { validContactInput, invalidContactInput } from '../../utils/test-data';

test.describe('Create', () => {
  test('Contact create with valid data succeeds', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.addContact(request, loggedInUser.token, {
      ...validContactInput,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    const contact_id = body._id;

    const contactResponse = await api.getContact(
      request,
      loggedInUser.token,
      contact_id,
    );

    const contactBody = await contactResponse.json();

    await api.verifyContact({ ...validContactInput }, { ...contactBody });
  });

  test('Contact create with missing required first name is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.addContact(request, loggedInUser.token, {
      ...validContactInput,
      firstName: undefined,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(REQUIRED_CONTACT_FIRST_NAME);
  });

  test('Contact create with missing required last name is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.addContact(request, loggedInUser.token, {
      ...validContactInput,
      lastName: undefined,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(REQUIRED_CONTACT_LAST_NAME);
  });

  test.skip('Contact create with invalid birth date is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.addContact(request, loggedInUser.token, {
      ...validContactInput,
      birthDate: invalidContactInput.birthDate,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(REQUIRED_CONTACT_LAST_NAME);
  });

  test('Contact create with invalid phone is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.addContact(request, loggedInUser.token, {
      ...validContactInput,
      phone: invalidContactInput.phone,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(INVALID_CONTACT_PHONE);
  });

  test('Contact create with invalid email is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.addContact(request, loggedInUser.token, {
      ...validContactInput,
      email: invalidContactInput.email,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(INVALID_CONTACT_EMAIL);
  });

  test('Contact create with empty payload is rejected', async ({
    request,
    loggedInUser,
  }) => {
    const response = await api.addContact(request, loggedInUser.token, {});

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(EMPTY_PAYLOAD);
  });
});
