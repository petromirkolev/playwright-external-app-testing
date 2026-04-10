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
