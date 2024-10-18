import EmptyCart from "@/components/cart/empty-cart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatPennyValue } from "@/utils/helpers";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

const cartItems = [
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
];

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
};

export default async function Cart() {
  return cartItems.length > 0 ? (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {cartItems.map((item) => (
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
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline">
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input
                  className="w-16 text-center"
                  type="number"
                  value={item.quantity}
                  min={0}
                />
                <Button size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
                <Button size="icon" variant="outline">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="text-xl font-semibold">Total Products:</span>
            <span className="text-xl font-semibold">{3}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-xl font-semibold">Subtotal:</span>
            <span className="text-xl font-semibold">
              {formatPennyValue(499 * 2 + 799)}
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
