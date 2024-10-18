import { StoreTemplate } from "@/components/store/store-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Burger Store",
  description: "The best burgers in town",
};

export default function Home() {
  return <StoreTemplate />;
}
