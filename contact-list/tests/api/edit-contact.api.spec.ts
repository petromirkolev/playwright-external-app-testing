import { test, expect } from '../../fixtures/api';
import { api } from '../../utils/api-helpers';
import {
  EDIT_EMPTY_PAYLOAD,
  INVALID_EDIT_BIRTH_DATE,
  INVALID_EDIT_EMAIL,
  INVALID_EDIT_PHONE,
} from '../../utils/constants';
import {
  invalidContactInput,
  validContactUpdateInput,
} from '../../utils/test-data';

test.describe('Update', () => {
  test('Update contact with valid data succeeds', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.updateContact(
      request,
      userWithOneContact.token,
      userWithOneContact.contact_id,
      { ...validContactUpdateInput },
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    await api.verifyContact({ ...validContactUpdateInput }, { ...body });
  });

  test('Update contact with non-existing id is rejected', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.updateContact(
      request,
      userWithOneContact.token,
      '123',
      { ...validContactUpdateInput },
    );

    expect(response.status()).toBe(400);
  });

  test('Update contact with invalid birth date is rejected', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.updateContact(
      request,
      userWithOneContact.token,
      userWithOneContact.contact_id,
      { ...validContactUpdateInput, birthDate: invalidContactInput.birthDate },
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(INVALID_EDIT_BIRTH_DATE);
  });

  test('Update contact with invalid email is rejected', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.updateContact(
      request,
      userWithOneContact.token,
      userWithOneContact.contact_id,
      { ...validContactUpdateInput, email: invalidContactInput.email },
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(INVALID_EDIT_EMAIL);
  });

  test('Update contact with invalid phone is rejected', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.updateContact(
      request,
      userWithOneContact.token,
      userWithOneContact.contact_id,
      { ...validContactUpdateInput, phone: invalidContactInput.phone },
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(INVALID_EDIT_PHONE);
  });

  test('Update contact with empty payload is rejected', async ({
    request,
    userWithOneContact,
  }) => {
    const response = await api.updateContact(
      request,
      userWithOneContact.token,
      userWithOneContact.contact_id,
      {},
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe(EDIT_EMPTY_PAYLOAD);
  });
});
