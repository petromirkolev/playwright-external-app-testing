import { test, expect } from '../../fixtures/api';

test.describe('Contact', () => {
  test.describe('Create', () => {
    test('Contact create with valid data succeeds', async ({
      loggedInUser,
    }) => {});

    test('Contact created is present in contact list', async ({
      loggedInUser,
    }) => {});

    test('Contact create with missing required first name is rejected', async ({
      loggedInUser,
    }) => {});

    test('Contact create with missing required last name is rejected', async ({
      loggedInUser,
    }) => {});

    test('Contact create with invalid birth date is rejected', async ({
      loggedInUser,
    }) => {});

    test('Contact create with invalid phone is rejected', async ({
      loggedInUser,
    }) => {});

    test('Contact create with invalid email is rejected', async ({
      loggedInUser,
    }) => {});

    test('Contact create with empty payload is rejected', async ({
      loggedInUser,
    }) => {});
  });

  test.describe('Update', () => {
    test('Update contact with valid data succeeds', async () => {});

    test('Update contact with non-exisitng id is rejected', async () => {});

    test('Update contact with invalid birth date is rejected', async () => {});

    test('Update contact with invalid email is rejected', async () => {});

    test('Update contact with invalid phone is rejected', async () => {});

    test('Update contact with empty payload is rejected', async () => {});
  });

  test.describe('Delete', () => {
    test('Delete existing contact succeeds', async () => {});

    test('Delete contact with non-exisitng id is rejected', async () => {});
  });
});
