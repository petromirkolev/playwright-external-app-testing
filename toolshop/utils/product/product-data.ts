import { msg } from '../constants';

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
  description: 'Cool wrenchy',
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
    name: 'name returns 422 and error message',
    data: { name: undefined },
    field: 'name',
    message: msg.PROD_REQ_NAME,
  },
  {
    name: 'price returns 422 and error message',
    data: { price: undefined },
    field: 'price',
    message: msg.PROD_REQ_PRICE,
  },
  {
    name: 'category_id returns 422 and error message',
    data: { category_id: undefined },
    field: 'category_id',
    message: msg.PROD_REQ_CAT,
  },
  {
    name: 'brand_id returns 422 and error message',
    data: { brand_id: undefined },
    field: 'brand_id',
    message: msg.PROD_REQ_BRAND,
  },
  {
    name: 'is_location_offer returns 422 and error message',
    data: { is_location_offer: undefined },
    field: 'is_location_offer',
    message: msg.PROD_REQ_LOC,
  },
  {
    name: 'is_rental returns 422 and error message',
    data: { is_rental: undefined },
    field: 'is_rental',
    message: msg.PROD_REQ_RENT,
  },
  {
    name: 'product_image_id returns 422 and error message',
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
