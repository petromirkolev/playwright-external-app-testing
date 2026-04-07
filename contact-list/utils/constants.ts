export const msg = {
  AUTH_INV_USER_PASS: 'Incorrect username or password',
  AUTH_INV_EMAIL: 'User validation failed: email: Email is INV',
  AUTH_INV_PASS_SHORT: 'is shorter than the minimum allowed length (7).',
  AUTH_INV_PASS_LONG: 'is longer than the maximum allowed length (100).',
  AUTH_DUP_EMAIL: 'Email address is already in use',

  CONTACT_ADD_INV_BDATE:
    'Contact validation failed: birthDate: Birth date is invalid',
  CONTACT_ADD_INV_EMAIL: 'Contact validation failed: email: Email is invalid',
  CONTACT_ADD_INV_PHONE:
    'Contact validation failed: phone: Phone number is invalid',

  CONTACT_EDIT_INV_BDATE: 'Validation failed: birthdate: Birthdate is invalid',
  CONTACT_EDIT_INV_EMAIL: 'Validation failed: email: Email is invalid',
  CONTACT_EDIT_INV_PHONE: 'Validation failed: phone: Phone number is invalid',

  GENERIC_INV_BDATE: 'Birthdate is invalid',
  GENERIC_INV_EMAIL: 'Email is invalid',
  GENERIC_INV_PHONE: 'Phone number is invalid',

  USER_REQ_FIRST_NAME:
    'User validation failed: firstName: Path `firstName` is required.',
  USER_REQ_LAST_NAME:
    'User validation failed: lastName: Path `lastName` is required.',
  USER_REQ_EMAIL: 'User validation failed: email: Email is invalid',
  USER_REQ_PASS:
    'User validation failed: password: Path `password` is required.',

  CONTACT_REQ_FIRST_NAME:
    'Contact validation failed: firstName: Path `firstName` is required.',
  CONTACT_REQ_LAST_NAME:
    'Contact validation failed: lastName: Path `lastName` is required.',

  CONTACT_ADD_EMPTY:
    'Contact validation failed: lastName: Path `lastName` is required., firstName: Path `firstName` is required.',
  CONTACT_EDIT_EMPTY:
    'Validation failed: lastName: Path `lastName` is required., firstName: Path `firstName` is required.',

  PREFIX_CONT_FIRST_NAME: 'Contact validation failed: firstName:',
  PREFIX_CONT_LAST_NAME: 'Contact validation failed: lastName:',
  PREFIX_CONT_BDATE: 'Contact validation failed: birthdate:',
  PREFIX_CONT_EMAIL: 'Contact validation failed: email:',
  PREFIX_CONT_PHONE: 'Contact validation failed: phone:',
};
