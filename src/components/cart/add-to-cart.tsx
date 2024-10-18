"use client";

import { addItem } from "@/components/cart/actions";
import { useCart } from "@/components/cart/cart-context";
import { Button, ButtonProps } from "@/components/ui/button";
import { ProductRecord } from "@/types";
import { useActionState } from "react";

export function AddToCart({
  product,
  children,
  className,
  ...props
}: { product: ProductRecord } & ButtonProps) {
  const { addCartItem } = useCart();

  const [message, formAction] = useActionState(addItem, null);
  const actionWithProduct = formAction.bind(null, product);

  return (
    <form
      className={className}
      action={async () => {
        addCartItem(product);
        await actionWithProduct();
      }}
    >
      <Button {...props} type="submit" aria-label="Add to cart">
        {children}
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
