import { ProductGrid } from "@/components/product/product-grid";

export function StoreTemplate() {
  return (
    <div className="flex flex-col px-8 py-6 sm:flex-row sm:items-start">
      <div>{/*  Filters*/}</div>
      <div className="w-full">
        <div className="mb-8 text-2xl">
          <h1>All Products</h1>
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
