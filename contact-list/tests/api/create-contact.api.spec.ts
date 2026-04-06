import { test, expect } from '../../fixtures/api';
import { msg } from '../../utils/constants';
import { validContactInput, invalidContactInput } from '../../utils/test-data';

test.describe('Contact list - Create contact API', () => {
  test('Contact create with valid data succeeds', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.createContact(
      loggedInUser.token,
      validContactInput,
    );
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body._id).toBeTruthy();
    expect(body.firstName).toBe(validContactInput.firstName);
    expect(body.lastName).toBe(validContactInput.lastName);

    const contactResponse = await apiClient.getContact(
      loggedInUser.token,
      body._id,
    );
    expect(contactResponse.status()).toBe(200);

    const contactBody = await contactResponse.json();

    await apiClient.expectContactMatches(validContactInput, contactBody);
  });

  test('Contact create with missing required first name is rejected', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.createContact(loggedInUser.token, {
      ...validContactInput,
      firstName: undefined,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(msg.CONTACT_REQ_FIRST_NAME);
  });

  test('Contact create with missing required last name is rejected', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.createContact(loggedInUser.token, {
      ...validContactInput,
      lastName: undefined,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(msg.CONTACT_REQ_LAST_NAME);
  });

  test.fixme('Contact create with invalid birth date is rejected; Public API validation for invalid birth date is currently inconsistent/unreliable on the live app.', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.createContact(loggedInUser.token, {
      ...validContactInput,
      birthDate: invalidContactInput.birthDate,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(msg.CONTACT_ADD_INV_BDATE);
  });

  test('Contact create with invalid phone is rejected', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.createContact(loggedInUser.token, {
      ...validContactInput,
      phone: invalidContactInput.phone,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(msg.CONTACT_ADD_INV_PHONE);
  });

  test('Contact create with invalid email is rejected', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.createContact(loggedInUser.token, {
      ...validContactInput,
      email: invalidContactInput.email,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(msg.CONTACT_ADD_INV_EMAIL);
  });

  test('Contact create with empty payload is rejected', async ({
    loggedInUser,
    apiClient,
  }) => {
    const response = await apiClient.createContact(loggedInUser.token, {});
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.message).toBe(msg.CONTACT_ADD_EMPTY);
  });
});
