import { Cart, CartItem } from "@/lib/burger-service/types";
import { ListProductsResponse } from "@/types";
import { kv } from "@vercel/kv";
import { randomUUID } from "crypto";
import { cache } from "react";

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

export async function createCart(): Promise<Cart> {
  const cartId = randomUUID();

  const cart: Cart = {
    cartId,
    items: [],
  };

  await kv.set(`cart-${cartId}`, cart);

  return cart;
}

export async function getCart(cartId?: string): Promise<Cart | undefined> {
  if (!cartId) {
    return undefined;
  }

  const cart: Cart | null = await kv.get(`cart-${cartId}`);

  if (!cart) {
    return undefined;
  }

  return cart;
}

// Add an item to the cart
export async function addToCart(
  cartId: string,
  product: Omit<CartItem, "quantity" | "totalAmount">,
): Promise<Cart> {
  const cart = await getCart(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const existingItem = cart.items.find((item) => item.id === product.id);

  if (existingItem) {
    // Update the quantity if the item already exists
    const newCart: Cart = {
      ...cart,
      items: cart.items.map((cartItem) =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      ),
    };
    await kv.set(`cart-${cart.cartId}`, newCart);

    return newCart;
  } else {
    // Add new item with a default quantity of 1
    const newCart: Cart = {
      ...cart,
      items: [...cart.items, { ...product, quantity: 1 }],
    };

    await kv.set(`cart-${cart.cartId}`, newCart);

    return newCart;
  }
}

// Remove item by ID
export async function removeFromCart(
  cartId: string,
  productId: string,
): Promise<Cart> {
  const cart = await getCart(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const newCart: Cart = {
    ...cart,
    items: cart.items.filter((item) => item.id !== productId),
  };

  await kv.set(`cart-${cart.cartId}`, newCart);

  return newCart;
}

// Update quantity of a specific item
export async function updateCartItemQuantity(
  cartId: string,
  productId: string,
  quantity: number,
): Promise<Cart> {
  const cart = await getCart(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const newCart: Cart = {
    ...cart,
    items: cart.items.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity,
          }
        : item,
    ),
  };

  await kv.set(`cart-${cart.cartId}`, newCart);

  return newCart;
}
