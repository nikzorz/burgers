import { ProductGrid } from "@/components/product/product-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Burger Store",
  description: "The best burgers in town",
};

export default function Home() {
  return (
    <div className="flex flex-col px-8 py-6 sm:flex-row sm:items-start">
      <div>{/* TODO Filters */}</div>
      <div className="w-full">
        <div className="mb-8 text-2xl">
          <h1>All Products</h1>
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
