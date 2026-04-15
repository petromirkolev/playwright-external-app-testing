export type Cart = {
  id: string;
  additional_discount_percentage: null | number;
  lat: null | number;
  lng: null | number;
  cart_items: [];
};

export type ValidCartInput = {
  product_id: string;
  quantity: number;
};

export type InvalidCartInput = Partial<ValidCartInput>;
