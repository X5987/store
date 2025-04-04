export interface Rate {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rate;
}

export type ProductNecessaryProperties = Pick<
  Product,
  'id' | 'title' | 'price' | 'description'
>;
