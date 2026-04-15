import { msg } from './constants';

export const validProductInput = {
  name: 'Wrench',
  description: 'Cool wrench',
  price: 10,
  is_location_offer: true,
  is_rental: true,
  co2_rating: 'A',
};

export const validUpdateInput = {
  name: 'Wrenchy',
  description: 'Cool wrench',
  price: 15,
  is_location_offer: true,
  is_rental: true,
  co2_rating: 'B',
};

export const validPartialUpdate = [
  {
    name: 'Name update returns 200',
    data: { name: 'Wrencher' },
  },
  {
    name: 'Price update returns 200',
    data: { price: 19.99 },
  },
  {
    name: 'is_location_offer update returns 200',
    data: { is_location_offer: false },
  },
  {
    name: 'is_rental update returns 200',
    data: { is_rental: false },
  },
];

export const invalidProductInput = [
  {
    name: 'Invalid name returns 422 and error message',
    data: { name: 1 },
    field: 'name',
    message: msg.PROD_REQ_NAME,
  },

  {
    name: 'Invalid price returns 422 and error message',
    data: { price: 'test' },
    field: 'price',
    message: msg.PROD_REQ_NAME,
  },

  {
    name: 'Invalid brand_id returns 422 and error message',
    data: { brand_id: 'test' },
    field: 'brand_id',
    message: msg.PROD_REQ_NAME,
  },

  {
    name: 'Invalid category_id returns 422 and error message',
    data: { category_id: 'test' },
    field: 'category_id',
    message: msg.PROD_REQ_NAME,
  },

  {
    name: 'Invalid product_image_id returns 422 and error message',
    data: { product_image_id: 'test' },
    field: 'product_image_id',
    message: msg.PROD_REQ_NAME,
  },

  {
    name: 'Invalid is_location_offer returns 422 and error message',
    data: { is_location_offer: 'test' },
    field: 'is_location_offer',
    message: msg.PROD_REQ_NAME,
  },

  {
    name: 'Invalid is_rental returns 422 and error message',
    data: { is_rental: 'test' },
    field: 'is_rental',
    message: msg.PROD_REQ_NAME,
  },
];

export const invalidPartialUpdate = [
  {
    name: 'Name update returns 422',
    data: { name: 123 },
  },
  {
    name: 'Price update returns 422',
    data: { price: 'Hello' },
  },
  {
    name: 'is_location_offer update returns 422',
    data: { is_location_offer: 'Hello' },
  },
  {
    name: 'is_rental update returns 422',
    data: { is_rental: 'Hello' },
  },
];

export const missingProductInput = [
  {
    name: 'Required name returns 422 and error message',
    data: { name: undefined },
    field: 'name',
    message: msg.PROD_REQ_NAME,
  },
  {
    name: 'Required price returns 422 and error message',
    data: { price: undefined },
    field: 'price',
    message: msg.PROD_REQ_PRICE,
  },
  {
    name: 'Required category_id returns 422 and error message',
    data: { category_id: undefined },
    field: 'category_id',
    message: msg.PROD_REQ_CAT,
  },
  {
    name: 'Required brand_id returns 422 and error messagee',
    data: { brand_id: undefined },
    field: 'brand_id',
    message: msg.PROD_REQ_BRAND,
  },

  {
    name: 'Required is_location_offer returns 422 and error message',
    data: { is_location_offer: undefined },
    field: 'is_location_offer',
    message: msg.PROD_REQ_LOC,
  },

  {
    name: 'Required is_rental returns 422 and error message',
    data: { is_rental: undefined },
    field: 'is_rental',
    message: msg.PROD_REQ_RENT,
  },

  {
    name: 'Required product_image_id returns 422 and error message',
    data: { product_image_id: undefined },
    field: 'product_image_id',
    message: msg.PROD_REQ_IMG,
  },
];

export const sortCases = [
  {
    name: 'Sort by name returns 200 and ASC name order',
    field: 'name',
    direction: 'asc',
  },
  {
    name: 'Sort by name returns 200 and DESC name order',
    field: 'name',
    direction: 'desc',
  },
  {
    name: 'Sort by price returns 200 and ASC price order',
    field: 'price',
    direction: 'asc',
  },
  {
    name: 'Sort by price returns 200 and DESC price order',
    field: 'price',
    direction: 'desc',
  },
];

export function uniqueProductName(prefix = 'product'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
