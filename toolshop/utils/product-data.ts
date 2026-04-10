import { msg } from './constants';

export const validProductInput = {
  name: 'Wrench',
  description: 'Cool wrench',
  price: 10,
  brand_id: '01KNRYCNRTE7V72MKPFX96T0MN', // valid fallback values
  category_id: '01KNRYCP373HPQFFZXRTF0A28D', // valid fallback values
  product_image_id: '01KNRYCP4AHMWNPY0QQ07DZMVC', // valid fallback values
  is_location_offer: true,
  is_rental: true,
  co2_rating: 'A',
};

export const missingProductInput = [
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
