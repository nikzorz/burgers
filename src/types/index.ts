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

export type CartItem = Pick<
  ProductRecord,
  "id" | "name" | "price" | "image" | "slug"
> & {
  quantity: number;
};

export type CartService = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
};
