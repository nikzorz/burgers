"use client";

import { removeItem } from "@/components/cart/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useActionState } from "react";

type DeleteProductButtonProps = {
  productId: string;
  optimisticUpdate: any;
};

export function DeleteProductButton({
  productId,
  optimisticUpdate,
}: DeleteProductButtonProps) {
  const [message, formAction] = useActionState(removeItem, null);
  const actionWithProduct = formAction.bind(null, productId);

  return (
    <form
      action={async () => {
        optimisticUpdate(productId, "delete");
        await actionWithProduct();
      }}
    >
      <Button type="submit" size="icon" variant="destructive">
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Remove item</span>
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
