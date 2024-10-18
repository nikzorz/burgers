"use client";

import { useCart } from "@/components/cart/cart-context";
import { DeleteProductButton } from "@/components/cart/delete-product-button";
import { EditProductQuantityButton } from "@/components/cart/edit-product-quantity-button";
import EmptyCart from "@/components/cart/empty-cart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPennyValue } from "@/utils/helpers";
import Image from "next/image";

export function CartTemplate() {
  const { cart, updateCartItem } = useCart();

  const totalItems =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return cart?.items && cart.items.length > 0 ? (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <Image
                alt={item.name}
                className="rounded-md object-cover"
                height="100"
                src={item.image}
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
              <div className="grid flex-1 gap-1">
                {item.name}
                <p className="text-sm text-muted-foreground">
                  {formatPennyValue(item.price)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-x-4 md:gap-x-12">
                <div className="flex flex-col-reverse items-center gap-x-2 gap-y-4 md:flex-row">
                  <EditProductQuantityButton
                    item={item}
                    type="minus"
                    optimisticUpdate={updateCartItem}
                  />
                  <div className="px-4 text-center">{item.quantity}</div>
                  <EditProductQuantityButton
                    item={item}
                    type="plus"
                    optimisticUpdate={updateCartItem}
                  />
                </div>

                <DeleteProductButton
                  productId={item.id}
                  optimisticUpdate={updateCartItem}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="text-xl font-semibold">Total Products:</span>
            <span className="text-xl font-semibold">{totalItems}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-xl font-semibold">Subtotal:</span>
            <span className="text-xl font-semibold">
              {formatPennyValue(totalPrice)}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <EmptyCart />
  );
}
