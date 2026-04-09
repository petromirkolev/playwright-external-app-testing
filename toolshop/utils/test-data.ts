import { msg } from './constants';

export const validAdminInput = {
  email: 'admin@practicesoftwaretesting.com',
  password: 'welcome01',
};

export const validUserInput = {
  first_name: 'Petromir',
  last_name: 'Kolev',
  email: 'petromir@kolev.com',
  password: 'T3$tingP4$s!',
  phone: '0888888888',
  dob: '1990-03-05',
};

export const invalidUserInput = {
  email: 'testingemail@test.com',
  password: 'testingpassword',
};

export const validUserUpdateInput = {
  first_name: 'Georgi',
  last_name: 'Petrov',
  address: {
    street: 'Smirnenski',
    city: 'Plovdiv',
    state: 'Plovdiv',
    country: 'Bulgaria',
    postal_code: '4000',
  },
  email: 'georgi@petrov.com',
  password: 'T3$tingP4$s!123',
  phone: '0123456789',
  dob: '1990-01-01',
};

export const missingReqUserFields = {
  first_name: {
    value: undefined,
    description: 'Register with missing required first name',
    error: msg.REG_REQ_FIRST_NAME,
  },
  last_name: {
    value: undefined,
    description: 'Register with missing required last name',
    error: msg.REG_REQ_LAST_NAME,
  },
  email: {
    value: undefined,
    description: 'Register with missing required email',
    error: msg.REG_REQ_EMAIL,
  },
  password: {
    value: undefined,
    description: 'Register with missing required password',
    error: msg.REG_REQ_PASS,
  },
};

export const invalidUserPassword = {
  shortPassword: {
    value: 'T3$t',
    description: 'Invalid password too short',
    error: msg.ERR_PASS_SHORT,
  },
  passNoUpper: {
    value: 't3$tingpass',
    description: 'Invalid password no uppercase',
    error: msg.ERR_PASS_UPPER_LOWER,
  },
  passNoLower: {
    value: 't3$tingpass',
    description: 'Invalid password no lowercase',
    error: msg.ERR_PASS_UPPER_LOWER,
  },
  passNoSymbol: {
    value: 'T3stingpass',
    description: 'Invalid password no symbol',
    error: msg.ERR_PASS_SYMBOL,
  },
  passNoNumber: {
    value: 'Te$tingpass',
    description: 'Invalid password no number',
    error: msg.ERR_PASS_NUMBER,
  },
};

export const validProductInput = {
  name: 'Wrench',
  description: 'Cool wrench',
  price: 10,
  brand_id: '01KNRYCNRTE7V72MKPFX96T0MN', // real brand id
  category_id: '01KNRYCP373HPQFFZXRTF0A28D', // real category id
  product_image_id: '01KNRYCP4AHMWNPY0QQ07DZMVC', // real product image id
  is_location_offer: true,
  is_rental: true,
  co2_rating: 'A',
};

// to do
export const invalidCases = [
  {
    name: 'Missing required name returns 422 and error message',
    data: { name: undefined },
    field: 'name',
    message: msg.PROD_REQ_NAME,
  },
  {
    name: 'Missing required price returns 422 and error message',
    data: { price: undefined },
    field: 'price',
    message: msg.PROD_REQ_PRICE,
  },
  {
    name: 'Missing required price returns 422 and error message',
    data: { price: undefined },
    field: 'price',
    message: msg.PROD_REQ_PRICE,
  },
  {
    name: 'Missing required price returns 422 and error message',
    data: { price: undefined },
    field: 'price',
    message: msg.PROD_REQ_PRICE,
  },

  {
    name: 'Missing required price returns 422 and error message',
    data: { price: undefined },
    field: 'price',
    message: msg.PROD_REQ_PRICE,
  },
];

export function uniqueEmail(prefix = 'api'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@toolshop.com`;
}
