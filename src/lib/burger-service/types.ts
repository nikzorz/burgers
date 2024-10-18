import { ProductRecord } from "@/types";

export type CartItem = Pick<
  ProductRecord,
  "id" | "name" | "price" | "image" | "slug"
> & {
  quantity: number;
};

export type Cart = {
  cartId: string;
  items: CartItem[];
};
