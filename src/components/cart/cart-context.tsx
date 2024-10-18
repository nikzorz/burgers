"use client";

import { Cart, CartItem } from "@/lib/burger-service/types";
import { ProductRecord } from "@/types";
import { randomUUID } from "crypto";
import { createContext, use, useContext, useMemo, useOptimistic } from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { productId: string; updateType: UpdateType };
    }
  | { type: "ADD_ITEM"; payload: { product: ProductRecord } };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (productId: string, updateType: UpdateType) => void;
  addCartItem: (product: ProductRecord) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function updateCartItem(
  item: CartItem,
  updateType: UpdateType,
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  return {
    ...item,
    quantity: newQuantity,
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  product: ProductRecord,
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    slug: product.slug,
    quantity,
  };
}

function createEmptyCart(): Cart {
  return {
    cartId: randomUUID(),
    items: [],
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case "UPDATE_ITEM": {
      const updatedItems = currentCart.items
        .map((item) => {
          if (item.id === action.payload.productId) {
            return updateCartItem(item, action.payload.updateType);
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      if (updatedItems.length === 0) {
        return {
          ...currentCart,
          items: [],
        };
      }

      return {
        ...currentCart,
        items: updatedItems,
      };
    }
    case "ADD_ITEM": {
      const existingItem = currentCart.items.find(
        (item) => item.id === action.payload.product.id,
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        action.payload.product,
      );

      const updatedItems = existingItem
        ? currentCart.items.map((item) => {
            if (item.id === action.payload.product.id) {
              return updatedItem;
            }
            return item;
          })
        : [...currentCart.items, updatedItem];

      return {
        ...currentCart,
        items: updatedItems,
      };
    }
    default:
      return currentCart;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const initialCart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer,
  );

  const updateCartItem = (productId: string, updateType: UpdateType) => {
    updateOptimisticCart({
      type: "UPDATE_ITEM",
      payload: { productId, updateType },
    });
  };

  const addCartItem = (product: ProductRecord) => {
    updateOptimisticCart({ type: "ADD_ITEM", payload: { product } });
  };

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
    }),
    [optimisticCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
