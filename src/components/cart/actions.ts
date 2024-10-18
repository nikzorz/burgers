"use server";

import {
  addToCart,
  createCart,
  getCart,
  getProductList,
  removeFromCart,
  updateCartItemQuantity,
} from "@/lib/burger-service";
import { ProductRecord } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  _prevState: any,
  product: ProductRecord | undefined,
) {
  if (!product) {
    return "Error adding item to cart: Product missing";
  }

  let cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Error adding item to cart: Cart ID missing";
  }

  try {
    await addToCart(cartId, product);
    revalidateTag("cart");
  } catch (e) {
    return "Error adding item to cart: " + e?.toString();
  }
}

export async function removeItem(
  _prevState: any,
  productId: string | undefined,
) {
  if (!productId) {
    return "Error removing item from cart: Product ID missing";
  }

  let cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Error adding item to cart: Cart ID missing";
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return "Error fetching cart";
    }

    const item = cart.items.find((item) => item.id === productId);

    if (item && item.id) {
      await removeFromCart(cartId, item.id);
      revalidateTag("cart");
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart: " + e?.toString();
  }
}

export async function updateItemQuantity(
  _prevState: any,
  payload: { productId: string; quantity: number },
) {
  const { productId, quantity } = payload;

  let cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Error updating item quantity: Cart ID missing";
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return "Error fetching cart";
    }

    const item = cart.items.find((item) => item.id === productId);

    if (item && item.id) {
      if (quantity === 0) {
        await removeFromCart(cartId, item.id);
      } else {
        await updateCartItemQuantity(cartId, item.id, quantity);
      }
    } else if (quantity > 0) {
      const { products } = await getProductList();
      const product = products.find((product) => product.id === productId);
      if (!product) {
        return "Error updating item quantity: Product not found";
      }
      await addToCart(cartId, product);
    }

    revalidateTag("cart");
  } catch (e) {
    return "Error updating item quantity: " + e?.toString();
  }
}

export async function createCartAndSetCookie() {
  const cart = await createCart();

  (await cookies()).set("cartId", cart.cartId);
}
