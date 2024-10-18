import { CartTemplate } from "@/components/cart/cart-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
};

export default async function Cart() {
  return <CartTemplate />;
}
