"use client";

import { updateItemQuantity } from "@/components/cart/actions";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/burger-service/types";
import { Minus, Plus } from "lucide-react";
import { useActionState } from "react";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <Button size="icon" variant="outline">
      {type === "plus" ? (
        <Plus className="h-4 w-4" />
      ) : (
        <Minus className="h-4 w-4" />
      )}
      <span className="sr-only">
        {type === "plus" ? "Increase quantity" : "Decrease quantity"}
      </span>
    </Button>
  );
}

export function EditProductQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    productId: item.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form
      className="inline-block"
      action={async () => {
        optimisticUpdate(payload.productId, type);
        await actionWithVariant();
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
