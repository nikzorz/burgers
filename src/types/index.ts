export type ProductRecord = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calorie: number;
  slug: string;
};

export type ListProductsResponse = {
  products: ProductRecord[];
};
