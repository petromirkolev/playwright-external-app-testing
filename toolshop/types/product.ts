export type ProductBaseInput = {
  name: string;
  stock?: string;
  description: string;
  price: number;
  category_id: string;
  brand_id: string;
  product_image_id: string;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating: string;
};

export type ProductInput = ProductBaseInput;
export type ProductUpdateInput = ProductBaseInput;
export type PartialProductUpdateInput = Partial<ProductUpdateInput>;

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: number;
  is_rental: number;
  in_stock: number;
  co2_rating: string;
  is_eco_friendly: boolean;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  category: {
    id: string;
    parent_id: string;
    name: string;
    slug: string;
    sub_categories: [string];
  };
  product_image: {
    by_name: string;
    by_url: string;
    source_name: string;
    source_url: string;
    file_name: string;
    title: string;
    id: string;
  };
};

export type ProductFilters = {
  by_brand?: string;
  by_category?: string;
  is_rental?: boolean;
  between?: string;
  sort?: string;
  page?: number;
};
