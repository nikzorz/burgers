import { CartService, ListProductsResponse } from "@/types";
import { cache } from "react";

export const mockCartService: CartService = {
  cartItems: [
    {
      id: "1",
      name: "Burger A",
      price: 499,
      image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6",
      slug: "burger-a",
      quantity: 2,
    },
    {
      id: "4",
      name: "Bacon & Egg",
      price: 799,
      image: "https://images.unsplash.com/photo-1601894087104-0c18bc34dbd6",
      slug: "bacon-egg",
      quantity: 1,
    },
  ],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalPrice: () => 499 * 2 + 799,
  totalItems: () => 3,
};

export const getProductList = cache(async function getProductList() {
  const response = await fetch(
    "https://burgerhub00.github.io/data/products.json",
  );
  const data = await response.json();

  return data as ListProductsResponse;
});

export const getProductBySlug = cache(async function getProductBySlug(
  slug: string,
) {
  const { products } = await getProductList();

  return products.find((product) => product.slug === slug);
});
